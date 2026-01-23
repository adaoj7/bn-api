import { networkInterfaces } from 'os';

/**
 * Get the local IP address for display purposes
 */
export function getLocalIp(): string {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return '127.0.0.1';
}

export const CONFIG = {
  // Server
  host: process.env.HOST || '0.0.0.0',
  port: parseInt(process.env.PORT || '3000', 10),

  // Simple bearer token auth (for local development / direct API access)
  bearerToken: process.env.BEARER_TOKEN || 'battle-nations-secret',

  // OAuth 2 configuration (for Claude Desktop and other OAuth clients)
  oauth: {
    enabled: process.env.OAUTH_ENABLED === 'true',
    // Authorization server URL (e.g., Auth0, Keycloak, etc.)
    issuer: process.env.OAUTH_ISSUER || '',
    // Token introspection endpoint
    introspectionEndpoint: process.env.OAUTH_INTROSPECTION_ENDPOINT || '',
    // Authorization endpoint
    authorizationEndpoint: process.env.OAUTH_AUTHORIZATION_ENDPOINT || '',
    // Token endpoint
    tokenEndpoint: process.env.OAUTH_TOKEN_ENDPOINT || '',
    // Client credentials for token introspection
    clientId: process.env.OAUTH_CLIENT_ID || '',
    clientSecret: process.env.OAUTH_CLIENT_SECRET || '',
    // Required scopes
    requiredScopes: (process.env.OAUTH_REQUIRED_SCOPES || '').split(',').filter(Boolean),
  },
};

export function getServerUrl(): URL {
  return new URL(`http://${CONFIG.host}:${CONFIG.port}`);
}
