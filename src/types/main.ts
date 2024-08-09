
export type ResourceType = 'wood' | 'food' | 'stone' | 'skin'

export interface Tool {
    name: string;
    icon: string;
    profit: number;
    chance?: number;
    craft: {
        wood: number;
        stone: number;
        [key: string]: number;
    };
    cooldown: number;
    resource: ResourceType;
    energy: number;
    repair: {
        wood: number;
        stone: number;
    };
}

export interface CraftedTool extends Tool {
    craftPrice: number;
    enhancements?: CraftedEnhancement[];
}

export type Prices = { [key in ResourceType]: number };

export interface NftPrices {
    'Common Axe': string;
    'Common Pickaxe': string;
    'Common Spear': string;
    'Uncommon Axe': string;
    'Uncommon Pickaxe': string;
    'Uncommon Spear': string;
    'Rare Axe': string;
    'Rare Pickaxe': string;
    'Rare Spear': string;
    'Epic Axe': string;
    'Epic Pickaxe': string;
    'Epic Spear': string;
    'Legendary Axe': string | null;
    'Legendary Pickaxe': string | null;
    'Legendary Spear': string | null;
    requestTime: string;
}

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface Tent {
    name: string;
    icon: string;
    boost: number;
    additionalToolSlots: number;
    craft: {
        wood: number;
        stone: number;
        skin: number;
        [key: string]: number;
    };
}

export interface CraftedTent extends Tent {
    craftPrice: number;
}

export type EnhancementType = 'dog' | 'clothing';

export interface Enhancement {
    name: string;
    icon: string;
    type: EnhancementType;
    boost: number;
    craftCost: {
        food: number;
        skin: number;
    };
    craftChance: number;
}

export interface CraftedEnhancement extends Enhancement {
    craftPrice: number;
}

export interface StoredEnhancement {
    name: string;
    craftPrice: number;
}

export interface Account {
    id: number;
    name: string;
    tools: CraftedTool[];
    tents: CraftedTent[];
    editing: boolean;
}

export interface CraftedTool extends Tool {
    craftPrice: number;
    enhancements?: CraftedEnhancement[];
}

export interface StoredTool {
    name: string;
    craftPrice: number;
    enhancements?: StoredEnhancement[];
}

export interface StoredTent {
    name: string;
    craftPrice: number;
}

export interface StoredEnhancement {
    name: string;
    craftPrice: number;
}
export interface StoredAccount {
    id: number;
    name: string;
    tools: StoredTool[];
    tents: StoredTent[];
}