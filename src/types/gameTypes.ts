// Common types
export interface BaseGameItem {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    unlockLevel: number;
}

// Unit types
export interface Resource {
    type: string;
    amount: number;
}

export interface UnitStats {
    health: StatRange | number;
    attack: StatRange | number;
    defense: StatRange | number;
    dodge?: StatRange;
    bravery?: StatRange;
    range: number;
    movementSpeed?: number;
}

export interface StatRange {
    base: number;
    maxRank: number;
}

export interface UnitAction {
    name: string;
    description: string;
    damage: DamageRange | number;
    accuracy?: AccuracyRange;
    criticalChance?: number;
    ammo?: number;
    reloadTime?: number;
    cooldown: number;
    range: string | number;
    unlockRank?: number;
    areaEffect?: boolean;
}

export interface DamageRange {
    base: string;
    maxRank: string;
    hits?: number;
}

export interface AccuracyRange {
    base: number;
    maxRank: number;
}

export interface Unit extends BaseGameItem {
    type: "infantry" | "vehicle" | "air" | "special";
    productionTime: number;
    cost: Resource[];
    stats: UnitStats;
    actions: UnitAction[];
    specialAbilities?: string[];
    motto?: string;
    ranks?: {
        total: number;
        promotionCosts: (null | PromotionCost)[];
    };
}

interface PromotionCost {
    gold: number;
    time: string;
    sp: number;
    iron?: number;
    bars?: number;
    laurels?: number;
}

// Building types
export interface BuildingProduction {
    resourceType: string;
    amountPerHour: number;
}

export interface Building extends BaseGameItem {
    type: "resource" | "military" | "decoration" | "special";
    footprint: { width: number; height: number };
    constructionTime: number;
    cost: Resource[];
    production?: BuildingProduction[];
    populationBonus?: number;
    buildingRequirements?: number[]; // IDs of buildings required
}

// Mission types
export interface MissionReward {
    type: string;
    amount: number;
}

export interface MissionRequirement {
    type: "level" | "unit" | "building" | "mission";
    id?: number;
    amount?: number;
    level?: number;
}

export interface Mission extends BaseGameItem {
    type: "story" | "side" | "special";
    requirementsToUnlock: MissionRequirement[];
    rewards: MissionReward[];
    estimatedTime: number; // in minutes
    previousMission?: number; // ID of the previous mission in sequence
}
