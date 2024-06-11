import { defineStore } from 'pinia';
import type { Tool, ResourceType } from '@/types/main';
import { usePricesStore } from './prices';

export const useToolsStore = defineStore('tools', () => {
  const tools: Tool[] = [
    // {
    //   name: 'Axe (Promo)',
    //   icon: 'img/axe_promo.png',
    //   profit: 0.2,
    //   craft: {
    //     wood: 0,
    //     stone: 0,
    //   },
    //   cooldown: 1,
    //   resource: 'wood',
    //   energy: 1,
    //   repair: {
    //     wood: 0.05,
    //     stone: 0.05,
    //   },
    // },
    {
      name: 'Axe (Common)',
      icon: 'img/axe_common.png',
      profit: 5,
      craft: {
        wood: 500,
        stone: 670,
      },
      cooldown: 1,
      resource: 'wood',
      energy: 3,
      repair: {
        wood: 1,
        stone: 2,
      },
    },
    {
      name: 'Axe (Uncommon)',
      icon: 'img/axe_uncommon.png',
      profit: 11,
      craft: {
        wood: 930,
        stone: 1340,
      },
      cooldown: 1,
      resource: 'wood',
      energy: 6,
      repair: {
        wood: 2,
        stone: 5,
      },
    },
    {
      name: 'Axe (Rare)',
      icon: 'img/axe_rare.png',
      profit: 24,
      craft: {
        wood: 1750,
        stone: 2640,
      },
      cooldown: 1,
      resource: 'wood',
      energy: 12,
      repair: {
        wood: 4,
        stone: 10,
      },
    },
    {
      name: 'Axe (Epic)',
      icon: 'img/axe_epic.png',
      profit: 53,
      craft: {
        wood: 3750,
        stone: 5320,
      },
      cooldown: 1,
      resource: 'wood',
      energy: 24,
      repair: {
        wood: 8,
        stone: 22,
      },
    },
    {
      name: 'Axe (Legendary)',
      icon: 'img/axe_legendary.png',
      profit: 118,
      craft: {
        wood: 7750,
        stone: 10680,
      },
      cooldown: 1,
      resource: 'wood',
      energy: 48,
      repair: {
        wood: 16,
        stone: 45,
      },
    },
    // {
    //   name: 'Pickaxe (Promo)',
    //   icon: 'img/pickaxe_promo.png',
    //   profit: 0.2,
    //   craft: {
    //     wood: 0,
    //     stone: 0,
    //   },
    //   cooldown: 1,
    //   resource: 'stone',
    //   energy: 1,
    //   repair: {
    //     wood: 0.05,
    //     stone: 0.05,
    //   },
    // },
    {
      name: 'Pickaxe (Common)',
      icon: 'img/pickaxe_common.png',
      profit: 5,
      craft: {
        wood: 650,
        stone: 500,
      },
      cooldown: 1,
      resource: 'stone',
      energy: 3,
      repair: {
        wood: 2,
        stone: 1,
      },
    },
    {
      name: 'Pickaxe (Uncommon)',
      icon: 'img/pickaxe_uncommon.png',
      profit: 11,
      craft: {
        wood: 1300,
        stone: 970,
      },
      cooldown: 1,
      resource: 'stone',
      energy: 6,
      repair: {
        wood: 5,
        stone: 2,
      },
    },
    {
      name: 'Pickaxe (Rare)',
      icon: 'img/pickaxe_rare.png',
      profit: 24,
      craft: {
        wood: 2600,
        stone: 1890,
      },
      cooldown: 1,
      resource: 'stone',
      energy: 12,
      repair: {
        wood: 11,
        stone: 4,
      },
    },
    {
      name: 'Pickaxe (Epic)',
      icon: 'img/pickaxe_epic.png',
      profit: 53,
      craft: {
        wood: 5200,
        stone: 3890,
      },
      cooldown: 1,
      resource: 'stone',
      energy: 24,
      repair: {
        wood: 22,
        stone: 8,
      },
    },
    {
      name: 'Pickaxe (Legendary)',
      icon: 'img/pickaxe_legendary.png',
      profit: 118,
      craft: {
        wood: 10400,
        stone: 7890,
      },
      cooldown: 1,
      resource: 'stone',
      energy: 48,
      repair: {
        wood: 45,
        stone: 16,
      },
    },
    {
      name: 'Spear (Common)',
      icon: 'img/spear_common.png',
      profit: 4,
      craft: {
        wood: 580,
        stone: 580,
      },
      cooldown: 1,
      resource: 'food',
      energy: 3,
      repair: {
        wood: 1,
        stone: 1,
      },
    },
    {
      name: 'Spear (Uncommon)',
      icon: 'img/spear_uncommon.png',
      profit: 8,
      craft: {
        wood: 1160,
        stone: 1110,
      },
      cooldown: 1,
      resource: 'food',
      energy: 6,
      repair: {
        wood: 2,
        stone: 2,
      },
    },
    {
      name: 'Spear (Rare)',
      icon: 'img/spear_rare.png',
      profit: 19,
      craft: {
        wood: 2220,
        stone: 2170,
      },
      cooldown: 1,
      resource: 'food',
      energy: 12,
      repair: {
        wood: 5,
        stone: 4,
      },
    },
    {
      name: 'Spear (Epic)',
      icon: 'img/spear_epic.png',
      profit: 39,
      craft: {
        wood: 4340,
        stone: 4290,
      },
      cooldown: 1,
      resource: 'food',
      energy: 24,
      repair: {
        wood: 8,
        stone: 8,
      },
    },
    {
      name: 'Spear (Legendary)',
      icon: 'img/spear_legendary.png',
      profit: 92,
      craft: {
        wood: 8580,
        stone: 8530,
      },
      cooldown: 1,
      resource: 'food',
      energy: 48,
      repair: {
        wood: 18,
        stone: 18,
      },
    },
  ];
  const types: Record<ResourceType, Tool[]> = {
    wood: [],
    food: [],
    stone: [],
  };
  for (const tool of tools) {
    if (!types[tool.resource]) {
      types[tool.resource] = [];
    }
    types[tool.resource].push(tool);
  }
  const toolsByType = types;

  const pricesStore = usePricesStore();

  function getToolCraftCost(tool: Tool): number {
    return tool.craft.wood * pricesStore.prices.wood + tool.craft.stone * pricesStore.prices.stone;
  }

  function getToolOneUseEnergyCost(tool: Tool): number {
    return tool.energy / 5 * pricesStore.prices.food;
  }

  function getToolOneUseDurabilityCost(tool: Tool): number {
    return tool.repair.wood * pricesStore.prices.wood + tool.repair.stone * pricesStore.prices.stone;
  }

  function getToolHourlyProfit(tool: Tool): number {
    const grossProfit = tool.profit * pricesStore.getResourcePrice(tool.resource);
    const energyCost = getToolOneUseEnergyCost(tool);
    const durabilityCost = getToolOneUseDurabilityCost(tool);
    const netProfit = (grossProfit - energyCost - durabilityCost) / tool.cooldown;
    return netProfit;
  }

  function getToolDailyProfit(tool: Tool) {
    return getToolHourlyProfit(tool) * 24;
  }

  function getToolROI(tool: Tool, craftPrice: number): { hours: number; days: number } {
    const hourlyProfit = getToolHourlyProfit(tool);
    const roiHours = craftPrice / hourlyProfit;
    const roiDays = roiHours / 24;
    return { hours: roiHours, days: roiDays };
  }

  return {
    tools,
    toolsByType,
    getToolCraftCost,
    getToolOneUseEnergyCost,
    getToolOneUseDurabilityCost,
    getToolHourlyProfit,
    getToolDailyProfit,
    getToolROI,
  };
});
