import type { NftPrices } from '@/types/main';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNftPricesStore = defineStore('nftPrices', () => {
  const itemPrices = ref<NftPrices | null>(null);
  const itemPricesError = ref(false);

  async function fetchItemPrices(date: Date): Promise<NftPrices | null> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const url = `https://vasia123.github.io/age-of-farm-prices/${year}-${month}/${day}-item-prices.json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch item prices');
      }
      const data = await response.json();
      return data[data.length - 1]; // Return the last available prices
    } catch (error) {
      console.error('Error fetching item prices:', error);
      return null;
    }
  }

  async function loadItemPricesForThreeDays() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const pricesPromises = [
      fetchItemPrices(tomorrow),
      fetchItemPrices(today),
      fetchItemPrices(yesterday),
    ];

    const pricesData = await Promise.all(pricesPromises);
    const lastAvailablePrices = pricesData.find(prices => prices !== null);

    if (lastAvailablePrices) {
      itemPrices.value = lastAvailablePrices;
    }
  }

  function getNftNameForTool(toolName: string): string {
    const [name, rarity] = toolName.split(' (');
    return `${rarity.slice(0, -1)} ${name}`;
  }
  function getNftPriceForTool(toolName: string) {
    const cleanedToolName = getNftNameForTool(toolName) as keyof typeof itemPrices.value
    if (itemPrices.value && cleanedToolName in itemPrices.value && itemPrices.value[cleanedToolName] !== "null") {
      return parseInt(itemPrices.value[cleanedToolName]) / 10 ** 9;
    }
    return 0;
  }


  function startPollingItemPrices() {
    loadItemPricesForThreeDays();
    setInterval(loadItemPricesForThreeDays, 15 * 60 * 1000); // каждые 15 минут
  }

  startPollingItemPrices();

  return {
    itemPrices,
    itemPricesError,
    loadItemPricesForThreeDays,
    startPollingItemPrices,
    getNftPriceForTool,
    getNftNameForTool,
  };
});