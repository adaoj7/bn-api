# UI Plan: Combat Mechanics Display

## Overview
Add educational UI elements that explain Battle Nations combat mechanics, helping users understand how stats and abilities interact in battle.

---

## Goals

1. Explain what each stat means and how it's used
2. Show damage type effectiveness relationships
3. Explain status effects and their impacts
4. Help users understand combat calculations
5. Make the database useful without requiring wiki knowledge

---

## Tooltip System

### Stat Tooltips
Every stat should have an info icon that shows explanation on hover/click.

```
Health [ℹ️]
────────────────────────────────────
450
```

Tooltip content:
```
┌─────────────────────────────────────────────────────────────┐
│ HEALTH                                                       │
├─────────────────────────────────────────────────────────────┤
│ The amount of damage a unit can take before being defeated.  │
│ Reduced by incoming damage after defense and resistances     │
│ are applied.                                                 │
└─────────────────────────────────────────────────────────────┘
```

### All Stat Explanations

| Stat | Explanation |
|------|-------------|
| Health | Total damage a unit can absorb before defeat |
| Defense | Reduces chance of being hit. Compared against attacker's Offense |
| Dodge | Additional chance to avoid attacks entirely |
| Armor | Flat damage reduction applied before HP damage. Can be bypassed by Armor Piercing |
| Bravery | Resistance to suppression effects. Higher bravery = less affected by morale damage |
| Range | Maximum distance (in tiles) the unit can attack from |
| Offense | Chance to hit. Compared against defender's Defense + Dodge |
| Critical Chance | Chance to deal bonus damage on a hit |
| Ammo | Number of times this action can be used before needing to reload |
| Reload | Number of turns required to restore ammo |
| Cooldown | Turns that must pass before using this action again |
| Armor Piercing | Percentage of target's armor that is ignored |
| Suppression | Reduces target's bravery/effectiveness when hit |

---

## Damage Type System

### Damage Type Icons
Create visual icons for each damage type:

| Type | Icon | Color |
|------|------|-------|
| Piercing | 🎯 | Gray |
| Explosive | 💥 | Orange |
| Fire | 🔥 | Red |
| Crushing | 🔨 | Brown |
| Concussive | 💫 | Yellow |
| Chemical | ☠️ | Green |
| Electric | ⚡ | Blue |
| Cold | ❄️ | Cyan |
| Radiation | ☢️ | Purple |

### Damage Type Tooltips

```
[💥 Explosive]
────────────────────────────────────
Tooltip:
┌─────────────────────────────────────────────────────────────┐
│ EXPLOSIVE DAMAGE                                             │
├─────────────────────────────────────────────────────────────┤
│ High-impact damage effective against structures and          │
│ vehicles. Often deals area damage.                           │
│                                                              │
│ Strong against: Vehicles, Buildings                          │
│ Weak against: Infantry (spread out)                          │
│                                                              │
│ Common sources: Grenades, Rockets, Tank Cannons              │
└─────────────────────────────────────────────────────────────┘
```

---

## Resistance Display

### Visual Resistance Chart

```
┌─────────────────────────────────────────────────────────────┐
│ DAMAGE RESISTANCES                                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ HP Resistances:                                              │
│ Piercing    [████████░░]  +20% resistant                    │
│ Explosive   [██████░░░░]   0% neutral                       │
│ Fire        [████░░░░░░] -20% vulnerable                    │
│ Electric    [██████████] +50% resistant                     │
│                                                              │
│ Armor Resistances:                                           │
│ Piercing    [████████░░] +30% - armor more effective        │
│ Crushing    [████░░░░░░] -30% - armor less effective        │
│                                                              │
└─────────────────────────────────────────────────────────────┘

Legend:
  Green bars = Resistant (takes less damage)
  Red bars = Vulnerable (takes more damage)
  Gray = Neutral
```

---

## Status Effects

### Status Effect Badges

```
[🔥 Burn] [💀 Poison] [💫 Stun] [❄️ Freeze]
```

### Status Effect Tooltips

```
[🔥 Burn]
────────────────────────────────────
Tooltip:
┌─────────────────────────────────────────────────────────────┐
│ BURN (Fire Damage Over Time)                                 │
├─────────────────────────────────────────────────────────────┤
│ Inflicts fire damage at the start of each turn.              │
│                                                              │
│ Duration: 3 turns                                            │
│ Damage: 5-10 per turn                                        │
│ Total potential damage: 15-30                                │
│                                                              │
│ Can be prevented by: Fire Immunity                           │
│ Countered by: Units with Fire resistance                     │
└─────────────────────────────────────────────────────────────┘
```

### All Status Effects

| Status | Icon | Effect |
|--------|------|--------|
| Poison | 💀 | Deals Chemical damage each turn |
| Burn | 🔥 | Deals Fire damage each turn |
| Stun | 💫 | Unit skips their turn |
| Freeze | ❄️ | Unit cannot move or act, takes bonus damage |

---

## Combat Flow Explainer

### "How Combat Works" Section
Add a help section or modal explaining combat:

```
┌─────────────────────────────────────────────────────────────┐
│ HOW COMBAT WORKS                                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ 1. ATTACK ROLL                                               │
│    Attacker's Offense vs Defender's (Defense + Dodge)       │
│    Higher offense = better chance to hit                     │
│                                                              │
│ 2. DAMAGE CALCULATION                                        │
│    Base damage rolled within action's damage range           │
│    Modified by: Armor, Armor Piercing, Resistances           │
│                                                              │
│ 3. CRITICAL HIT                                              │
│    Chance based on Critical Chance stat                      │
│    Crits deal bonus damage                                   │
│                                                              │
│ 4. APPLY EFFECTS                                             │
│    Status effects have a % chance to apply                   │
│    Immunities can prevent status effects                     │
│                                                              │
│ 5. AMMO & COOLDOWNS                                          │
│    Ammo consumed, reload counter starts when empty           │
│    Cooldown prevents immediate reuse of powerful attacks     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Effective Against / Weak Against

### Unit Detail Enhancement

Add a "Combat Effectiveness" section:

```
┌─────────────────────────────────────────────────────────────┐
│ COMBAT EFFECTIVENESS                                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ ✅ Effective Against:                                        │
│    • Vehicles (high Explosive damage)                        │
│    • Infantry (Fire status effect)                           │
│    • Units weak to Fire damage                               │
│                                                              │
│ ❌ Struggles Against:                                        │
│    • Tanks (high armor, Explosive resistance)                │
│    • Fire-immune units                                       │
│    • Long-range units (only 2 range)                         │
│                                                              │
│ ℹ️ This analysis is based on the unit's damage types,        │
│    range, and special abilities.                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Tasks

### Phase 1: Tooltip Infrastructure
- [ ] Create Tooltip component (hover/click activated)
- [ ] Create InfoIcon component
- [ ] Add stat definitions data file
- [ ] Implement tooltips on all stats in UnitDetail

### Phase 2: Damage Type Display
- [ ] Create DamageTypeIcon component
- [ ] Create damage type definitions
- [ ] Add damage type tooltips
- [ ] Style damage type badges consistently

### Phase 3: Resistance Visualization
- [ ] Create ResistanceBar component
- [ ] Create ResistanceChart component
- [ ] Color code by effectiveness
- [ ] Add legend

### Phase 4: Status Effect Display
- [ ] Create StatusEffectBadge component
- [ ] Create status effect definitions
- [ ] Add detailed tooltips
- [ ] Show on action cards

### Phase 5: Combat Explainer
- [ ] Create HelpModal component
- [ ] Write combat mechanics content
- [ ] Add "How does this work?" links
- [ ] Create glossary page

### Phase 6: Effectiveness Analysis
- [ ] Create logic to analyze unit strengths
- [ ] Create CombatEffectiveness component
- [ ] Generate "effective against" suggestions
- [ ] Generate "weak against" warnings

---

## Components to Create

1. `Tooltip` - Reusable tooltip wrapper
2. `InfoIcon` - Small "i" icon that triggers tooltip
3. `DamageTypeIcon` - Icon + color for damage types
4. `DamageTypeBadge` - Full badge with icon, name, tooltip
5. `ResistanceBar` - Visual bar showing resistance level
6. `ResistanceChart` - Full resistance display
7. `StatusEffectBadge` - Status effect with icon and tooltip
8. `HelpModal` - Modal for combat mechanics explanation
9. `CombatEffectiveness` - Analysis of unit strengths/weaknesses
10. `Glossary` - Page with all game terms

---

## Data Files to Create

### `src/data/gameDefinitions.ts`

```typescript
export const statDefinitions = {
  health: {
    name: "Health",
    description: "The amount of damage a unit can take before being defeated.",
    icon: "❤️"
  },
  defense: {
    name: "Defense",
    description: "Reduces chance of being hit. Compared against attacker's Offense.",
    icon: "🛡️"
  },
  // ... etc
};

export const damageTypeDefinitions = {
  piercing: {
    name: "Piercing",
    description: "Standard bullet and projectile damage.",
    icon: "🎯",
    color: "#6B7280",
    strongAgainst: ["Infantry"],
    weakAgainst: ["Vehicles", "Tanks"]
  },
  // ... etc
};

export const statusEffectDefinitions = {
  poison: {
    name: "Poison",
    description: "Deals Chemical damage at the start of each turn.",
    icon: "💀",
    damageType: "Chemical",
    preventedBy: "Poison Immunity"
  },
  // ... etc
};
```

---

## Accessibility Considerations

- Tooltips should be keyboard accessible
- Color coding should have text alternatives
- Screen reader support for icons
- Sufficient contrast for resistance bars
