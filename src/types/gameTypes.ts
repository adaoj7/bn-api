export interface Resource {
    type: string;
    amount: number;
}

export interface NumericRange {
    min: number;
    max: number;
}

export interface PromotionCost {
    resources: Resource[];
    time: number; // seconds
    sp: number;
}

export interface UnitRank {
    level: number;
    health: number;
    armor?: number; // separate armor pool (some units gain armor at higher ranks)
    bravery: number;
    defense: number;
    dodge: number;
    abilitySlots: number;
    range: number;
    pvpValue: number;
    spReward: number; // SP gained when defeating this unit
    goldReward: number; // Gold gained when defeating this unit
    promotionCost?: PromotionCost; // cost to reach this rank (undefined for rank 1)
}

export interface ActionRank {
    level: number;
    damage?: NumericRange;
    offense: number;
    criticalChance: number;
    hits?: number;
    // Critical chance bonuses vs specific unit types
    critVsSoldiers?: number;
    critVsVehicles?: number;
    critVsTanks?: number;
    critVsCritters?: number;
}

// Status effect applied by an attack
export interface StatusEffect {
    type: "Poison" | "Fire" | "Stun" | "Freeze";
    chance: number; // percentage chance to apply (e.g., 60 = 60%)
    duration: number; // turns
    damage?: NumericRange; // DoT damage per turn (for Poison/Fire)
}

export interface UnlockCost {
    time: number; // seconds
    nanos?: number;
    gold?: number;
    resources?: Resource[];
}

// Damage resistances as percentages (100 = full damage, 50 = half damage, 0 = immune)
export interface DamageResistances {
    crushing?: number;
    explosive?: number;
    fire?: number;
    cold?: number;
    piercing?: number;
}

export interface SuppressionMod {
    multiplier?: number; // e.g., 0.5 for x0.5
    flat?: number; // e.g., 15 for +15
}

export interface UnitAction {
    name: string;
    description?: string;
    damageType: string; // Explosive, Piercing, Fire, Cold, Crushing, etc.
    lineOfFire: "Direct" | "Indirect";
    unlockRank?: number;
    ammo: number; // -1 for unlimited
    ammoUsed: number;
    reloadTime: number; // rounds to reload
    cooldown: number; // rounds after firing before can fire again
    weaponCooldown?: number; // additional weapon-specific cooldown
    prepTime?: number; // rounds of windup before attack fires
    range: NumericRange;
    armorPiercing?: number; // percentage of damage that bypasses armor (e.g., 25 = 25%)
    statusEffect?: StatusEffect; // status effect applied on hit
    suppressionMod?: SuppressionMod;
    areaEffect?: boolean;
    unlockCost?: UnlockCost;
    targetableTypes: Record<string, boolean>;
    ranks: ActionRank[];
}

export interface Unit {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    category: string; // Soldier, Vehicle, Tank, etc.
    unitType: string; // infantry, armored, air, naval, etc.
    affiliation: string; // Imperial, Raider, Infected, Frontier, TF2, etc.
    building: string; // Barracks, Vehicle Factory, etc.
    buildingLevel?: number; // minimum building level required
    unlockLevel: number; // player level required
    unlockCost?: Resource[]; // cost to unlock (if any)
    productionTime: number; // seconds at base building level
    cost: Resource[]; // production cost
    blocking?: "Full" | "Partial" | "None";
    maxRank: number;
    immunities?: string[]; // status effect immunities (e.g., "Stun", "Poison", "Fire", "Freeze")
    resistances?: {
        hp?: DamageResistances; // resistances applied to health damage
        armor?: DamageResistances; // resistances applied to armor damage
    };
    spawnOnDeath?: string; // unit name spawned when this unit dies (e.g., "Grenadier")
    stats: {
        ranks: UnitRank[];
    };
    actions: UnitAction[];
    specialAbilities?: string[];
    motto?: string;
}
