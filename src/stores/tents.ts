// stores/tents.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Tent, CraftedTent, ResourceType } from '@/types/main';
import { usePricesStore } from './prices';
import { useSummariesStore } from './summaries';

export const useTentsStore = defineStore('tents', () => {
    const pricesStore = usePricesStore();
    const summariesStore = useSummariesStore();

    const tents = ref<Tent[]>([
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

    const getTentCraftCost = (tent: Tent): number => {
        return Object.entries(tent.craft).reduce((sum, [resourceOrTool, amount]) => {
            if (Object.keys(pricesStore.prices).includes(resourceOrTool)) {
                const resourceCost = pricesStore.getResourcePrice(resourceOrTool as ResourceType)
                return amount * resourceCost + sum
            } else {
                const foundTent = tents.value.find(t => t.name === resourceOrTool)
                if (!foundTent) {
                    return sum
                }
                return amount * getTentCraftCost(foundTent) + sum
            }
        }, 0);
    };

    const getTentROI = (tent: CraftedTent): number => {
        // Calculate daily profit increase due to boost
        const boostMultiplier = 1 + (tent.boost / 100);
        const dailyProfitIncrease = summariesStore.getAllProfitSummary() * (boostMultiplier - 1);

        // Calculate ROI
        return tent.craftPrice / dailyProfitIncrease;
    };

    const getTentTotalCost = (tent: Tent): number => {
        return Object.entries(tent.craft).reduce((sum, [resourceOrTent, amount]) => {
            if (Object.keys(pricesStore.prices).includes(resourceOrTent)) {
                const resourceCost = pricesStore.getResourcePrice(resourceOrTent as ResourceType)
                return amount * resourceCost + sum
            } else {
                const foundTool = tents.value.find(t => t.name === resourceOrTent)
                if (!foundTool) {
                    return sum
                }
                return amount * getTentTotalCost(foundTool) + sum
            }
        }, 0);
    };

    function getTentCraftResources(tent: Tent) {
        return Object.keys(tent.craft).map(resourceOrTent => {
            if (Object.keys(pricesStore.prices).includes(resourceOrTent)) {
                const resource = resourceOrTent as ResourceType
                return {
                    icon: `img/${resource}.png`,
                    count: String(tent.craft[resource]),
                    cost: tent.craft[resource] * pricesStore.getResourcePrice(resource)
                }
            }
            const foundTool = tents.value.find(t => t.name === resourceOrTent)
            if (!foundTool) {
                return {
                    icon: ``,
                    count: '',
                    cost: 0
                }
            }
            const toolCraftPrice = getTentTotalCost(foundTool)
            return {
                icon: foundTool.icon,
                count: 1,
                cost: toolCraftPrice
            }
        })
    }

    return {
        tents,
        getTentCraftCost,
        getTentROI,
        getTentTotalCost,
        getTentCraftResources,
    };
});