
export type ResourceType = 'wood' | 'food' | 'stone'

export interface Tool {
    name: string;
    icon: string;
    profit: number;
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
}

export interface Account {
    id: number;
    name: string;
    tools: CraftedTool[];
    editing: boolean;
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