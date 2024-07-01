import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { ResourceType } from '@/types/main';
import { usePricesStore } from './prices';

export interface Building {
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

export const useBuildingsStore = defineStore('buildings', () => {
    const pricesStore = usePricesStore();

    const buildings = ref<Building[]>([
        {
            name: 'Common Tent',
            icon: '/age-of-farm-calculator/img/tent_common.png',
            boost: 10,
            additionalToolSlots: 1,
            craft: {
                wood: 1600,
                stone: 2000,
                skin: 2,
            }
        },
        {
            name: 'Uncommon Tent',
            icon: '/age-of-farm-calculator/img/tent_uncommon.png',
            boost: 20,
            additionalToolSlots: 2,
            craft: {
                'Common Tent': 1,
                wood: 2400,
                stone: 3000,
                skin: 5,
            }
        },
        {
            name: 'Rare Tent',
            icon: '/age-of-farm-calculator/img/tent_rare.png',
            boost: 30,
            additionalToolSlots: 3,
            craft: {
                'Uncommon Tent': 1,
                wood: 3600,
                stone: 4500,
                skin: 9,
            }
        }
    ]);

    const getBuildingTotalCost = (building: Building): number => {
        return Object.entries(building.craft).reduce((sum, [resourceOrTool, amount]) => {
            if (Object.keys(pricesStore.prices).includes(resourceOrTool)) {
                const resourceCost = pricesStore.getResourcePrice(resourceOrTool as ResourceType)
                return amount * resourceCost + sum
            } else {
                const foundTool = buildings.value.find(t => t.name === resourceOrTool)
                if (!foundTool) {
                    return sum
                }
                return amount * getBuildingTotalCost(foundTool) + sum
            }
        }, 0);
    };

    function getBuildingCraftResources(building: Building) {
        return Object.keys(building.craft).map(resourceOrTool => {
            if (Object.keys(pricesStore.prices).includes(resourceOrTool)) {
                const resource = resourceOrTool as ResourceType
                return {
                    icon: `img/${resource}.png`,
                    count: String(building.craft[resource]),
                    cost: building.craft[resource] * pricesStore.getResourcePrice(resource)
                }
            }
            const foundTool = buildings.value.find(t => t.name === resourceOrTool)
            if (!foundTool) {
                return {
                    icon: ``,
                    count: '',
                    cost: 0
                }
            }
            const toolCraftPrice = getBuildingTotalCost(foundTool)
            return {
                icon: foundTool.icon,
                count: 1,
                cost: toolCraftPrice
            }
        })
    }

    return {
        buildings,
        getBuildingTotalCost,
        getBuildingCraftResources,
    };
});