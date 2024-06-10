import { defineStore } from 'pinia';
import type { Tool, ResourceType } from '@/types/main';
import { usePricesStore } from './prices';

export const useToolsStore = defineStore('tools', () => {
  const tools: Tool[] = [
    { name: 'Axe (Promo)', icon: 'img/axe_promo.png', profit: 0.2, wood: 110, stone: 20, cooldown: 1, resource: 'wood', energy: 1, durability: 1, maxDurability: 25 },
    { name: 'Axe (Common)', icon: 'img/axe_common.png', profit: 5, wood: 500, stone: 670, cooldown: 1, resource: 'wood', energy: 3, durability: 5, maxDurability: 100 },
    { name: 'Axe (Uncommon)', icon: 'img/axe_uncommon.png', profit: 11, wood: 1430, stone: 2010, cooldown: 1, resource: 'wood', energy: 6, durability: 15, maxDurability: 300 },
    { name: 'Axe (Rare)', icon: 'img/axe_rare.png', profit: 24, wood: 3180, stone: 4650, cooldown: 1, resource: 'wood', energy: 12, durability: 45, maxDurability: 900 },
    { name: 'Axe (Epic)', icon: 'img/axe_epic.png', profit: 53, wood: 6930, stone: 9970, cooldown: 1, resource: 'wood', energy: 24, durability: 100, maxDurability: 2000 },
    { name: 'Axe (Legendary)', icon: 'img/axe_legendary.png', profit: 118, wood: 14680, stone: 20650, cooldown: 1, resource: 'wood', energy: 48, durability: 225, maxDurability: 4500 },
    { name: 'Pickaxe (Common)', icon: 'img/pickaxe_common.png', profit: 5, wood: 650, stone: 500, cooldown: 1, resource: 'stone', energy: 3, durability: 3, maxDurability: 250 },
    { name: 'Pickaxe (Uncommon)', icon: 'img/pickaxe_uncommon.png', profit: 11, wood: 1950, stone: 1470, cooldown: 1, resource: 'stone', energy: 6, durability: 6, maxDurability: 500 },
    { name: 'Pickaxe (Rare)', icon: 'img/pickaxe_rare.png', profit: 24, wood: 4550, stone: 3360, cooldown: 1, resource: 'stone', energy: 12, durability: 12, maxDurability: 1000 },
    { name: 'Pickaxe (Epic)', icon: 'img/pickaxe_epic.png', profit: 53, wood: 9750, stone: 7250, cooldown: 1, resource: 'stone', energy: 24, durability: 24, maxDurability: 2000 },
    { name: 'Pickaxe (Legendary)', icon: 'img/pickaxe_legendary.png', profit: 118, wood: 20150, stone: 15140, cooldown: 1, resource: 'stone', energy: 48, durability: 48, maxDurability: 4000 },
    { name: 'Spear (Common)', icon: 'img/spear_common.png', profit: 4, wood: 580, stone: 580, cooldown: 1, resource: 'food', energy: 3, durability: 5, maxDurability: 250 },
    { name: 'Spear (Uncommon)', icon: 'img/spear_uncommon.png', profit: 8, wood: 1740, stone: 1690, cooldown: 1, resource: 'food', energy: 6, durability: 20, maxDurability: 1000 },
    { name: 'Spear (Rare)', icon: 'img/spear_rare.png', profit: 19, wood: 3960, stone: 3860, cooldown: 1, resource: 'food', energy: 12, durability: 35, maxDurability: 1800 },
    { name: 'Spear (Epic)', icon: 'img/spear_epic.png', profit: 39, wood: 8300, stone: 8150, cooldown: 1, resource: 'food', energy: 24, durability: 80, maxDurability: 4000 },
    { name: 'Spear (Legendary)', icon: 'img/spear_legendary.png', profit: 92, wood: 16920, stone: 16610, cooldown: 1, resource: 'food', energy: 48, durability: 180, maxDurability: 9000 },
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
  const toolTypes = types;

  const pricesStore = usePricesStore();

  function getToolCraftCost(tool: Tool): number {
    return tool.wood * pricesStore.prices.wood + tool.stone * pricesStore.prices.stone;
  }

  function getToolEnergyCost(tool: Tool): number {
    return tool.energy / 5 * pricesStore.prices.food;
  }

  function getToolDurabilityCost(tool: Tool): number {
    return tool.durability / 5 * pricesStore.prices.stone;
  }

  function getToolHourlyProfit(tool: Tool): number {
    const grossProfit = tool.profit * pricesStore.getResourcePrice(tool.resource);
    const energyCost = getToolEnergyCost(tool);
    const durabilityCost = getToolDurabilityCost(tool);
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
    toolTypes,
    getToolCraftCost,
    getToolEnergyCost,
    getToolDurabilityCost,
    getToolHourlyProfit,
    getToolDailyProfit,
    getToolROI,
  };
});
