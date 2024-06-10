import { defineStore } from 'pinia';
import { useAccountsStore } from './accounts';
import { useToolsStore } from './tools';
import { useBuffsStore } from './buffs';
import { usePricesStore } from './prices';
import type { Buff, ResourceType } from '@/types/main';

export const useSummariesStore = defineStore('summaries', () => {
  const accountsStore = useAccountsStore();
  const toolsStore = useToolsStore();
  const buffsStore = useBuffsStore();
  const pricesStore = usePricesStore();

  function getAccountResourcesSummary(accountId: number): Record<string, number> {
    const account = accountsStore.accounts.find(acc => acc.id === accountId);
    if (!account) return {};

    const resourceSummary: Record<string, number> = {};
    account.tools.forEach(tool => {
      const resource = tool.resource;
      const amount = tool.profit * 24;
      if (amount > 0) {
        if (resource in resourceSummary) {
          resourceSummary[resource] += amount;
        } else {
          resourceSummary[resource] = amount;
        }
      }
    });
    return resourceSummary;
  }

  function getAccountProfitSummary(accountId: number): number {
    const account = accountsStore.accounts.find(acc => acc.id === accountId);
    if (!account) return 0;
    const toolsDailyProfit = account.tools.reduce((sum, tool) => {
      const grossProfit = toolsStore.getToolDailyProfit(tool);
      const energyCost = tool.energy / tool.cooldown * 24 * pricesStore.getResourcePrice('food') / 5;
      const repairCost = tool.durability / tool.cooldown * 24 * (pricesStore.getResourcePrice('wood') + pricesStore.getResourcePrice('stone')) / 5;
      const netProfit = grossProfit - energyCost - repairCost;
      return sum + netProfit;
    }, 0);

    return toolsDailyProfit;
  }


  function getAccountConsumptionSummary(accountId: number): { [key in ResourceType]: number } {
    const consumptionSummary: { [key in ResourceType]: number } = {
      food: 0,
      stone: 0,
      wood: 0
    };

    const account = accountsStore.accounts.find(acc => acc.id === accountId);
    if (!account) return consumptionSummary;

    account.tools.forEach(tool => {
      consumptionSummary.food += tool.energy / tool.cooldown * 24 / 5;
      consumptionSummary.stone += tool.durability / tool.cooldown * 24 / 5;
    });

    return consumptionSummary;
  }

  function getAllProfitSummary(): number {
    return accountsStore.accounts.reduce(
      (fullSum, account) => {
        const toolsDailyProfit = account.tools.reduce((sum, tool) => {
          const grossProfit = toolsStore.getToolDailyProfit(tool);
          const energyCost = tool.energy / tool.cooldown * 24 * pricesStore.getResourcePrice('food') / 5;
          const repairCost = tool.durability / tool.cooldown * 24 * (pricesStore.getResourcePrice('wood') + pricesStore.getResourcePrice('stone')) / 5;
          const netProfit = grossProfit - energyCost - repairCost;
          return sum + netProfit;
        }, 0);
        return fullSum + toolsDailyProfit;
      },
      0
    );
  }

  function getFullAccountROI(): number {
    const totalProfit = getAllProfitSummary();
    if (totalProfit === 0) return 0;
    const totalInvestment = accountsStore.accounts.reduce(
      (fullSum, account) => {
        const toolsCraftPrice = account.tools.reduce((acc, tool) => acc + tool.craftPrice, 0)
        return fullSum + toolsCraftPrice;
      }, 0);
    return totalInvestment / totalProfit;
  }

  function getAccountROI(accountId: number): number {
    const account = accountsStore.accounts.find(acc => acc.id === accountId);
    if (!account) return 0;

    const totalProfit = getAccountProfitSummary(accountId);
    if (totalProfit === 0) return 0;
    const toolsCraftPrice = account.tools.reduce((acc, tool) => acc + tool.craftPrice, 0)
    return (toolsCraftPrice) / totalProfit;
  }

  function getAccountBuffROI(accountId: number, buff: Buff): number {
    const account = accountsStore.accounts.find(acc => acc.id === accountId);
    if (!account) return 0;
    const buffData = buffsStore.buffs.find(b => b.name === buff.name);
    if (!buffData) throw new Error("no buff data!");

    const buffCost = Object.entries(buffData.cost).reduce((total, [resource, amount]) => {
      const tonTotal = resource === 'ton'
        ? amount
        : amount * pricesStore.getResourcePrice(resource as ResourceType)
      return total + tonTotal;
    }, 0);

    const originalProfit = getAccountProfitSummary(accountId);
    const updatedTools = account.tools.map(tool => buffsStore.applyBuffToTool(tool, buff));
    const updatedProfit = updatedTools.reduce((total, tool) => total + toolsStore.getToolDailyProfit(tool), 0);

    const profitIncrease = updatedProfit - originalProfit;
    const roiDays = buffCost / profitIncrease;

    return roiDays;
  }

  return {
    getAccountResourcesSummary,
    getAccountProfitSummary,
    getAccountConsumptionSummary,
    getAllProfitSummary,
    getFullAccountROI,
    getAccountROI,
    getAccountBuffROI,
  };
});