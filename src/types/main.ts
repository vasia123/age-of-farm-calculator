
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