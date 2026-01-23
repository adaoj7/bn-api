import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

import { CONFIG, getServerUrl, getLocalIp } from './config';
import { getUnit } from './tools/getUnit';
import { searchUnits } from './tools/searchUnits';
import { listCategories } from './tools/listCategories';
import { getUnitsBatch } from './tools/getUnitsBatch';
import { randomUnit } from './tools/randomUnit';

// =============================================================================
// LOGGING UTILITIES
// =============================================================================

function timestamp(): string {
  return new Date().toISOString();
}

function log(level: 'INFO' | 'DEBUG' | 'WARN' | 'ERROR', category: string, message: string, data?: Record<string, unknown>): void {
  const prefix = `[${timestamp()}] [${level}] [${category}]`;
  if (data) {
    console.error(`${prefix} ${message}`, JSON.stringify(data, null, 2));
  } else {
    console.error(`${prefix} ${message}`);
  }
}

function logInfo(category: string, message: string, data?: Record<string, unknown>): void {
  log('INFO', category, message, data);
}

function logDebug(category: string, message: string, data?: Record<string, unknown>): void {
  log('DEBUG', category, message, data);
}

function logWarn(category: string, message: string, data?: Record<string, unknown>): void {
  log('WARN', category, message, data);
}

function logError(category: string, message: string, error?: unknown, data?: Record<string, unknown>): void {
  const errorData = error instanceof Error 
    ? { errorMessage: error.message, stack: error.stack, ...data }
    : { error, ...data };
  log('ERROR', category, message, errorData);
}

// =============================================================================
// SESSION MANAGEMENT
// =============================================================================

// Store active transports by session ID
const transports: Map<string, StreamableHTTPServerTransport> = new Map();

function getSessionCount(): number {
  return transports.size;
}

function logSessionStats(): void {
  logDebug('SESSION', `Active sessions: ${getSessionCount()}`);
}

// =============================================================================
// REQUEST LOGGING MIDDLEWARE
// =============================================================================

function requestLoggingMiddleware(req: Request, res: Response, next: NextFunction): void {
  const requestId = randomUUID().slice(0, 8);
  const startTime = Date.now();
  
  // Attach request ID for correlation
  (req as any).requestId = requestId;
  
  logInfo('REQUEST', `--> ${req.method} ${req.path}`, {
    requestId,
    ip: req.ip || req.socket.remoteAddress,
    userAgent: req.headers['user-agent'],
    contentType: req.headers['content-type'],
    contentLength: req.headers['content-length'],
    sessionId: req.headers['mcp-session-id'] || '(none)',
    hasAuth: !!req.headers.authorization,
  });

  // Log request body for POST requests (but sanitize auth)
  if (req.method === 'POST' && req.body) {
    logDebug('REQUEST', `Request body:`, {
      requestId,
      body: req.body,
    });
  }

  // Capture response
  const originalSend = res.send.bind(res);
  res.send = function(body: any) {
    const duration = Date.now() - startTime;
    logInfo('RESPONSE', `<-- ${req.method} ${req.path} ${res.statusCode} (${duration}ms)`, {
      requestId,
      statusCode: res.statusCode,
      duration,
    });
    
    // Log response body for errors
    if (res.statusCode >= 400) {
      logDebug('RESPONSE', `Error response body:`, {
        requestId,
        body: typeof body === 'string' ? JSON.parse(body) : body,
      });
    }
    
    return originalSend(body);
  };

  next();
}

// =============================================================================
// AUTHENTICATION MIDDLEWARE
// =============================================================================

/**
 * Simple bearer token authentication middleware
 * Supports both simple static token and OAuth 2 bearer tokens
 */
function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const requestId = (req as any).requestId || 'unknown';
  const authHeader = req.headers.authorization;

  logDebug('AUTH', `Checking authentication`, {
    requestId,
    method: req.method,
    path: req.path,
    hasAuthHeader: !!authHeader,
    authHeaderPrefix: authHeader ? authHeader.slice(0, 10) + '...' : '(none)',
  });

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    logWarn('AUTH', `REJECTED: Missing or malformed Authorization header`, {
      requestId,
      authHeader: authHeader || '(none)',
      startsWithBearer: authHeader?.startsWith('Bearer '),
    });
    
    const serverUrl = getServerUrl();
    res.setHeader(
      'WWW-Authenticate',
      `Bearer realm="Battle Nations MCP", resource_metadata="${serverUrl.origin}/.well-known/oauth-protected-resource"`
    );
    res.status(401).json({
      jsonrpc: '2.0',
      error: {
        code: -32001,
        message: 'Authentication required',
      },
      id: null,
    });
    return;
  }

  const token = authHeader.slice(7); // Remove 'Bearer ' prefix
  const maskedReceived = token.length > 8 ? `${token.slice(0, 4)}...${token.slice(-4)}` : '****';
  const maskedExpected = CONFIG.bearerToken.length > 8 
    ? `${CONFIG.bearerToken.slice(0, 4)}...${CONFIG.bearerToken.slice(-4)}` 
    : '****';

  logDebug('AUTH', `Comparing tokens`, {
    requestId,
    receivedToken: maskedReceived,
    receivedLength: token.length,
    expectedToken: maskedExpected,
    expectedLength: CONFIG.bearerToken.length,
    lengthMatch: token.length === CONFIG.bearerToken.length,
  });

  // Check against simple bearer token
  if (token === CONFIG.bearerToken) {
    logInfo('AUTH', `SUCCESS: Token matched`, { requestId });
    next();
    return;
  }
  
  // Token mismatch - detailed comparison for debugging
  logWarn('AUTH', `Token mismatch - detailed comparison`, {
    requestId,
    receivedTokenFull: JSON.stringify(token),
    expectedTokenFull: JSON.stringify(CONFIG.bearerToken),
    receivedCharCodes: token.split('').map(c => c.charCodeAt(0)),
    expectedCharCodes: CONFIG.bearerToken.split('').map(c => c.charCodeAt(0)),
  });

  // If OAuth is enabled, validate against OAuth introspection endpoint
  if (CONFIG.oauth.enabled && CONFIG.oauth.introspectionEndpoint) {
    logDebug('AUTH', `Attempting OAuth validation`, { requestId });
    
    validateOAuthToken(token)
      .then((valid) => {
        if (valid) {
          logInfo('AUTH', `SUCCESS: OAuth token validated`, { requestId });
          next();
        } else {
          logWarn('AUTH', `REJECTED: OAuth token invalid or expired`, { requestId });
          res.status(401).json({
            jsonrpc: '2.0',
            error: { code: -32001, message: 'Invalid or expired token' },
            id: null,
          });
        }
      })
      .catch((error) => {
        logError('AUTH', `OAuth validation failed`, error, { requestId });
        res.status(401).json({
          jsonrpc: '2.0',
          error: { code: -32001, message: 'Token validation failed' },
          id: null,
        });
      });
    return;
  }

  // Token doesn't match simple token and OAuth not enabled
  logWarn('AUTH', `REJECTED: Invalid token (no OAuth fallback available)`, { requestId });
  res.status(401).json({
    jsonrpc: '2.0',
    error: { code: -32001, message: 'Invalid token' },
    id: null,
  });
}

// =============================================================================
// OAUTH VALIDATION
// =============================================================================

/**
 * Validate OAuth token via introspection endpoint
 */
async function validateOAuthToken(token: string): Promise<boolean> {
  const { introspectionEndpoint, clientId, clientSecret } = CONFIG.oauth;

  logDebug('OAUTH', `Validating token via introspection`, {
    endpoint: introspectionEndpoint,
    clientId,
    hasClientSecret: !!clientSecret,
  });

  const params = new URLSearchParams({ token, client_id: clientId });
  if (clientSecret) {
    params.set('client_secret', clientSecret);
  }

  try {
    const response = await fetch(introspectionEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    logDebug('OAUTH', `Introspection response`, {
      status: response.status,
      statusText: response.statusText,
    });

    if (!response.ok) {
      logWarn('OAUTH', `Introspection endpoint returned error`, {
        status: response.status,
        statusText: response.statusText,
      });
      return false;
    }

    const data = await response.json();
    logDebug('OAUTH', `Introspection result`, { active: data.active });
    
    return data.active === true;
  } catch (error) {
    logError('OAUTH', `Introspection request failed`, error);
    throw error;
  }
}

// =============================================================================
// MCP SERVER SETUP
// =============================================================================

/**
 * Wrapper to add logging to tool handlers
 */
function withToolLogging<T extends Record<string, unknown>>(
  toolName: string,
  handler: (params: T) => unknown
): (params: T) => Promise<{ content: Array<{ type: string; text: string }> }> {
  return async (params: T) => {
    const startTime = Date.now();
    logInfo('TOOL', `Executing tool: ${toolName}`, { params });
    
    try {
      const result = handler(params);
      const duration = Date.now() - startTime;
      
      logInfo('TOOL', `Tool completed: ${toolName} (${duration}ms)`, {
        duration,
        resultType: typeof result,
        resultKeys: result && typeof result === 'object' ? Object.keys(result) : undefined,
      });
      
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      logError('TOOL', `Tool failed: ${toolName} (${duration}ms)`, error, { params });
      throw error;
    }
  };
}

/**
 * Create and configure the MCP server with all tools
 */
function createMcpServer(sessionId?: string): McpServer {
  logInfo('MCP', `Creating new MCP server instance`, { sessionId });
  
  const server = new McpServer({
    name: 'battle-nations-mcp',
    version: '1.0.0',
  });

  // Register get_unit tool
  server.tool(
    'get_unit',
    'Get detailed information about a Battle Nations unit including all ranks, stats, and actions. Supports fuzzy name matching.',
    {
      identifier: z.string().describe('Unit name or ID (supports fuzzy matching for names)'),
    },
    withToolLogging('get_unit', ({ identifier }) => getUnit({ identifier }))
  );

  // Register search_units tool
  server.tool(
    'search_units',
    'Search for Battle Nations units by name, description, or filters. Returns summary data for matching units.',
    {
      query: z.string().optional().describe('Free text search on name/description'),
      category: z.string().optional().describe('Filter by category (e.g., "Soldier", "Tank")'),
      building: z.string().optional().describe('Filter by production building'),
      affiliation: z.string().optional().describe('Filter by affiliation (e.g., "Imperial", "Raiders")'),
      limit: z.number().optional().describe('Maximum results to return (default: 20, max: 50)'),
    },
    withToolLogging('search_units', (params) => searchUnits(params))
  );

  // Register list_categories tool
  server.tool(
    'list_categories',
    'List all available filter values (categories, buildings, affiliations) with unit counts.',
    {},
    withToolLogging('list_categories', () => listCategories())
  );

  // Register get_units_batch tool
  server.tool(
    'get_units_batch',
    'Get full data for multiple units at once. Useful for comparing units. Maximum 20 units per request.',
    {
      identifiers: z.array(z.string()).describe('Array of unit names or IDs to fetch'),
    },
    withToolLogging('get_units_batch', ({ identifiers }) => getUnitsBatch({ identifiers }))
  );

  // Register random_unit tool
  server.tool(
    'random_unit',
    'Get a random Battle Nations unit for discovery or fun. Optionally filter by category.',
    {
      category: z.string().optional().describe('Optional category to limit the random selection'),
    },
    withToolLogging('random_unit', (params) => randomUnit(params))
  );

  logInfo('MCP', `MCP server configured with 5 tools`, { sessionId });
  return server;
}

// =============================================================================
// MCP REQUEST HANDLERS
// =============================================================================

/**
 * Handle MCP POST requests (main protocol communication)
 */
async function handleMcpPost(req: Request, res: Response): Promise<void> {
  const requestId = (req as any).requestId || 'unknown';
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  let transport: StreamableHTTPServerTransport;

  logDebug('MCP_POST', `Processing POST request`, {
    requestId,
    sessionId: sessionId || '(none)',
    isInitializeRequest: isInitializeRequest(req.body),
    bodyMethod: req.body?.method,
    bodyId: req.body?.id,
  });

  if (sessionId && transports.has(sessionId)) {
    // Existing session
    logDebug('MCP_POST', `Using existing session`, { requestId, sessionId });
    transport = transports.get(sessionId)!;
  } else if (isInitializeRequest(req.body)) {
    // New session - create transport and server
    // Client may or may not provide their own session ID
    const clientProvidedSessionId = sessionId;
    logInfo('MCP_POST', `Creating new session (initialize request)`, { 
      requestId,
      clientProvidedSessionId: clientProvidedSessionId || '(none - will generate)',
    });
    
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => {
        // Use client-provided session ID if available, otherwise generate one
        const newId = clientProvidedSessionId || randomUUID();
        logInfo('SESSION', `Session ID assigned`, { 
          requestId, 
          sessionId: newId,
          source: clientProvidedSessionId ? 'client-provided' : 'server-generated',
        });
        return newId;
      },
      onsessioninitialized: (newSessionId) => {
        transports.set(newSessionId, transport);
        logInfo('SESSION', `Session initialized and stored`, { 
          requestId, 
          sessionId: newSessionId,
          totalSessions: transports.size,
        });
        logSessionStats();
      },
    });

    transport.onclose = () => {
      if (transport.sessionId) {
        logInfo('SESSION', `Session closed`, { 
          sessionId: transport.sessionId,
          remainingSessions: transports.size - 1,
        });
        transports.delete(transport.sessionId);
        logSessionStats();
      }
    };

    const server = createMcpServer(transport.sessionId);
    await server.connect(transport);
    logDebug('MCP_POST', `MCP server connected to transport`, { requestId });
  } else if (!sessionId && (!req.body || Object.keys(req.body).length === 0 || req.body?.method === 'ping')) {
    // Pre-session connection check - client is verifying auth before initializing
    logInfo('MCP_POST', `Pre-session connection check (auth validated)`, {
      requestId,
      hasBody: !!req.body,
      bodyMethod: req.body?.method,
    });
    
    res.status(200).json({
      jsonrpc: '2.0',
      result: {
        status: 'ready',
        message: 'Connection authenticated. Send initialize request to start session.',
        server: 'battle-nations-mcp',
        version: '1.0.0',
      },
      id: req.body?.id || null,
    });
    return;
  } else {
    // Invalid request - has session ID that doesn't exist, or unrecognized request
    logWarn('MCP_POST', `Invalid request: unrecognized request type`, {
      requestId,
      sessionId,
      sessionExists: sessionId ? transports.has(sessionId) : false,
      hasBody: !!req.body,
      bodyMethod: req.body?.method,
      knownSessions: Array.from(transports.keys()),
    });
    
    res.status(400).json({
      jsonrpc: '2.0',
      error: {
        code: -32000,
        message: sessionId 
          ? 'Bad Request: Session ID not found. It may have expired.' 
          : 'Bad Request: No valid session ID provided',
      },
      id: null,
    });
    return;
  }

  try {
    logDebug('MCP_POST', `Passing request to transport`, { requestId, sessionId: transport.sessionId });
    await transport.handleRequest(req, res, req.body);
    logDebug('MCP_POST', `Transport handled request successfully`, { requestId });
  } catch (error) {
    logError('MCP_POST', `Transport error handling request`, error, { requestId, sessionId: transport.sessionId });
    throw error;
  }
}

/**
 * Handle GET requests (SSE stream for server-to-client messages)
 */
async function handleMcpGet(req: Request, res: Response): Promise<void> {
  const requestId = (req as any).requestId || 'unknown';
  const sessionId = req.headers['mcp-session-id'] as string | undefined;

  logDebug('MCP_GET', `Processing GET request (SSE)`, { requestId, sessionId });

  if (!sessionId || !transports.has(sessionId)) {
    logWarn('MCP_GET', `Invalid or missing session ID`, { 
      requestId, 
      sessionId,
      knownSessions: Array.from(transports.keys()),
    });
    
    res.status(400).json({
      jsonrpc: '2.0',
      error: { code: -32000, message: 'Invalid or missing session ID' },
      id: null,
    });
    return;
  }

  const transport = transports.get(sessionId)!;
  logDebug('MCP_GET', `Establishing SSE stream`, { requestId, sessionId });
  
  try {
    await transport.handleRequest(req, res);
    logDebug('MCP_GET', `SSE stream ended`, { requestId, sessionId });
  } catch (error) {
    logError('MCP_GET', `SSE stream error`, error, { requestId, sessionId });
    throw error;
  }
}

/**
 * Handle DELETE requests (close session)
 */
async function handleMcpDelete(req: Request, res: Response): Promise<void> {
  const requestId = (req as any).requestId || 'unknown';
  const sessionId = req.headers['mcp-session-id'] as string | undefined;

  logInfo('MCP_DELETE', `Processing DELETE request (close session)`, { requestId, sessionId });

  if (!sessionId || !transports.has(sessionId)) {
    logWarn('MCP_DELETE', `Cannot delete: invalid or missing session ID`, { 
      requestId, 
      sessionId,
      knownSessions: Array.from(transports.keys()),
    });
    
    res.status(400).json({
      jsonrpc: '2.0',
      error: { code: -32000, message: 'Invalid or missing session ID' },
      id: null,
    });
    return;
  }

  const transport = transports.get(sessionId)!;
  
  try {
    await transport.handleRequest(req, res);
    logInfo('MCP_DELETE', `Session deletion handled`, { requestId, sessionId });
  } catch (error) {
    logError('MCP_DELETE', `Error closing session`, error, { requestId, sessionId });
    throw error;
  }
}

// =============================================================================
// SERVER STARTUP
// =============================================================================

/**
 * Global error handler middleware
 */
function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  const requestId = (req as any).requestId || 'unknown';
  logError('SERVER', `Unhandled error in request`, err, { 
    requestId,
    method: req.method,
    path: req.path,
  });
  
  res.status(500).json({
    jsonrpc: '2.0',
    error: {
      code: -32603,
      message: 'Internal server error',
    },
    id: null,
  });
}

/**
 * Start the HTTP server
 */
export async function startServer(): Promise<void> {
  logInfo('STARTUP', '='.repeat(60));
  logInfo('STARTUP', 'Battle Nations MCP Server starting...');
  logInfo('STARTUP', '='.repeat(60));
  
  const app = express();

  // Parse JSON with raw body preservation
  app.use(
    express.json({
      verify: (req: any, _res, buf) => {
        req.rawBody = buf?.toString() ?? '';
      },
    })
  );

  // CORS configuration
  app.use(
    cors({
      origin: '*',
      exposedHeaders: ['Mcp-Session-Id'],
    })
  );

  // Request logging for ALL requests (before auth)
  app.use(requestLoggingMiddleware);

  // OAuth Protected Resource Metadata endpoint (RFC 9728)
  app.get('/.well-known/oauth-protected-resource', (_req, res) => {
    logDebug('ENDPOINT', 'OAuth protected resource metadata requested');
    const serverUrl = getServerUrl();
    const metadata: Record<string, unknown> = {
      resource: serverUrl.origin,
      bearer_methods_supported: ['header'],
      scopes_supported: ['mcp:tools'],
      resource_name: 'Battle Nations MCP Server',
    };

    // If OAuth is configured, include authorization server info
    if (CONFIG.oauth.enabled && CONFIG.oauth.issuer) {
      metadata.authorization_servers = [CONFIG.oauth.issuer];
    }

    res.json(metadata);
  });

  // Health check endpoint (no auth required)
  app.get('/health', (_req, res) => {
    logDebug('ENDPOINT', 'Health check requested');
    res.json({ 
      status: 'ok', 
      name: 'battle-nations-mcp',
      activeSessions: transports.size,
      uptime: process.uptime(),
    });
  });

  // MCP endpoints (auth required)
  app.post('/mcp', authMiddleware, handleMcpPost);
  app.get('/mcp', authMiddleware, handleMcpGet);
  app.delete('/mcp', authMiddleware, handleMcpDelete);

  // Global error handler
  app.use(errorHandler);

  // Start listening
  const localIp = getLocalIp();
  const localUrl = `http://${localIp}:${CONFIG.port}`;
  
  app.listen(CONFIG.port, CONFIG.host, () => {
    logInfo('STARTUP', '='.repeat(60));
    logInfo('STARTUP', 'Server is ready!');
    logInfo('STARTUP', '='.repeat(60));
    
    console.error('');
    console.error('Battle Nations MCP Server (Streamable HTTP)');
    console.error(`Local:   http://localhost:${CONFIG.port}`);
    console.error(`Network: ${localUrl}`);
    console.error(`MCP endpoint: ${localUrl}/mcp`);
    console.error(`Health check: ${localUrl}/health`);
    console.error('');
    console.error('Authentication:');
    console.error(`  Bearer token: ${CONFIG.bearerToken}`);
    console.error(`  Token length: ${CONFIG.bearerToken.length} characters`);
    if (CONFIG.oauth.enabled) {
      console.error(`  OAuth enabled: ${CONFIG.oauth.issuer}`);
    }
    console.error('');
    console.error('Logging: Verbose logging is enabled');
    console.error('');
    console.error('Claude Desktop config:');
    console.error(
      JSON.stringify(
        {
          mcpServers: {
            'battle-nations': {
              url: `${localUrl}/mcp`,
              headers: {
                Authorization: `Bearer ${CONFIG.bearerToken}`,
              },
            },
          },
        },
        null,
        2
      )
    );
    console.error('');
    logInfo('STARTUP', 'Waiting for connections...');
  });

  // Handle process signals
  process.on('SIGINT', () => {
    logInfo('SHUTDOWN', 'Received SIGINT, shutting down...');
    logInfo('SHUTDOWN', `Closing ${transports.size} active sessions`);
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    logInfo('SHUTDOWN', 'Received SIGTERM, shutting down...');
    logInfo('SHUTDOWN', `Closing ${transports.size} active sessions`);
    process.exit(0);
  });

  process.on('uncaughtException', (error) => {
    logError('FATAL', 'Uncaught exception', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logError('FATAL', 'Unhandled rejection', reason as Error, { promise: String(promise) });
  });
}
