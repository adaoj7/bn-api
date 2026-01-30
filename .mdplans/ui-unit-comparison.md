# UI Plan: Unit Comparison Tool

## Overview
Create a dedicated unit comparison page that allows users to compare 2-4 units side-by-side, examining stats, costs, and actions at any rank.

---

## Access Points

1. From UnitsPage compare mode (select units → "Compare Selected")
2. Direct URL: `/compare?units=1,5,23` (by unit IDs)
3. From UnitDetail page: "Compare with..." button
4. From comparison page: Add/remove units

---

## Proposed Layout

### Header
```
┌─────────────────────────────────────────────────────────────────────────┐
│ UNIT COMPARISON                                     Rank: [1 ▼] [2-6]   │
├─────────────────────────────────────────────────────────────────────────┤
│ [+ Add Unit]  (shows search/picker modal when clicked)                  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Comparison Grid (2-4 columns)
```
┌─────────────────────────────────────────────────────────────────────────┐
│           │ Grenadier      │ Heavy Tank    │ Shocktrooper │ [+ Add]   │
│           │ [× remove]     │ [× remove]    │ [× remove]   │           │
├───────────┼────────────────┼───────────────┼──────────────┼───────────┤
│           │ [Image]        │ [Image]       │ [Image]      │           │
│           │ Soldier        │ Tank          │ Soldier      │           │
│           │ Imperial       │ Imperial      │ Imperial     │           │
├───────────┼────────────────┼───────────────┼──────────────┼───────────┤
│ STATS     │                │               │              │           │
├───────────┼────────────────┼───────────────┼──────────────┼───────────┤
│ Health    │ 450            │ 1200 ★        │ 380          │           │
│ Defense   │ 25             │ 45 ★          │ 30           │           │
│ Armor     │ 0              │ 50 ★          │ 0            │           │
│ Dodge     │ 15 ★           │ 5             │ 12           │           │
│ Bravery   │ 25             │ 40 ★          │ 20           │           │
│ Range     │ 2              │ 2             │ 3 ★          │           │
├───────────┼────────────────┼───────────────┼──────────────┼───────────┤
│ COSTS     │                │               │              │           │
├───────────┼────────────────┼───────────────┼──────────────┼───────────┤
│ Gold      │ 1000 ★         │ 5000          │ 1500         │           │
│ Iron      │ 200 ★          │ 800           │ 300          │           │
│ Time      │ 1h 30m ★       │ 4h 00m        │ 2h 00m       │           │
│ Unlock Lv │ 15 ★           │ 35            │ 25           │           │
├───────────┼────────────────┼───────────────┼──────────────┼───────────┤
│ DAMAGE    │                │               │              │           │
├───────────┼────────────────┼───────────────┼──────────────┼───────────┤
│ Primary   │ 45-55 Explo    │ 80-100 Explo ★│ 35-45 Elec   │           │
│ Max DPS*  │ ~33            │ ~60 ★         │ ~40          │           │
│ Types     │ [Exp] [Fire]   │ [Exp]         │ [Elec]       │           │
├───────────┼────────────────┼───────────────┼──────────────┼───────────┤
│ SPECIAL   │                │               │              │           │
├───────────┼────────────────┼───────────────┼──────────────┼───────────┤
│ Resistances│ Fire +15%     │ Exp +20%      │ Elec +50% ★  │           │
│ Immunities │ -             │ Stun          │ -            │           │
│ Status FX │ Poison (Grenade)│ -            │ Stun (Shock) │           │
│ Special   │ -              │ First Strike  │ -            │           │
└───────────┴────────────────┴───────────────┴──────────────┴───────────┘

★ = Best value in comparison (green highlight)
Worst value = red text
```

### Actions Comparison (Expandable)
```
┌─────────────────────────────────────────────────────────────────────────┐
│ ACTIONS COMPARISON                                           [Expand ▼] │
├─────────────────────────────────────────────────────────────────────────┤
│ Grenadier Actions:                                                       │
│   • Rifle Shot: 30-40 Piercing, Range 1-2, Ammo 3                       │
│   • Grenade: 45-55 Explosive, Range 1-2, Ammo 2, Area Effect            │
│   • Fire Grenade: 35-45 Fire, Range 1-2, Ammo 1, Status: Burn           │
│                                                                          │
│ Heavy Tank Actions:                                                      │
│   • Cannon: 80-100 Explosive, Range 1-3, Ammo 2, Armor Pierce 30%       │
│   • Machine Gun: 20-30 Piercing, Range 1-2, Ammo 5                      │
│                                                                          │
│ Shocktrooper Actions:                                                    │
│   • Shock Prod: 35-45 Electric, Range 1, Ammo ∞, Status: Stun           │
│   • Pistol: 15-25 Piercing, Range 1-2, Ammo 4                           │
└─────────────────────────────────────────────────────────────────────────┘
```

### Promotion Cost Comparison
```
┌─────────────────────────────────────────────────────────────────────────┐
│ TOTAL PROMOTION COST (to Max Rank)                                       │
├───────────┼────────────────┼───────────────┼──────────────┬─────────────┤
│ Gold      │ 15,000 ★       │ 45,000        │ 22,000       │             │
│ Iron      │ 3,000 ★        │ 12,000        │ 5,000        │             │
│ Bars      │ 50 ★           │ 200           │ 100          │             │
│ SP        │ 500 ★          │ 1,500         │ 800          │             │
│ Time      │ 12h ★          │ 36h           │ 18h          │             │
└───────────┴────────────────┴───────────────┴──────────────┴─────────────┘
```

---

## Unit Picker Modal

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ADD UNIT TO COMPARISON                                           [×]    │
├─────────────────────────────────────────────────────────────────────────┤
│ [Search units...                                              ]         │
│                                                                          │
│ Category: [All ▼]   Affiliation: [All ▼]                               │
├─────────────────────────────────────────────────────────────────────────┤
│ [Image] Grenadier - Soldier, Imperial, Lvl 15           [Already added] │
│ [Image] Heavy Gunner - Soldier, Imperial, Lvl 20              [+ Add]   │
│ [Image] Mortar Team - Artillery, Imperial, Lvl 18             [+ Add]   │
│ [Image] Rifleman - Soldier, Imperial, Lvl 1                   [+ Add]   │
│ ...                                                                      │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Tasks

### Phase 1: Basic Comparison Page
- [ ] Create `/compare` route
- [ ] Create ComparisonPage component
- [ ] Parse unit IDs from URL params
- [ ] Fetch units using useUnits hook
- [ ] Basic side-by-side layout (2 columns)

### Phase 2: Stats Comparison
- [ ] Create ComparisonTable component
- [ ] Display all stats side-by-side
- [ ] Highlight best/worst values
- [ ] Add rank selector affecting all units

### Phase 3: Unit Picker
- [ ] Create UnitPickerModal component
- [ ] Search and filter functionality
- [ ] Add to comparison action
- [ ] Show already-added state
- [ ] Limit to 4 units max

### Phase 4: Actions Comparison
- [ ] Create ActionsComparison component
- [ ] List all actions per unit
- [ ] Show key stats for each action
- [ ] Expandable/collapsible

### Phase 5: Advanced Features
- [ ] Calculate and show total promotion costs
- [ ] Calculate theoretical DPS
- [ ] Show resistance comparison
- [ ] Export comparison as image/link
- [ ] Shareable URL with unit IDs

### Phase 6: Polish
- [ ] Responsive design (stack vertically on mobile)
- [ ] Empty state when no units selected
- [ ] Loading states
- [ ] Animations for adding/removing units

---

## Components to Create

1. `ComparisonPage` - Main page component
2. `ComparisonTable` - Side-by-side stat comparison
3. `ComparisonHeader` - Unit images, names, remove buttons
4. `UnitPickerModal` - Modal for adding units
5. `ActionsComparison` - Compare unit actions
6. `PromotionCostComparison` - Total promotion costs
7. `StatHighlight` - Wrapper that applies best/worst styling

---

## State Management

```typescript
interface ComparisonState {
  unitIds: number[];           // 2-4 unit IDs
  selectedRank: number;        // 1-6, applies to all units
  expandedSections: {
    actions: boolean;
    promotionCosts: boolean;
  };
}

// URL sync
// /compare?units=1,5,23&rank=4
```

---

## Calculations

### Best Value Highlighting
- For stats like Health, Defense, Damage: higher is better (green)
- For stats like Cost, Time: lower is better (green)
- Worst value gets red text

### DPS Calculation (rough estimate)
```typescript
// Theoretical DPS = (avgDamage * offense/100) / (reloadTime + 1)
// This is a rough estimate, actual combat is more complex
const calculateTheoreticalDPS = (action: Action) => {
  const avgDamage = (action.damage.min + action.damage.max) / 2;
  const hitChance = action.offense / 100; // simplified
  const turnsPerAttack = action.reloadTime + 1;
  return (avgDamage * hitChance) / turnsPerAttack;
};
```

---

## Edge Cases

- Unit has fewer than 6 ranks: disable higher rank selection or show N/A
- Unit missing certain stats: show "-" or "N/A"
- Trying to add same unit twice: show "Already added" state
- Trying to add more than 4: show limit message
- All units removed: show empty state with "Add units to compare"
