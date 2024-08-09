import { defineStore } from 'pinia';
import { useAccountsStore } from './accounts';
import { useToolsStore } from './tools';
import type { ResourceType, Tool } from '@/types/main';

export const useSummariesStore = defineStore('summaries', () => {
  const accountsStore = useAccountsStore();
  const toolsStore = useToolsStore();

  function getAccountRawResourcesSummary(accountId: number, exclude_tools: string[] = []): Record<ResourceType, number> {
    const account = accountsStore.accounts.find(acc => acc.id === accountId);
    if (!account) return {} as Record<ResourceType, number>;

    return account.tools.reduce((summary, tool) => {
      if (!exclude_tools.includes(tool.name)) {
        const resource = tool.resource;
        const haveDog = tool.enhancements?.find(enh => enh.type === 'dog')
        const dogBoost = haveDog ? haveDog.boost : 0;
        const chance = tool.chance ? (tool.chance / 100) * (1 + dogBoost / 100) : 1;
        const amount = tool.profit * 24 * chance;
        if (amount > 0) {
          summary[resource] = (summary[resource] || 0) + amount;
        }
      }
      return summary;
    }, {} as Record<ResourceType, number>);
  }

  function getAccountRawDailyConsumptionSummary(accountId: number): Record<ResourceType, number> {
    const account = accountsStore.accounts.find(acc => acc.id === accountId);
    if (!account) return {} as Record<ResourceType, number>;

    return account.tools.reduce((summary, tool) => {
      summary.food += (tool.energy * toolsStore.energyMultiplyer / 4 / tool.cooldown * 24);
      summary.stone += (tool.repair.stone / tool.cooldown * 24);
      summary.wood += (tool.repair.wood / tool.cooldown * 24);
      return summary;
    }, { food: 0, stone: 0, wood: 0, skin: 0 } as Record<ResourceType, number>);
  }

  function calculateNetResourceSummary(profit: Record<ResourceType, number>, consumption: Record<ResourceType, number>): Record<ResourceType, number> {
    const resources: ResourceType[] = ['wood', 'food', 'stone', 'skin'];
    return resources.reduce((net, resource) => {
      net[resource] = Math.max(0, (profit[resource] || 0) - (consumption[resource] || 0));
      return net;
    }, {} as Record<ResourceType, number>);
  }

  function getAccountResourcesSummary(accountId: number): Record<ResourceType, number> {
    const profitSummary = getAccountRawResourcesSummary(accountId);
    const consumptionSummary = getAccountRawDailyConsumptionSummary(accountId);
    return calculateNetResourceSummary(profitSummary, consumptionSummary);
  }

  function getAccountDailyConsumptionSummary(accountId: number): Record<ResourceType, number> {
    const profitSummary = getAccountRawResourcesSummary(accountId);
    const consumptionSummary = getAccountRawDailyConsumptionSummary(accountId);
    return calculateNetResourceSummary(consumptionSummary, profitSummary);
  }

  function getAccountDailyProfitSummary(accountId: number): number {
    const account = accountsStore.accounts.find(acc => acc.id === accountId);
    if (!account) return 0;
    return account.tools.reduce((sum, tool) => sum + toolsStore.getToolDailyProfit(tool), 0);
  }

  function getAllProfitSummary(): number {
    return accountsStore.accounts.reduce(
      (fullSum, account) => fullSum + getAccountDailyProfitSummary(account.id),
      0
    );
  }

  function calculateROI(investment: number, dailyProfit: number): number {
    return dailyProfit > 0 ? investment / dailyProfit : 0;
  }

  function getFullAccountROI(): number {
    const totalProfit = getAllProfitSummary();
    const totalInvestment = accountsStore.accounts.reduce(
      (fullSum, account) => fullSum + account.tools.reduce((acc, tool) => acc + tool.craftPrice, 0),
      0
    );
    return calculateROI(totalInvestment, totalProfit);
  }

  function getAccountROI(accountId: number): number {
    const account = accountsStore.accounts.find(acc => acc.id === accountId);
    if (!account) return 0;

    const totalProfit = getAccountDailyProfitSummary(accountId);
    const toolsCraftPrice = account.tools.reduce((acc, tool) => {
      acc += tool.craftPrice;
      acc += tool.enhancements?.reduce((accEnh, enh) => accEnh + enh.craftPrice, 0) || 0;
      return acc
    }, 0);
    return calculateROI(toolsCraftPrice, totalProfit);
  }

  function getToolROI(tool: Tool, craftPrice: number): { hours: number; days: number } {
    const dailyProfit = toolsStore.getToolDailyProfit(tool);
    const roiDays = calculateROI(craftPrice, dailyProfit);
    return {
      days: roiDays,
      hours: roiDays * 24
    };
  }

  return {
    getAccountResourcesSummary,
    getAccountDailyProfitSummary,
    getAccountDailyConsumptionSummary,
    getAccountRawResourcesSummary,
    calculateNetResourceSummary,
    getAllProfitSummary,
    getFullAccountROI,
    getAccountROI,
    getToolROI,
  };
});