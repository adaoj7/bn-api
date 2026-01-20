# Battle Nations Database - Roadmap

## Vision
Build a comprehensive Battle Nations database that can simulate battles using the game's combat mechanics.

## Current State
- React 19 + TypeScript + Vite app
- Basic unit browsing with search/filter
- **49 units** in database (44 Barracks soldiers + 5 TF2 units) with resistances/immunities
- Clean data model with rank progression, actions, and costs
- Data sourced from Battle Nations Miraheze wiki

---

## Phase 1: Complete Unit Database

### Goal
Pull in all Battle Nations units with complete data.

### Unit Categories to Add
- [x] Soldiers - Barracks (44/44 standard units complete)
- [x] Soldiers - TF2 units (5/5 complete: Scout, Heavy, Demoman, Soldier, Pyro)
- [ ] Vehicles (Vehicle Factory)
- [ ] Tanks (Tank Factory)
- [ ] Artillery
- [ ] Air units (Airfield)
- [ ] Naval units (Shipyard)
- [ ] Bosses/Special units

### Not Including
- Promotional/limited-time units (too many variants, incomplete data)

### Data Requirements per Unit
- Basic info (name, description, category, type, unlock level)
- Production cost and time
- Stats per rank (health, armor, defense, dodge, bravery, range, etc.)
- Promotion costs per rank (resources, time, SP)
- All actions with:
  - Damage ranges per rank
  - Offense, critical chance, hits
  - Ammo, reload, cooldown
  - Range (min/max)
  - Targetable unit types
  - Area effect flag
  - Armor piercing percentage
  - Status effects (stun, poison, fire DoT, etc.)
  - Unlock rank and cost

### Data Source
- Primary: https://battlenations.miraheze.org/wiki/

---

## Phase 2: Battle Simulation Engine

### Core Mechanics to Implement
- [ ] Turn-based combat system
- [ ] Hit/miss calculation (offense vs defense/dodge)
- [ ] Damage calculation with ranges
- [ ] Critical hit system
- [ ] Ammo and reload mechanics
- [ ] Cooldown tracking
- [ ] Bravery/morale system
- [ ] Unit positioning and range
- [ ] Area effect targeting
- [ ] Unit type targeting restrictions

### Combat Flow
1. Player selects unit and action
2. Player selects target(s)
3. Calculate hit chance: `offense vs (defense + dodge)`
4. Roll for hit/miss
5. Calculate damage (random within range)
6. Roll for critical
7. Apply damage, check for defeat
8. Handle ammo consumption
9. Apply cooldowns
10. Next unit's turn

### UI Requirements
- Battle grid/field visualization
- Unit placement
- Action selection interface
- Target selection
- Combat log/results
- Health bars and status indicators

---

## Phase 3: Enhanced Features

### Potential Features
- [ ] Army builder / squad composition
- [ ] Battle presets and scenarios
- [ ] Combat statistics and analytics
- [ ] Unit comparison tools
- [ ] Optimal counter recommendations
- [ ] Save/load battle states

---

## Technical Considerations

### Battle Simulation Architecture
```
src/
  simulation/
    engine/
      BattleEngine.ts      # Core battle loop
      CombatCalculator.ts  # Hit/damage calculations
      TurnManager.ts       # Turn order and phases
    types/
      BattleTypes.ts       # Battle-specific types
    hooks/
      useBattle.ts         # React hook for battle state
```

### State Management
- Consider Zustand or similar for battle state
- Need to track:
  - All units on field with current HP, ammo, cooldowns
  - Turn order
  - Combat log
  - Battle outcome

---

## Open Questions

1. What grid size did Battle Nations use?
2. How was turn order determined?
3. How did the bravery/suppression system work exactly?
4. Were there any hidden modifiers or RNG mechanics?
5. How did area effects determine which units were hit?
