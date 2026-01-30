export type MechanicsTopic = 'overview' | 'unit_stats' | 'weapon_stats' | 'damage_types' | 'status_effects' | 'all';

export interface GameMechanicsResult {
  topic: MechanicsTopic;
  content: string;
}

const OVERVIEW = `
# Battle Nations Combat Overview

Battle Nations is a turn-based tactical combat game where strategic unit placement, damage type matching, and status effect management are key to victory.

## Core Concepts

### Combat Flow
- Battles take place on a grid-based battlefield
- Units take turns attacking based on their position and abilities
- Victory is achieved by eliminating all enemy units

### Key Strategic Elements
1. **Damage Types** - 7 damage types with different effectiveness against armor/units
2. **Armor vs HP** - Armor absorbs damage before HP; some attacks pierce armor
3. **Line of Fire** - Different attack types can target through/around blocking units
4. **Status Effects** - Attacks can suppress, stun, freeze, or apply DoT effects
5. **Unit Positioning** - Blocking units protect those behind them

### Combat Stats Summary
- **HP** (green bar): Unit health - when depleted, unit is destroyed
- **Armor** (blue bar): Damage buffer that absorbs hits before HP
- **Offense**: Accuracy - compared against target's Defense
- **Defense**: Evasiveness - makes attacks more likely to miss
- **Bravery**: Resistance to suppression effects
`;

const UNIT_STATS = `
# Unit Stats

## Defensive Stats

### HP (Hit Points)
Represents the unit's durability, displayed as a green bar. When HP reaches zero, the unit is destroyed.

### Armor
A protective blue bar that absorbs damage before HP is affected. Attacks without armor-piercing reduce Armor first. Armor-piercing attacks damage both Armor and HP based on their armor-piercing percentage.

### Bravery
Measures resistance to Suppression. Low Bravery units are more easily suppressed, reducing their accuracy.

### Defense
Determines how hard a unit is to hit. Compared against attacker's Offense to determine hit chance. Higher Defense = more misses.

### Dodge
Hidden stat - chance to significantly reduce damage from an otherwise successful hit.

### Blocking
Determines what fire types the unit blocks for units behind it:
- **None**: Blocks only Contact fire
- **Partial**: Blocks Contact and Direct fire
- **Blocking**: Blocks Contact, Direct, and Precise fire

### Base Defense (Damage Resistances)
Percentages showing damage reduction by type. Example: "85% Fire" means Fire attacks deal only 85% damage. Values above 100% indicate weakness.

### Armor Defense
Same as Base Defense but applies only to damage against Armor, not HP.
`;

const WEAPON_STATS = `
# Weapon Stats

### Offense
Accuracy stat compared against target's Defense. Higher Offense = more hits. Temporarily reduced by Suppression.

### Power
Base damage dealt when an attack hits. May show multiplier (e.g., "×3") indicating multiple separate attack rolls.

### Damage Type
One of 7 types: Piercing, Crushing, Explosive, Fire, Cold, Torpedo, Depth Charge. Each has different effectiveness.

### Range
How many rows the attack can reach. Format "2-" means minimum range of 2 (can't hit adjacent enemies).

### Line of Fire
What the attack can target past blocking units:
- **Contact**: Only targets the first unit in range (melee)
- **Direct**: Can fire past non-blocking units (most common)
- **Precise**: Can target past Partial blockers (snipers)
- **Indirect**: Can target any unit in range, ignores blockers (artillery)
- **(Back)**: Only targets rearmost unit in column
- **(Fixed)**: Hits fixed area, cannot change aim

### Prep Time
Rounds before attack can first be used (charge-up period).

### Ability Cooldown
Rounds required before the attack can be used again.

### Ammo & Reload
Ammunition available. When depleted, unit must Reload (cannot attack during reload rounds).

### Armor Piercing %
Percentage of damage applied directly to HP, bypassing Armor.

### Base Crit
Critical hit chance (default 5%). Crits deal 1.85x damage.

### Crit% vs. X
Increased crit chance against specific unit types (e.g., Snipers vs Infantry).

### Suppression Mod
Modifier affecting how likely the attack causes Suppression. x0 = never suppresses.

### Area of Effect (AoE)
Attacks hitting multiple targets:
- Multi-target: Full damage to each target
- Splash: Reduced damage to nearby targets
- Randomized: Chance to hit each square in area
`;

const DAMAGE_TYPES = `
# Damage Types

Battle Nations has 7 damage types, each with different effectiveness:

## Piercing
The most common damage type. Effective against unarmored units but struggles against Armor. Exceptions like Railgun Trooper penetrate armor well despite being Piercing.

## Crushing
Armor resists Crushing well. Deals heavy damage but many units have resistance. Used by Brutal Brawler, Mech Trooper, Imperial Peacemonger.

## Explosive
Excellent against Armor. Many units have no resistance to it. Typically lower accuracy than Piercing/Crushing. Used by tanks and artillery.

## Fire
Armor offers only ~25% resistance. Excels against Critters (who take 25%+ extra damage). Often applies Fire DoT or Poison DoT. Used by Pyros, flame units.

## Cold
Introduced in patch 3.5. Very few units resist it (Arctic Trooper, Arctic Tank, Ancient Sentinel). Currently rare - mainly Legendary Boar uses it.

## Torpedo (Naval only)
Introduced in patch 4.5. Effective against battleships. Can cause Breach DoT. Used by Submarines, Mini Subs, Tactical Submarines.

## Depth Charge (Naval only)
Introduced in patch 4.5. Highly effective against submarines. Used by Navy Troopers and some naval units.
`;

const STATUS_EFFECTS = `
# Status Effects

Status effects impair units and can stack with each other.

## Suppression
The most common effect. Reduces the affected unit's Offense (accuracy), causing more misses. Resisted by Bravery stat.

## Immobilization Effects

### Stun
Unit cannot act for set rounds. Cooldowns freeze. Dodge greatly reduced. Some units (Riot Trooper, Armadillo) lose Armor protection while stunned.
- Infantry/Critter stuns: Flashbang, Shield Bash, Tear Gas
- Vehicle stuns: Electric Strike, EMP Grenades
- Universal stuns: Pyro flames, Smoke Bomb

### Freeze
Same as Stun PLUS increases damage taken from Piercing, Crushing, Explosive, and Fire by 50% (150% damage modifier). Excellent for breaking through heavy armor.

## Susceptibility Effects
Applied by Weapon Technician:
- **Explosive**: Target takes 400% Explosive damage
- **Shatter**: Target takes 400% Crushing damage
- **Firemod**: Target takes 220% Fire damage

## Damage over Time (DoT)

### Fire DoT
Diminishing damage over 2-6 turns. Total: 1.75x-4x initial damage. Affected by Fire resistance. Plasma DoT is 2-turn Fire with 5% armor piercing.

### Poison DoT
Stronger than Fire DoT. First turn damage equals initial attack. Total: 2.5x-4x initial damage over 2-5 turns. Counts as Fire-type for resistances.

### Breach DoT (Naval)
Caused by Torpedo/Depth Charge attacks. 3-turn duration dealing ~80% additional damage total.

## Environmental DoT
Affects all units in certain locations:
- **Cold**: 60 damage/turn in Eastern Wastes
- **Fire**: 10 damage/turn in Spiderwasp Nest
- **Plague**: Damages Troopers/Critters (Vehicles and Infected immune)
- **Quake**: Crushing damage (Air units immune)
`;

/**
 * Get game mechanics information for Battle Nations
 */
export function getGameMechanics(topic: MechanicsTopic = 'overview'): GameMechanicsResult {
  let content: string;

  switch (topic) {
    case 'overview':
      content = OVERVIEW;
      break;
    case 'unit_stats':
      content = UNIT_STATS;
      break;
    case 'weapon_stats':
      content = WEAPON_STATS;
      break;
    case 'damage_types':
      content = DAMAGE_TYPES;
      break;
    case 'status_effects':
      content = STATUS_EFFECTS;
      break;
    case 'all':
      content = [OVERVIEW, UNIT_STATS, WEAPON_STATS, DAMAGE_TYPES, STATUS_EFFECTS].join('\n\n---\n');
      break;
    default:
      content = OVERVIEW;
  }

  return {
    topic,
    content: content.trim(),
  };
}
