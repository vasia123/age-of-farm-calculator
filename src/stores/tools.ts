import { defineStore } from 'pinia';
import type { Tool, ResourceType, CraftedTool } from '@/types/main';
import { usePricesStore } from './prices';
import { useSeasonStore } from '@/stores/season';
import { computed, ref } from 'vue';
import { useNftPricesStore } from '@/stores/nft_prices';
import { useEnhancementsStore } from '@/stores/enhancements';


export const useToolsStore = defineStore('tools', () => {
  const seasonStore = useSeasonStore();
  const nftPricesStore = useNftPricesStore();

  const enhancementsStore = useEnhancementsStore();


  const energyMultiplyer = computed(
    () => seasonStore.season === 'winter' ? 3 : 1
  )

  const tools = ref<Tool[]>([
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
        'Axe (Common)': 1,
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
        'Axe (Uncommon)': 1,
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
        'Axe (Rare)': 1,
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
        'Axe (Epic)': 1,
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
        'Pickaxe (Common)': 1,
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
        'Pickaxe (Uncommon)': 1,
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
        'Pickaxe (Rare)': 1,
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
        'Pickaxe (Epic)': 1,
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
        'Spear (Common)': 1,
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
        'Spear (Uncommon)': 1,
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
        'Spear (Rare)': 1,
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
        'Spear (Epic)': 1,
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
    {
      name: 'Bow (Common)',
      icon: 'img/bow_common.png',
      profit: 1,
      chance: 0.8,
      craft: {
        wood: 650,
        stone: 460,
      },
      cooldown: 1,
      resource: 'skin',
      energy: 5,
      repair: {
        wood: 1,
        stone: 1,
      },
    },
    {
      name: 'Bow (Uncommon)',
      icon: 'img/bow_uncommon.png',
      profit: 1,
      chance: 1.6,
      craft: {
        'Bow (Common)': 1,
        wood: 630,
        stone: 440,
      },
      cooldown: 1,
      resource: 'skin',
      energy: 10,
      repair: {
        wood: 2,
        stone: 2,
      },
    },
    {
      name: 'Bow (Rare)',
      icon: 'img/bow_rare.png',
      profit: 1,
      chance: 2.7,
      craft: {
        'Bow (Uncommon)': 1,
        wood: 1300,
        stone: 900,
      },
      cooldown: 1,
      resource: 'skin',
      energy: 20,
      repair: {
        wood: 4,
        stone: 4,
      },
    },
    {
      name: 'Bow (Epic)',
      icon: 'img/bow_epic.png',
      profit: 1,
      chance: 4.5,
      craft: {
        'Bow (Rare)': 1,
        wood: 2650,
        stone: 1850,
      },
      cooldown: 1,
      resource: 'skin',
      energy: 40,
      repair: {
        wood: 8,
        stone: 8,
      },
    },
    {
      name: 'Bow (Legendary)',
      icon: 'img/bow_legendary.png',
      profit: 1,
      chance: 7.2,
      craft: {
        'Bow (Epic)': 1,
        wood: 5200,
        stone: 3600,
      },
      cooldown: 1,
      resource: 'skin',
      energy: 80,
      repair: {
        wood: 16,
        stone: 16,
      },
    },
  ]);
  const toolsByType: Record<ResourceType, Tool[]> = {
    wood: [],
    food: [],
    stone: [],
    skin: [],
  };
  for (const tool of tools.value) {
    if (!toolsByType[tool.resource]) {
      toolsByType[tool.resource] = [];
    }
    toolsByType[tool.resource].push(tool);
  }

  const pricesStore = usePricesStore();

  function getToolCraftCost(tool: Tool): number {
    return getToolCraftResources(tool).reduce((sum, resourcePrice) => {
      return sum + resourcePrice.cost
    }, 0)
  }

  function getToolCraftResources(tool: Tool) {
    return Object.keys(tool.craft).map(resourceOrTool => {
      if (Object.keys(pricesStore.prices).includes(resourceOrTool)) {
        const resource = resourceOrTool as ResourceType
        return {
          icon: `img/${resource}.png`,
          count: String(tool.craft[resource]),
          cost: tool.craft[resource] * pricesStore.getResourcePrice(resource)
        }
      }
      const foundTool = tools.value.find(t => t.name === resourceOrTool)
      if (!foundTool) {
        return {
          icon: ``,
          count: '',
          cost: 0
        }
      }
      const nftPrice = nftPricesStore.getNftPriceForTool(foundTool.name)
      const toolCraftPrice = getToolCraftCost(foundTool)
      const nftPriceLower = nftPrice > 0 && nftPrice < toolCraftPrice
      const cost = nftPriceLower
        ? nftPrice
        : toolCraftPrice
      const count = nftPriceLower
        ? 'nft'
        : 'craft'
      return {
        icon: foundTool.icon,
        count,
        cost
      }
    })
  }

  function getToolOneUseDurabilityCost(tool: Tool): number {
    return tool.repair.wood * pricesStore.prices.wood + tool.repair.stone * pricesStore.prices.stone;
  }

  function getToolHourlyProfit(tool: Tool | CraftedTool): number {
    let dogBoost = 0
    if ('enhancements' in tool) {
      const haveDog = tool.enhancements?.find(enh => enh.type === 'dog')
      dogBoost = haveDog ? haveDog.boost : 0;
    }
    const chance = tool.chance ? (tool.chance / 100) * (1 + dogBoost / 100) : 1;
    const grossProfit = tool.profit * pricesStore.getResourcePrice(tool.resource) * chance;
    const energyCost = getToolOneUseEnergyCost(tool);
    const durabilityCost = getToolOneUseDurabilityCost(tool);
    const netProfit = (grossProfit - energyCost - durabilityCost) / tool.cooldown;
    return netProfit;
  }

  function getToolOneUseEnergyCost(tool: Tool | CraftedTool): number {
    if ('enhancements' in tool) {
      const clothingEnhancement = tool.enhancements?.find(e => e.type === 'clothing');
      if (clothingEnhancement) return (tool.energy / 4) * pricesStore.prices.food;
    }
    return (tool.energy * energyMultiplyer.value / 4) * pricesStore.prices.food;
  }

  function getToolDailyProfit(tool: Tool | CraftedTool) {
    return getToolHourlyProfit(tool) * 24;
  }

  function getToolROI(tool: Tool | CraftedTool, craftPrice: number): { hours: number; days: number } {
    const enhancementsCost = ('enhancements' in tool)
      ? tool.enhancements?.reduce((acc, enh) => {
        return acc + enhancementsStore.getEnhancementCraftCost(enh)
      }, 0) || 0
      : 0
    const hourlyProfit = getToolHourlyProfit(tool);
    const roiHours = (craftPrice + enhancementsCost) / hourlyProfit;
    const roiDays = roiHours / 24;
    return { hours: roiHours, days: roiDays };
  }

  return {
    tools,
    toolsByType,
    energyMultiplyer,
    getToolCraftCost,
    getToolCraftResources,
    getToolOneUseEnergyCost,
    getToolOneUseDurabilityCost,
    getToolHourlyProfit,
    getToolDailyProfit,
    getToolROI,
  };
});
