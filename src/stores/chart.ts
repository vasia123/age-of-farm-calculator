import type { UTCTimestamp } from 'lightweight-charts';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useChartStore = defineStore('chart', () => {
  const chartPrices = ref<{
    FOOD: string;
    STONE: string;
    WOOD: string;
    SKIN: string;
    date_create: string;
  }[]>([]);
  const chartError = ref(false);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const currentDate = ref(tomorrow);

  async function fetchChartPrices(date: Date): Promise<typeof chartPrices.value> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const cacheKey = `age-of-farmers-${year}-${month}-${day}`;

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const now = Date.now();
      const cacheAge = (now - timestamp) / 1000; // Cache age in seconds
      if (date > twoDaysAgo) {
        if (cacheAge < 300) {
          return data;
        }
      } else {
        if (cacheAge < 31536000) {
          return data;
        }
      }
    }

    const url = `https://vasia123.github.io/age-of-farm-prices/${year}-${month}/${day}.json`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch chart prices');
      }
      const data = await response.json();
      localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
      return data;
    } catch (error) {
      console.error('Error fetching chart prices:', error);
      return [];
    }
  }

  const foodData = computed(() =>
    chartPrices.value.map(price => ({
      time: new Date(price.date_create).getTime() / 1000 as UTCTimestamp,
      value: parseFloat(price.FOOD)
    }))
  );

  const woodData = computed(() =>
    chartPrices.value.map(price => ({
      time: new Date(price.date_create).getTime() / 1000 as UTCTimestamp,
      value: parseFloat(price.WOOD)
    }))
  );

  const stoneData = computed(() =>
    chartPrices.value.map(price => ({
      time: new Date(price.date_create).getTime() / 1000 as UTCTimestamp,
      value: parseFloat(price.STONE)
    }))
  );

  async function fetchMoreData(): Promise<boolean> {
    const prevDate = new Date(currentDate.value);
    prevDate.setDate(prevDate.getDate() - 1);

    if (prevDate >= new Date(2024, 5, 11)) {
      currentDate.value = prevDate;
      const result = await fetchChartPrices(currentDate.value);
      chartPrices.value = [...result, ...chartPrices.value];
      return result.length > 0;
    }
    return false;
  }

  return {
    chartPrices,
    chartError,
    currentDate,
    fetchChartPrices,
    foodData,
    stoneData,
    woodData,
    fetchMoreData
  };
});