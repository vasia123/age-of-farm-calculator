
export type ResourceType = 'wood' | 'food' | 'stone'

export interface Tool {
    name: string;
    icon: string;
    profit: number;
    wood: number;
    stone: number;
    cooldown: number;
    resource: ResourceType;
    energy: number;
    durability: number;
    maxDurability: number;
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

export type Buff = {
    name: string;
    cost: {
        planks?: number;
        ton: number;
        soup?: number;
        ingot?: number;
    };
    bonus_percent: {
        mining_up?: number;
        energy_cost_reduce?: number;
        durability_cost_reduce?: number;
    };
    cooldown: string;
}
