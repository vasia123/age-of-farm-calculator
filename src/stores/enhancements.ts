import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Enhancement, EnhancementType, Tool } from '@/types/main';
import { usePricesStore } from './prices';

export const useEnhancementsStore = defineStore('enhancements', () => {
    const pricesStore = usePricesStore();

    const enhancements = ref<Enhancement[]>([
        {
            name: 'Dog',
            icon: 'img/dog.jpg',
            type: 'dog',
            boost: 20,
            craftCost: {
                food: 3000,
                skin: 0,
            },
            craftChance: 0.4,
        },
        {
            name: 'Clothing',
            icon: 'img/clothing.jpg',
            type: 'clothing',
            boost: 0,
            craftCost: {
                food: 0,
                skin: 5,
            },
            craftChance: 1,
        },
    ]);


    const getEnhancementCraftCost = (enhancement: Enhancement): number => {
        const baseCost = Object.entries(enhancement.craftCost).reduce((sum, [resource, amount]) => {
            const resourceCost = pricesStore.getResourcePrice(resource as keyof typeof pricesStore.prices);
            return sum + amount * resourceCost;
        }, 0);
        return baseCost / enhancement.craftChance;
    };

    const getEnhancementsByType = computed(() => {
        return (type: EnhancementType) => enhancements.value.filter(e => e.type === type);
    });

    const availableEnhancements = (tool: Tool | undefined) => {
        if (!tool) return [];

        return tool.resource === 'skin'
            ? enhancements.value.filter(e => e.type === 'dog')
            : enhancements.value.filter(e => e.type === 'clothing');
    };

    return {
        enhancements,
        getEnhancementCraftCost,
        getEnhancementsByType,
        availableEnhancements,
    };
});