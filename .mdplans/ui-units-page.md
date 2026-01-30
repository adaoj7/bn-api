# UI Plan: Units Page

## Overview
Enhance the UnitsPage with better unit cards, advanced filtering, and comparison selection capabilities.

---

## Current State

The UnitsPage has:
- Search bar (debounced text search on name/description)
- Filter panel with: Category, Type, Level range, Sort by (Level/Name)
- 3-column grid of unit cards showing: Image, Name, Rank 1 Health, Unit Type

**Missing**:
- Affiliation filter
- Building filter
- Damage type filter
- Grid/list view toggle
- Compare selection mode
- More info on unit cards
- Better visual hierarchy

---

## Proposed Layout

### Filter Bar (Enhanced)
```
┌─────────────────────────────────────────────────────────────────────┐
│ [Search...                                    ]  [🔍]              │
├─────────────────────────────────────────────────────────────────────┤
│ Category: [All ▼]   Affiliation: [All ▼]   Building: [All ▼]       │
│ Type: [All ▼]       Level: [1] - [60]      Sort: [Level ▼] [↑↓]   │
├─────────────────────────────────────────────────────────────────────┤
│ [Show Advanced Filters ▼]                                           │
│ Damage Type: [All ▼]   Has Status Effect: [All ▼]                  │
│ Has Resistance: [All ▼]  Has Immunity: [All ▼]                     │
├─────────────────────────────────────────────────────────────────────┤
│ [Grid View] [List View]                      [Compare (0 selected)] │
└─────────────────────────────────────────────────────────────────────┘
```

### Unit Card (Grid View - Enhanced)
```
┌─────────────────────────────────┐
│ [Checkbox for compare]     [⭐] │ ← favorite
│                                 │
│        [Unit Image]             │
│                                 │
│ ────────────────────────────── │
│ Grenadier                       │
│ Soldier • Imperial              │
│ ────────────────────────────── │
│ ❤️ 450 HP   ⚔️ 45-55 dmg       │
│ 🛡️ 25 def   📍 1-2 range       │
│ ────────────────────────────── │
│ [Explosive] [Fire]              │ ← damage types
│ ────────────────────────────── │
│ Lvl 15 • Barracks               │
└─────────────────────────────────┘
```

Key additions:
- Affiliation shown
- Primary damage output (highest damage action)
- Defense stat
- Range
- Damage type badges for actions
- Building name
- Compare checkbox
- Optional favorite

### Unit Card (List View)
```
┌─────────────────────────────────────────────────────────────────────────┐
│ [□] [Image] Grenadier        Soldier • Imperial   ❤️450  ⚔️45-55       │
│             Lvl 15 • Barracks                      🛡️25   📍1-2        │
│             [Explosive] [Fire]                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### Compare Mode
When "Compare" is clicked:
- Cards show checkboxes prominently
- Selected cards are highlighted
- Bottom bar appears:
```
┌─────────────────────────────────────────────────────────────────────────┐
│ 3 units selected: Grenadier, Heavy Tank, Plasma Tank                    │
│                                           [Clear] [Compare Selected →]  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Filter Options

### Category (existing)
- All, Soldier, Vehicle, Tank, Artillery, Naval, Air, Critter, Sniper, Defense, Infected

### Affiliation (new)
- All, Imperial, Raider, Infected, Frontier, TF2, Silver Wolves, Neutral, Ancient, Wild

### Building (new)
- All, Barracks, Vehicle Factory, Tank Factory, Artillery Camp, Animal Corral, Raider Camp, Infection Test Facility, Shipyard, etc.

### Type (existing)
- All, then dynamically populated from data

### Damage Type Dealt (new - advanced)
- All, Piercing, Explosive, Fire, Crushing, Concussive, Chemical, Electric, Cold, Radiation

### Has Status Effect (new - advanced)
- All, Poison, Fire, Stun, Freeze

### Has Resistance (new - advanced)
- All, then list damage types

### Has Immunity (new - advanced)
- All, Poison, Fire, Stun, Freeze

---

## Implementation Tasks

### Phase 1: Enhanced Filtering
- [ ] Add affiliation filter (extract unique values from data)
- [ ] Add building filter (extract unique values)
- [ ] Update useSearch hook to support new filters
- [ ] Add filter pills showing active filters

### Phase 2: Advanced Filters
- [ ] Add collapsible "Advanced Filters" section
- [ ] Add damage type dealt filter
- [ ] Add status effect filter
- [ ] Add resistance filter
- [ ] Add immunity filter

### Phase 3: Enhanced Unit Cards
- [ ] Add affiliation to card display
- [ ] Calculate and show primary damage output
- [ ] Add defense stat
- [ ] Add range display
- [ ] Add damage type badges
- [ ] Add building name

### Phase 4: View Toggle
- [ ] Create list view layout
- [ ] Add view toggle button
- [ ] Persist view preference to localStorage

### Phase 5: Compare Selection
- [ ] Add compare mode state
- [ ] Add checkboxes to cards
- [ ] Add selection bar at bottom
- [ ] Link to comparison page with selected units
- [ ] Persist selections to URL params or localStorage

### Phase 6: Polish
- [ ] Add empty state for no results
- [ ] Add result count display
- [ ] Loading skeletons
- [ ] Mobile responsive improvements
- [ ] Keyboard navigation for filters

---

## Components to Create/Update

1. `FilterBar` - Enhanced filter component
2. `AdvancedFilters` - Collapsible advanced filter section
3. `FilterPill` - Show active filter with remove button
4. `UnitCardGrid` - Enhanced grid view card
5. `UnitCardList` - New list view card
6. `ViewToggle` - Grid/list toggle button
7. `CompareBar` - Bottom bar for compare mode
8. `DamageTypeBadge` - Small badge for damage types

---

## State Management

```typescript
// useSearch hook enhancements
interface SearchFilters {
  searchTerm: string;
  category: string | null;
  type: string | null;
  affiliation: string | null;      // NEW
  building: string | null;         // NEW
  minLevel: number;
  maxLevel: number;
  damageType: string | null;       // NEW (advanced)
  statusEffect: string | null;     // NEW (advanced)
  hasResistance: string | null;    // NEW (advanced)
  hasImmunity: string | null;      // NEW (advanced)
  sortBy: 'level' | 'name' | 'health' | 'damage';
  sortDirection: 'asc' | 'desc';
}

// View and compare state
interface PageState {
  viewMode: 'grid' | 'list';
  compareMode: boolean;
  selectedForCompare: number[]; // unit IDs
}
```

---

## URL Parameters

Support URL params for sharing filtered views:
```
/units?category=Tank&affiliation=Imperial&level=20-40&sort=health
```

---

## Performance Considerations

- Debounce filter changes (already done for search)
- Memoize filtered results
- Use virtualization if unit count grows significantly
- Lazy load images with placeholder
