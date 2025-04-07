export interface Resource {
    type: string;
    amount: number;
}

export interface UnitRank {
    level: number;
    health: number;
    bravery: number;
    defense: number;
    dodge: number;
    abilitySlots: number;
    range: number;
    pvpValue: number;
    sp: number;
    gold: number;
}

export interface ActionRank {
    level: number;
    damage?: string;
    offense: number;
    criticalChance: number;
    hits?: number;
}

export interface UnlockCost {
    time: string;
    nanos: number;
}

export interface UnitAction {
    name: string;
    description: string;
    type: string;
    unlockRank?: number;
    ammo: number;
    ammoUsed: number;
    reloadTime: number;
    cooldown: number;
    range: string;
    suppressionMod: number;
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
    category: string;
    type: string;
    unlockLevel: number;
    productionTime: number;
    cost: Resource[];
    stats: {
        ranks: UnitRank[];
    };
    actions: UnitAction[];
    specialAbilities?: string[];
    motto?: string;
}
