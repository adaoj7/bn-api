# UI Improvements Plan

## Overview
With 192 units now in the database with comprehensive data (stats, actions, ranks, resistances, costs, etc.), the UI needs to be updated to properly display and utilize this rich data.

---

## Current State

### What the UI Shows
- **UnitsPage**: Unit cards with name, image, rank 1 health, unit type
- **UnitDetail**: Basic info, rank 1 stats only, production cost, actions (rank 1 damage only), special abilities

### What the Data Has (but UI doesn't show)
- Full rank progression (ranks 1-6) for stats and action damage
- Promotion costs (resources, time, SP)
- Resistances (hp and armor damage type resistances)
- Immunities (status effect immunities)
- Armor and armor piercing values
- Status effects on actions (poison, fire, stun, freeze)
- Suppression modifiers
- Type-specific critical chances (vs Soldiers, Vehicles, Tanks, Critters)
- PvP values, SP rewards, gold rewards
- Unlock costs
- Spawn on death units
- Building level requirements

---

## UI Improvement Areas

### 1. Unit List Page Enhancements
**Plan**: [ui-units-page.md](ui-units-page.md)
- Enhanced unit cards with more useful at-a-glance info
- Advanced filtering (by affiliation, building, damage type, etc.)
- Grid/list view toggle
- Quick compare selection

### 2. Unit Detail Page Overhaul
**Plan**: [ui-unit-detail.md](ui-unit-detail.md)
- Rank selector to view stats at any rank
- Full rank progression table/visualization
- Promotion costs display
- Resistances and immunities section
- Enhanced actions display with all mechanics
- Status effects visualization

### 3. Unit Comparison Tool
**Plan**: [ui-unit-comparison.md](ui-unit-comparison.md)
- Side-by-side comparison of 2-4 units
- Compare stats, costs, actions
- Highlight differences
- Export/share comparisons

### 4. Combat Mechanics Display
**Plan**: [ui-combat-mechanics.md](ui-combat-mechanics.md)
- Explain game mechanics inline
- Tooltips for damage types, status effects
- Visual damage type chart
- Effective against / weak against indicators

### 5. Search & Filter Improvements
**Plan**: [ui-search-filters.md](ui-search-filters.md)
- Filter by affiliation
- Filter by building
- Filter by damage type dealt
- Filter by resistances/immunities
- Filter by special abilities
- Advanced search syntax

---

## Priority Order

1. **Unit Detail Page** - Most impactful, shows the rich data we have
2. **Search & Filter** - Makes the database more useful
3. **Unit List Page** - Improve browsing experience
4. **Unit Comparison** - High value feature for players
5. **Combat Mechanics** - Educational, improves understanding

---

## Technical Considerations

### Shared Components to Create
- `RankSelector` - Dropdown/tabs to select rank level
- `RankProgressionTable` - Show stat progression across ranks
- `DamageTypeIcon` - Visual icon for damage types
- `StatusEffectBadge` - Display status effects
- `ResourceCost` - Reusable resource display component
- `ResistanceChart` - Visual resistance display
- `ComparisonTable` - Side-by-side stat comparison

### State Management
- Consider unit comparison selections (persist across navigation)
- Rank selection preference (remember user's preferred rank view)
- Filter preferences (remember last used filters)

### Performance
- Lazy load rank progression tables
- Virtualize long lists if needed
- Optimize re-renders when changing ranks

---

## Success Metrics

- All unit data visible and accessible in UI
- Users can quickly find units matching specific criteria
- Users can compare units easily
- Combat mechanics are understandable without external wiki
