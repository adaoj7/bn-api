# UI Plan: Unit Detail Page

## Overview
Overhaul the UnitDetail page to display all available unit data, especially rank progression and combat mechanics.

---

## Current State

The UnitDetail page shows:
- Image, name, description, motto
- Unlock level
- Basic info (category, type, production time)
- **Rank 1 stats only** (health, defense, dodge, bravery, range)
- Production cost
- Actions (rank 1 damage, offense, crit chance, ammo, reload, cooldown, range)
- Special abilities (if any)

**Missing**:
- Rank selector/progression
- Promotion costs
- Armor stat
- Resistances and immunities
- PvP value, SP reward, gold reward
- Building & building level requirement
- Affiliation
- Blocking type
- Status effects on actions
- Armor piercing on actions
- Suppression modifiers
- Type-specific crit chances
- Action unlock requirements
- Spawn on death

---

## Proposed Layout

### Header Section
```
[Unit Image]    [Name]
                [Motto - italicized]
                [Description]

                Category: [X]  |  Type: [X]  |  Affiliation: [X]
                Building: [X] (Level [X])  |  Unlock Level: [X]
                Blocking: [Full/Partial/None]
```

### Rank Selector
```
┌─────────────────────────────────────────────┐
│  Rank:  [1] [2] [3] [4] [5] [6]            │
│         ^^^                                 │
│        (selected)                           │
└─────────────────────────────────────────────┘
```
- Clicking a rank updates all stat displays below
- Visual indicator for max rank
- Disabled ranks if unit has fewer than 6

### Stats Section (for selected rank)
```
┌─────────────────────────────────────────────┐
│ STATS AT RANK [X]                           │
├─────────────────────────────────────────────┤
│ Health: 450       Defense: 35               │
│ Armor: 10         Dodge: 15                 │
│ Bravery: 25       Range: 2                  │
│ Ability Slots: 3                            │
├─────────────────────────────────────────────┤
│ PvP Value: 120    SP Reward: 45             │
│ Gold Reward: 100                            │
└─────────────────────────────────────────────┘
```

### Rank Progression Table
```
┌─────────────────────────────────────────────────────────────┐
│ RANK PROGRESSION                                             │
├──────┬────────┬─────────┬───────┬───────┬─────────┬────────┤
│ Rank │ Health │ Defense │ Armor │ Dodge │ Bravery │ Range  │
├──────┼────────┼─────────┼───────┼───────┼─────────┼────────┤
│ 1    │ 300    │ 25      │ 5     │ 10    │ 20      │ 2      │
│ 2    │ 350    │ 28      │ 6     │ 11    │ 22      │ 2      │
│ 3    │ 400    │ 31      │ 7     │ 12    │ 24      │ 2      │
│ ...  │ ...    │ ...     │ ...   │ ...   │ ...     │ ...    │
└──────┴────────┴─────────┴───────┴───────┴─────────┴────────┘
```
- Collapsible by default, expandable
- Highlight selected rank row

### Promotion Costs
```
┌─────────────────────────────────────────────────────────────┐
│ PROMOTION COSTS                                              │
├──────┬──────────────────────────────┬───────────┬───────────┤
│ Rank │ Resources                     │ Time      │ SP        │
├──────┼──────────────────────────────┼───────────┼───────────┤
│ 1→2  │ 500 Gold, 100 Iron           │ 2h 30m    │ 50        │
│ 2→3  │ 1000 Gold, 200 Iron, 5 Bars  │ 4h 00m    │ 100       │
│ ...  │ ...                          │ ...       │ ...       │
└──────┴──────────────────────────────┴───────────┴───────────┘
```

### Resistances & Immunities
```
┌─────────────────────────────────────────────────────────────┐
│ RESISTANCES                                                  │
├─────────────────────────────────────────────────────────────┤
│ HP Resistances:                                              │
│   [Explosive: -20%] [Fire: +15%] [Piercing: 0%]            │
│                                                              │
│ Armor Resistances:                                           │
│   [Explosive: -30%] [Crushing: +10%]                        │
├─────────────────────────────────────────────────────────────┤
│ IMMUNITIES                                                   │
│   [Poison] [Stun]                                           │
└─────────────────────────────────────────────────────────────┘
```
- Color coded: green for resistant, red for vulnerable
- Show only if unit has resistances/immunities

### Production Cost
```
┌─────────────────────────────────────────────────────────────┐
│ PRODUCTION                                                   │
├─────────────────────────────────────────────────────────────┤
│ Cost: [Gold icon] 1000  [Iron icon] 200                     │
│ Time: 1h 30m                                                 │
│ Unlock Cost: [Gold icon] 5000 (if applicable)               │
└─────────────────────────────────────────────────────────────┘
```

### Actions Section (Enhanced)
```
┌─────────────────────────────────────────────────────────────┐
│ ACTIONS                                                      │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Rifle Shot                              [Piercing icon] │ │
│ │ "A standard rifle attack"                               │ │
│ ├─────────────────────────────────────────────────────────┤ │
│ │ Damage at Rank [X]:  45-55                              │ │
│ │ Offense: 65    Crit Chance: 10%    Hits: 1              │ │
│ │ Range: 1-2     Line of Fire: Direct                     │ │
│ │ Ammo: 3/1      Reload: 2 turns    Cooldown: 0          │ │
│ │                                                          │ │
│ │ [Armor Piercing: 20%]                                   │ │
│ │ [Status: Poison - 25% chance, 3 turns, 5-10 dmg/turn]  │ │
│ │ [Suppression: +15%]                                     │ │
│ │                                                          │ │
│ │ Type-Specific Crits:                                    │ │
│ │   vs Soldiers: +5%  vs Vehicles: 0%  vs Tanks: -5%     │ │
│ │                                                          │ │
│ │ Can Target: [Soldier] [Vehicle] [Tank]                  │ │
│ │ [Area Effect]                                           │ │
│ │                                                          │ │
│ │ [Unlocks at Rank 3 - Cost: 500 Gold, 100 SP]           │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ [Next action card...]                                        │
└─────────────────────────────────────────────────────────────┘
```

### Action Damage Progression
```
┌─────────────────────────────────────────────────────────────┐
│ ACTION DAMAGE BY RANK                                        │
├──────┬────────────┬─────────┬─────────────┬────────────────┤
│ Rank │ Damage     │ Offense │ Crit Chance │ Hits           │
├──────┼────────────┼─────────┼─────────────┼────────────────┤
│ 1    │ 30-40      │ 55      │ 8%          │ 1              │
│ 2    │ 35-45      │ 60      │ 9%          │ 1              │
│ ...  │ ...        │ ...     │ ...         │ ...            │
└──────┴────────────┴─────────┴─────────────┴────────────────┘
```
- Show per action, collapsible

### Special Section (if applicable)
```
┌─────────────────────────────────────────────────────────────┐
│ SPECIAL                                                      │
├─────────────────────────────────────────────────────────────┤
│ Special Abilities: [First Strike] [Taunt]                   │
│ Spawns on Death: [Zombie Soldier]                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Tasks

### Phase 1: Core Stat Display
- [ ] Add rank selector component
- [ ] Display stats for selected rank (not just rank 1)
- [ ] Add armor stat display
- [ ] Add PvP value, SP reward, gold reward
- [ ] Add building and building level
- [ ] Add affiliation and blocking type

### Phase 2: Rank Progression
- [ ] Create RankProgressionTable component
- [ ] Add promotion costs table
- [ ] Format time values nicely (seconds → hours/minutes)
- [ ] Format resource costs with icons

### Phase 3: Resistances & Immunities
- [ ] Create ResistanceChart component
- [ ] Create ImmunityBadge component
- [ ] Color code resistance values
- [ ] Only show section if unit has data

### Phase 4: Enhanced Actions
- [ ] Update damage display to use selected rank
- [ ] Add armor piercing display
- [ ] Add suppression modifier display
- [ ] Add status effect display with details
- [ ] Add type-specific crit chances
- [ ] Show targetable types as badges
- [ ] Add action damage progression table (collapsible)
- [ ] Show action unlock requirements

### Phase 5: Polish
- [ ] Add spawn on death display
- [ ] Add unlock cost display
- [ ] Responsive design for mobile
- [ ] Accessibility improvements
- [ ] Loading states

---

## Components to Create

1. `RankSelector` - Tab/button group for rank selection
2. `RankProgressionTable` - Stats across all ranks
3. `PromotionCostTable` - Costs to promote
4. `ResistanceDisplay` - HP and armor resistances
5. `ImmunityBadge` - Status effect immunity indicator
6. `ActionCard` - Enhanced action display
7. `ActionProgressionTable` - Action damage across ranks
8. `StatusEffectDisplay` - Status effect details
9. `TargetTypeBadges` - What unit types can be targeted
10. `ResourceCost` - Reusable resource display with icons

---

## State Management

```typescript
// Local state for UnitDetail page
const [selectedRank, setSelectedRank] = useState(1);
const [expandedSections, setExpandedSections] = useState({
  rankProgression: false,
  promotionCosts: false,
  actionProgression: {} // keyed by action index
});
```

---

## Mock Data Display Example

For a unit like "Grenadier" at Rank 4:
- Show rank 4 stats, not rank 1
- Show damage for rank 4 of each action
- Show promotion cost from rank 4 to rank 5
- Highlight any actions that unlock at rank 4
