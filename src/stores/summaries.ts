import { defineStore } from 'pinia';
import { useAccountsStore } from './accounts';
import { useToolsStore } from './tools';
import type { ResourceType } from '@/types/main';

export const useSummariesStore = defineStore('summaries', () => {
  const accountsStore = useAccountsStore();
  const toolsStore = useToolsStore();

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

  function getAccountDailyProfitSummary(accountId: number): number {
    const account = accountsStore.accounts.find(acc => acc.id === accountId);
    if (!account) return 0;
    const toolsDailyProfit = account.tools.reduce((sum, tool) => {
      const grossProfit = toolsStore.getToolDailyProfit(tool);
      const energyCost = toolsStore.getToolEnergyCost(tool) * 24;
      const repairCost = toolsStore.getToolDurabilityCost(tool) * 24;
      const netProfit = grossProfit - energyCost - repairCost;
      return sum + netProfit;
    }, 0);

    return toolsDailyProfit;
  }


  function getAccountDailyConsumptionSummary(accountId: number): { [key in ResourceType]: number } {
    const consumptionSummary: { [key in ResourceType]: number } = {
      food: 0,
      stone: 0,
      wood: 0
    };

    const account = accountsStore.accounts.find(acc => acc.id === accountId);
    if (!account) return consumptionSummary;

    account.tools.forEach(tool => {
      consumptionSummary.food += tool.energy / tool.cooldown * 24 / 5;
      consumptionSummary.stone += tool.repair.stone / tool.cooldown * 24;
      consumptionSummary.wood += tool.repair.wood / tool.cooldown * 24;
    });

    return consumptionSummary;
  }

  function getAllProfitSummary(): number {
    return accountsStore.accounts.reduce(
      (fullSum, account) => {
        const toolsDailyProfit = account.tools.reduce((sum, tool) => {
          const grossProfit = toolsStore.getToolDailyProfit(tool);
          const energyCost = toolsStore.getToolEnergyCost(tool) * 24;
          const repairCost = toolsStore.getToolDurabilityCost(tool) * 24;
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

    const totalProfit = getAccountDailyProfitSummary(accountId);
    if (totalProfit === 0) return 0;
    const toolsCraftPrice = account.tools.reduce((acc, tool) => acc + tool.craftPrice, 0)
    return (toolsCraftPrice) / totalProfit;
  }

  return {
    getAccountResourcesSummary,
    getAccountDailyProfitSummary,
    getAccountDailyConsumptionSummary,
    getAllProfitSummary,
    getFullAccountROI,
    getAccountROI,
  };
});