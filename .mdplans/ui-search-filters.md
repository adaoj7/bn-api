# UI Plan: Search & Filter Improvements

## Overview
Enhance the search and filtering system to make it easier to find units based on any criteria available in the data.

---

## Current State

The search/filter system supports:
- Text search on name and description (debounced)
- Category filter
- Type filter
- Level range filter
- Sort by: Unlock Level or Name
- Sort direction: Ascending/Descending

**Missing**:
- Affiliation filter
- Building filter
- Damage type filter
- Status effect filter
- Resistance/immunity filters
- Multi-select filters
- Filter presets
- Advanced search syntax
- Clear all filters
- Filter count indicator
- URL persistence

---

## Enhanced Filter Panel

### Layout
```
┌─────────────────────────────────────────────────────────────────────────┐
│ [🔍 Search units...                                          ] [Clear] │
│                                                                          │
│ ┌─ Quick Filters ──────────────────────────────────────────────────────┐│
│ │ Category: [All ▼]   Type: [All ▼]   Affiliation: [All ▼]            ││
│ │ Building: [All ▼]   Level: [1 ▼] to [60 ▼]                          ││
│ └──────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│ [▼ Advanced Filters]                                                     │
│ ┌──────────────────────────────────────────────────────────────────────┐│
│ │ Damage Types: [□ Piercing] [□ Explosive] [■ Fire] [□ Electric] ...  ││
│ │ Status Effects: [□ Poison] [■ Burn] [□ Stun] [□ Freeze]             ││
│ │ Has Resistance To: [□ Fire] [□ Explosive] ...                        ││
│ │ Has Immunity To: [□ Poison] [□ Stun] ...                             ││
│ │ Special Abilities: [□ First Strike] [□ Taunt] ...                    ││
│ └──────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│ Sort by: [Level ▼]  [↑ Asc / ↓ Desc]                                    │
│                                                                          │
│ ┌─ Active Filters (5) ─────────────────────────────────────────────────┐│
│ │ [Category: Tank ×] [Affiliation: Imperial ×] [Fire Damage ×]         ││
│ │ [Level: 20-40 ×] [Has Burn Effect ×]                       [Clear All]│
│ └──────────────────────────────────────────────────────────────────────┘│
│                                                                          │
│ Showing 12 of 192 units                                                  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Filter Options

### Quick Filters (Dropdowns)

#### Category
```
All Categories
─────────────
☐ Soldier (49)
☐ Vehicle (15)
☐ Tank (22)
☐ Artillery (9)
☐ Naval (10)
☐ Air (3)
☐ Critter (8)
☐ Sniper (?)
☐ Defense (?)
☐ Infected (33)
```

#### Type (Dynamic based on data)
- All unit types from the data

#### Affiliation
```
All Affiliations
─────────────
☐ Imperial (X)
☐ Raider (7)
☐ Infected (33)
☐ Frontier (8)
☐ TF2 (5)
☐ Silver Wolves (X)
☐ Neutral (X)
☐ Ancient (X)
☐ Wild (X)
```

#### Building
```
All Buildings
─────────────
☐ Barracks (44)
☐ Vehicle Factory (15)
☐ Tank Factory (22)
☐ Artillery Camp (8)
☐ Animal Corral (8)
☐ Raider Camp (7)
☐ Infection Test Facility (33)
☐ Shipyard (8)
☐ Optics Facility (3)
☐ Plasma Weapons Factory (4)
☐ Mercenary Vault (7)
☐ Bigfoot Training Camp (2)
...
```

### Advanced Filters (Multi-select checkboxes)

#### Damage Types Dealt
- Check one or more damage types
- Shows units that have at least one action dealing that damage type
- Options: Piercing, Explosive, Fire, Crushing, Concussive, Chemical, Electric, Cold, Radiation

#### Status Effects
- Check one or more status effects
- Shows units that can inflict that status
- Options: Poison, Burn, Stun, Freeze

#### Has Resistance To
- Check one or more damage types
- Shows units with positive resistance to that type
- Same options as damage types

#### Has Immunity To
- Check one or more status effects
- Shows units immune to that effect
- Options: Poison, Fire, Stun, Freeze

#### Special Abilities
- Dynamic list from data
- Examples: First Strike, Taunt, etc.

---

## Sort Options

### Sort By
- Unlock Level (default)
- Name (alphabetical)
- Health (at rank 1 or selected rank)
- Max Damage (highest action damage)
- Defense
- Range
- Production Cost (gold)
- Production Time

### Sort Direction
- Ascending
- Descending

---

## Active Filter Pills

Show all active filters as removable pills:

```
[Category: Tank ×] [Affiliation: Imperial ×] [Fire Damage ×] [Clear All]
```

Each pill:
- Shows filter type and value
- Has × button to remove
- Clicking the text could re-open that filter

---

## URL Persistence

Filters should sync to URL for sharing:

```
/units?category=Tank&affiliation=Imperial&damage=Fire,Explosive&level=20-40&sort=health&dir=desc
```

Parameters:
- `q` - Search query
- `category` - Category filter
- `type` - Unit type filter
- `affiliation` - Affiliation filter
- `building` - Building filter
- `damage` - Comma-separated damage types
- `status` - Comma-separated status effects
- `resistance` - Comma-separated resistance types
- `immunity` - Comma-separated immunities
- `ability` - Comma-separated special abilities
- `level` - Format: "min-max" (e.g., "20-40")
- `sort` - Sort field
- `dir` - Sort direction (asc/desc)

---

## Filter Presets

Pre-configured filter combinations:

```
┌─ Presets ──────────────────────────────────┐
│ [Imperial Army] - All Imperial units       │
│ [Tank Hunters] - High anti-tank damage     │
│ [Status Inflicters] - Units with effects   │
│ [Budget Units] - Low cost, fast production │
│ [End Game] - Level 40+ units               │
│ [Save Current as Preset...]                │
└────────────────────────────────────────────┘
```

---

## Implementation Tasks

### Phase 1: Basic Filter Expansion
- [ ] Add affiliation filter to useSearch hook
- [ ] Add building filter to useSearch hook
- [ ] Create filter dropdown components
- [ ] Extract unique values from unit data for options
- [ ] Show count next to each option

### Phase 2: Advanced Filters
- [ ] Create collapsible AdvancedFilters component
- [ ] Add damage type multi-select filter
- [ ] Add status effect multi-select filter
- [ ] Add resistance multi-select filter
- [ ] Add immunity multi-select filter
- [ ] Add special abilities multi-select filter
- [ ] Update useSearch to handle advanced filters

### Phase 3: Active Filters Display
- [ ] Create FilterPill component
- [ ] Create ActiveFilters component
- [ ] Show count of active filters
- [ ] Add "Clear All" button
- [ ] Individual filter removal

### Phase 4: Sort Enhancements
- [ ] Add more sort options (health, damage, cost, time)
- [ ] Create SortDropdown component
- [ ] Handle sorting by computed values

### Phase 5: URL Persistence
- [ ] Create useFilterParams hook
- [ ] Sync filters to URL on change
- [ ] Parse URL params on page load
- [ ] Handle browser back/forward

### Phase 6: Filter Presets
- [ ] Create preset definitions
- [ ] Create PresetDropdown component
- [ ] Add "Save as Preset" functionality (localStorage)
- [ ] Load custom presets

---

## Components to Create/Update

1. `FilterPanel` - Main container, replace existing
2. `FilterDropdown` - Single-select dropdown with counts
3. `MultiSelectFilter` - Checkbox list for multiple selections
4. `AdvancedFilters` - Collapsible advanced section
5. `FilterPill` - Removable filter indicator
6. `ActiveFilters` - Display all active filters
7. `SortControls` - Sort by + direction
8. `FilterPresets` - Preset selection dropdown
9. `useFilterParams` - URL sync hook

---

## Hook Updates

### useSearch Enhancement

```typescript
interface SearchFilters {
  // Existing
  searchTerm: string;
  category: string | null;
  type: string | null;
  minLevel: number;
  maxLevel: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';

  // New
  affiliation: string | null;
  building: string | null;
  damageTypes: string[];        // Multi-select
  statusEffects: string[];      // Multi-select
  resistances: string[];        // Multi-select
  immunities: string[];         // Multi-select
  specialAbilities: string[];   // Multi-select
}

// Filter logic for new filters
const filterByDamageType = (unit: Unit, types: string[]) => {
  if (types.length === 0) return true;
  return unit.actions.some(action =>
    types.includes(action.damageType)
  );
};

const filterByStatusEffect = (unit: Unit, effects: string[]) => {
  if (effects.length === 0) return true;
  return unit.actions.some(action =>
    action.statusEffect && effects.includes(action.statusEffect.type)
  );
};

const filterByResistance = (unit: Unit, resistances: string[]) => {
  if (resistances.length === 0) return true;
  if (!unit.resistances) return false;
  return resistances.some(type => {
    const hpRes = unit.resistances?.hp?.[type];
    const armorRes = unit.resistances?.armor?.[type];
    return (hpRes && hpRes > 0) || (armorRes && armorRes > 0);
  });
};

const filterByImmunity = (unit: Unit, immunities: string[]) => {
  if (immunities.length === 0) return true;
  if (!unit.immunities) return false;
  return immunities.some(imm => unit.immunities.includes(imm));
};
```

---

## Performance Considerations

- Debounce all filter changes (not just search)
- Memoize filter options extraction
- Consider indexing for complex filters
- Virtual scrolling if result count is high
- Lazy compute derived values (max damage, etc.)

---

## Mobile Considerations

- Filters collapse to a modal/drawer on mobile
- Touch-friendly filter controls
- Swipe to clear filter pills
- Sticky filter summary at top while scrolling results
