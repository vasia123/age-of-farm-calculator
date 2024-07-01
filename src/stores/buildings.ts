import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ResourceType } from '@/types/main';
import { usePricesStore } from './prices';

export interface Building {
    name: string;
    icon: string;
    boost: number;
    additionalToolSlots: number;
    craftCost: {
        wood: number;
        stone: number;
        skin: number;
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
            craftCost: {
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
            craftCost: {
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
            craftCost: {
                wood: 3600,
                stone: 4500,
                skin: 9
            }
        }
    ]);

    const getBuildingTotalCost = computed(() => (building: Building) => {
        return Object.entries(building.craftCost).reduce((total, [resource, amount]) => {
            return total + amount * pricesStore.getResourcePrice(resource as ResourceType);
        }, 0);
    });

    return {
        buildings,
        getBuildingTotalCost
    };
});