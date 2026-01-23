export interface ResourceCost {
  type: string;
  amount: number;
}

export interface PromotionCost {
  resources: ResourceCost[];
  time: number;
  sp: number;
}

export interface RankStats {
  level: number;
  health: number;
  defense: number;
  dodge: number;
  bravery: number;
  abilitySlots: number;
  range: number;
  pvpValue: number;
  spReward: number;
  goldReward: number;
  promotionCost?: PromotionCost;
}

export interface DamageModifier {
  type: string;
  percent: number;
}

export interface StatusEffect {
  type: string;
  chance: number;
  duration?: number;
  damagePerTurn?: number;
}

export interface Action {
  name: string;
  damageType: string;
  minDamage: number;
  maxDamage: number;
  attacksCount: number;
  accuracy: number;
  ammo: number;
  range: {
    min: number;
    max: number;
  };
  targetType: string;
  damageModifiers?: DamageModifier[];
  statusEffects?: StatusEffect[];
  rankRequired?: number;
  armorPiercing?: number;
  critChance?: number;
  critMultiplier?: number;
}

export interface Unit {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  unitType: string;
  affiliation: string;
  building: string;
  buildingLevel: number;
  unlockLevel: number;
  productionTime: number;
  cost: ResourceCost[];
  blocking: string;
  maxRank: number;
  motto?: string;
  stats: {
    ranks: RankStats[];
  };
  actions: Action[];
}

export interface UnitSummary {
  id: number;
  name: string;
  description: string;
  category: string;
  affiliation: string;
  building: string;
  maxRank: number;
  maxHealth: number;
  maxDefense: number;
  totalSpCost: number;
  totalPromotionTime: number;
}
