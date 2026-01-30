# Battle Nations MCP Server Plan

## Overview
Create an MCP (Model Context Protocol) server that exposes the Battle Nations unit database, allowing AI models (Claude, etc.) to query unit data, compare units, and get battle simulation information.

---

## What is MCP?
Model Context Protocol is Anthropic's open standard for connecting AI assistants to external data sources and tools. An MCP server exposes "tools" that models can call to fetch data or perform actions.

---

## Goals
1. **Zero-download experience**: Users run `npx battle-nations-mcp` and it just works
2. **Bundled data**: The entire unit database ships with the npm package (no external downloads)
3. Expose useful tools for querying and comparing units
4. Support connection from Claude Desktop, Claude Code, or any MCP-compatible client
5. Print clear startup message with connection info for users

---

## Proposed Tools

These are **data lookup tools only** - the model handles all analysis, comparisons, and recommendations.

### 1. `get_unit`
Fetch a single unit by name or ID. Returns full unit data including all ranks and actions.
```typescript
{
  name: "get_unit",
  description: "Get detailed information about a Battle Nations unit",
  parameters: {
    identifier: string // Unit name or ID (supports fuzzy matching)
  }
}
```

### 2. `search_units`
Search/filter units. Returns a list of matching units (summary data, not full details).
```typescript
{
  name: "search_units",
  description: "Search for Battle Nations units by various criteria",
  parameters: {
    query?: string,         // Free text search on name/description
    category?: string,      // "Soldier", "Tank", "Vehicle", etc.
    building?: string,      // "Barracks", "Vehicle Factory", etc.
    affiliation?: string,   // "Empire", "Raiders", "Infected", etc.
    limit?: number          // Max results (default: 20)
  }
}
```

**Query Behavior:**
- **Fields searched**: `query` searches both unit `name` and `description` fields
- **Case sensitivity**: Case-insensitive (e.g., "tank", "Tank", "TANK" all match)
- **Matching**: Substring/contains matching (e.g., "shock" matches "Shocktrooper")
- **Fuzzy matching**: Enabled for typo tolerance (e.g., "granadier" finds "Grenadier")
- **Multiple terms**: Space-separated terms are AND-ed (e.g., "heavy tank" matches units containing both words)

**Filters** (`category`, `building`, `affiliation`): Exact match, case-insensitive. Use `list_categories` to see valid values.

### 3. `list_categories`
List all available unit categories, buildings, and affiliations with counts.
```typescript
{
  name: "list_categories",
  description: "List all filterable values (categories, buildings, affiliations) with unit counts",
  parameters: {}
}
```

### 4. `get_units_batch`
Fetch multiple units at once (for when model wants to compare).
```typescript
{
  name: "get_units_batch",
  description: "Get full data for multiple units at once",
  parameters: {
    identifiers: string[] // Array of unit names or IDs
  }
}
```

### 5. `random_unit`
Get a random unit (for fun/discovery).
```typescript
{
  name: "random_unit",
  description: "Get a random Battle Nations unit",
  parameters: {
    category?: string // Optional: limit to category
  }
}
```

### Removed Tools
- ~~`compare_units`~~ - Model does comparison using `get_units_batch`
- ~~`find_counters`~~ - Model searches for units with relevant damage types/immunities using `search_units`
- ~~`get_unit_actions`~~ - Actions are included in `get_unit` response

---

## Project Structure

The MCP server is a **separate npm package** in its own directory, keeping it decoupled from the React app:

```
bn-api/
├── mcp-server/                 # Standalone npm package
│   ├── src/
│   │   ├── index.ts            # Entry point with shebang
│   │   ├── server.ts           # MCP server setup
│   │   ├── tools/
│   │   │   ├── getUnit.ts
│   │   │   ├── getUnitsBatch.ts
│   │   │   ├── searchUnits.ts
│   │   │   ├── listCategories.ts
│   │   │   └── randomUnit.ts
│   │   └── utils/
│   │       ├── dataLoader.ts
│   │       ├── fuzzyMatch.ts
│   │       └── types.ts
│   ├── data/
│   │   └── units.json          # Bundled with package (copied from public/)
│   ├── dist/                   # Built output
│   ├── package.json
│   └── tsconfig.json
├── public/
│   └── data/
│       └── units.json          # Source of truth
└── ... (existing React app)
```

---

## Package Configuration

### package.json (mcp-server)
```json
{
  "name": "battle-nations-mcp",
  "version": "1.0.0",
  "description": "MCP server for Battle Nations unit database - query units, compare stats, find counters",
  "main": "dist/index.js",
  "bin": {
    "battle-nations-mcp": "dist/index.js"
  },
  "files": [
    "dist",
    "data"
  ],
  "keywords": ["mcp", "battle-nations", "game-data", "claude", "ai"],
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tsup": "^8.0.0"
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs --dts",
    "prepublishOnly": "npm run build"
  }
}
```

### Entry Point (src/index.ts)
```typescript
#!/usr/bin/env node
import { startServer } from './server';

// Print startup banner
console.error('🎮 Battle Nations MCP Server');
console.error('📊 192 units loaded');
console.error('');
console.error('Add to Claude Desktop config:');
console.error(JSON.stringify({
  "mcpServers": {
    "battle-nations": {
      "command": "npx",
      "args": ["battle-nations-mcp"]
    }
  }
}, null, 2));
console.error('');

startServer();
```

---

## Installation & Usage

### For Users (Zero Download!)
```bash
# Just run it - npm downloads and caches automatically
npx battle-nations-mcp
```

That's it! No cloning repos, no downloading data files. The entire unit database is bundled in the npm package.

### Claude Desktop Configuration
Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS):
```json
{
  "mcpServers": {
    "battle-nations": {
      "command": "npx",
      "args": ["battle-nations-mcp"]
    }
  }
}
```

### Cursor / Claude Code Configuration
Add to MCP settings (project or global):
```json
{
  "battle-nations": {
    "command": "npx",
    "args": ["battle-nations-mcp"]
  }
}
```

### Optional: Global Install
```bash
# For faster startup (skips npx resolution)
npm install -g battle-nations-mcp
battle-nations-mcp
```

---

## Implementation Phases

### Phase 1: Package Setup ✅
- [x] Create `mcp-server/` directory structure
- [x] Initialize package.json with bin entry and files array
- [x] Set up TypeScript config for Node.js CJS output
- [x] Create build script that copies units.json into package
- [x] Add shebang to entry point for npx execution

### Phase 2: Implement All Tools ✅
- [x] Implement MCP server boilerplate with SDK
- [x] Implement `get_unit` with fuzzy name matching
- [x] Implement `search_units` with filters
- [x] Implement `list_categories`
- [x] Implement `get_units_batch`
- [x] Implement `random_unit`
- [x] Test locally with `npx .` in package directory

### Phase 3: Publish & Document
- [ ] Test with Claude Desktop locally
- [ ] Write comprehensive README with examples
- [ ] Publish to npm as `battle-nations-mcp`
- [ ] Test `npx battle-nations-mcp` works from fresh machine
- [ ] Add to main project README

### Phase 4: Optional Enhancements
- [ ] Add buildings data and `get_building` tool
- [ ] Add missions data and `get_mission` tool

---

## Example Interactions

**User:** "What's the strongest tank in Battle Nations?"

1. Model calls `search_units({ category: "Tank" })`
2. Model receives list of tanks with summary stats
3. Model calls `get_units_batch({ identifiers: ["Mega Tank", "Plasma Tank", "Heavy Tank"] })` for top candidates
4. **Model analyzes the data** and recommends based on HP, damage, etc.

---

**User:** "Compare the Mega Tank and Plasma Tank"

1. Model calls `get_units_batch({ identifiers: ["Mega Tank", "Plasma Tank"] })`
2. Model receives full data for both units
3. **Model creates comparison** - stats, actions, costs, trade-offs

---

**User:** "What units are good against infected?"

1. Model calls `get_unit({ identifier: "Archetype Stalker" })` to understand the target
2. Model sees it has Plague attacks, certain resistances, etc.
3. Model calls `search_units({ query: "fire" })` or similar to find units with effective damage types
4. **Model recommends counters** based on damage types, immunities, range

---

## Technical Notes

### Data Bundling
The `units.json` file is included in the npm package via the `files` array in package.json. Load it relative to the package location:

```typescript
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// For CJS build
const dataPath = join(__dirname, '..', 'data', 'units.json');
const units = JSON.parse(readFileSync(dataPath, 'utf-8'));
```

### Build Process
1. TypeScript compiles to `dist/`
2. Build script copies `public/data/units.json` → `mcp-server/data/units.json`
3. npm publish includes both `dist/` and `data/` directories

### Other Notes
1. **Search Performance**: Build an in-memory index at startup for fast fuzzy matching
2. **Rank Handling**: Most tools should support optional rank parameter, defaulting to max rank
3. **Error Handling**: Return helpful errors for unknown units, invalid parameters
4. **Startup Output**: Use `console.error` for startup messages (stdout is reserved for MCP protocol)

---

## Versioning & Updates

When we add more units to `units.json`:
1. Update the mcp-server's bundled data: `cp public/data/units.json mcp-server/data/`
2. Bump version in `mcp-server/package.json`
3. Run `npm publish` from the mcp-server directory
4. Users get new data automatically on next `npx` run (npx checks for updates)

Consider a GitHub Action to auto-publish when units.json changes on main branch.

---

## Design Decisions

1. ~~Should we support fuzzy name matching for unit lookups?~~
   - **Yes** - makes it easier for models to find units without exact names
2. ~~Should we include enemy-only units or just player-trainable?~~
   - **Yes** - include enemy units so players can plan for Boss Strikes
3. ~~Do we want a `random_unit` tool for fun?~~
   - **Yes** - included in tools
4. ~~Should the server do comparisons/counter-finding?~~
   - **No** - server is data-only, model does all analysis
5. ~~Should damage calculations be server-side?~~
   - **No** - model can do math with the raw damage/resistance values 