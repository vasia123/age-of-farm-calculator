import { defineStore } from 'pinia';
import { useAccountsStore } from './accounts';
import { useToolsStore } from './tools';
import type { ResourceType } from '@/types/main';

export const useSummariesStore = defineStore('summaries', () => {
  const accountsStore = useAccountsStore();
  const toolsStore = useToolsStore();

  function getAccountRawResourcesSummary(accountId: number): Record<string, number> {
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
  function getAccountResourcesSummary(accountId: number): Record<string, number> {
    const consumptionSummary = getAccountRawDailConsumptionSummary(accountId)
    const profitSummary = getAccountRawResourcesSummary(accountId)
    if (profitSummary.wood) {
      profitSummary.wood -= consumptionSummary.wood;
      if (profitSummary.wood < 0) profitSummary.wood = 0;
    }
    if (profitSummary.food) {
      profitSummary.food -= consumptionSummary.food;
      if (profitSummary.food < 0) profitSummary.food = 0;
    }
    if (profitSummary.stone) {
      profitSummary.stone -= consumptionSummary.stone;
      if (profitSummary.stone < 0) profitSummary.stone = 0;
    }
    if (profitSummary.skin) {
      profitSummary.skin -= consumptionSummary.skin;
      if (profitSummary.skin < 0) profitSummary.skin = 0;
    }

    return profitSummary;
  }

  function getAccountDailyProfitSummary(accountId: number): number {
    const account = accountsStore.accounts.find(acc => acc.id === accountId);
    if (!account) return 0;
    const toolsDailyProfit = account.tools.reduce((sum, tool) => {
      const netProfit = toolsStore.getToolDailyProfit(tool);
      return sum + netProfit;
    }, 0);

    return toolsDailyProfit;
  }


  function getAccountRawDailConsumptionSummary(accountId: number): { [key in ResourceType]: number } {
    const consumptionSummary: { [key in ResourceType]: number } = {
      food: 0,
      stone: 0,
      wood: 0,
      skin: 0,
    };

    const account = accountsStore.accounts.find(acc => acc.id === accountId);
    if (!account) return consumptionSummary;

    account.tools.forEach(tool => {
      consumptionSummary.food += tool.energy * toolsStore.energyMultiplyer / tool.cooldown / 5 * 24;
      consumptionSummary.stone += tool.repair.stone / tool.cooldown * 24;
      consumptionSummary.wood += tool.repair.wood / tool.cooldown * 24;
    });
    return consumptionSummary;
  }

  function getAccountDailyConsumptionSummary(accountId: number): { [key in ResourceType]: number } {
    const consumptionSummary = getAccountRawDailConsumptionSummary(accountId)
    const profitSummary = getAccountRawResourcesSummary(accountId)
    if (profitSummary.wood) {
      consumptionSummary.wood -= profitSummary.wood;
      if (consumptionSummary.wood < 0) consumptionSummary.wood = 0;
    }
    if (profitSummary.food) {
      consumptionSummary.food -= profitSummary.food;
      if (consumptionSummary.food < 0) consumptionSummary.food = 0;
    }
    if (profitSummary.stone) {
      consumptionSummary.stone -= profitSummary.stone;
      if (consumptionSummary.stone < 0) consumptionSummary.stone = 0;
    }
    if (profitSummary.skin) {
      consumptionSummary.skin -= profitSummary.skin;
      if (consumptionSummary.skin < 0) consumptionSummary.skin = 0;
    }

    return consumptionSummary;
  }

  function getAllProfitSummary(): number {
    return accountsStore.accounts.reduce(
      (fullSum, account) => {
        const toolsDailyProfit = account.tools.reduce((sum, tool) => {
          const netProfit = toolsStore.getToolDailyProfit(tool);
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