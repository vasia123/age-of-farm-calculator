import type { Prices } from '@/types/main';
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
  const prevDayAveragePrices = ref<Prices>({
    wood: 0.00,
    food: 0.00,
    stone: 0.00,
    skin: 0.00,
  });
  const lastNonZeroPrices = ref<Prices>({
    wood: 0.00,
    food: 0.00,
    stone: 0.00,
    skin: 0.00,
  });
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

  const skinData = computed(() =>
    chartPrices.value.map(price => ({
      time: new Date(price.date_create).getTime() / 1000 as UTCTimestamp,
      value: parseFloat(price.SKIN)
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

  async function loadPricesForThreeDays() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const pricesPromises = [
      fetchChartPrices(tomorrow),
      fetchChartPrices(today),
      fetchChartPrices(yesterday),
      fetchChartPrices(twoDaysAgo),
    ];

    const pricesDataAll = await Promise.all(pricesPromises);
    const pricesData = pricesDataAll.filter(prices => prices.length > 0).sort(
      (a, b) => new Date(b[0].date_create).getTime() - new Date(a[0].date_create).getTime()
    );

    if (pricesData.length > 0) {
      const resourceTypes: (keyof Prices)[] = ['wood', 'food', 'stone', 'skin'];

      resourceTypes.forEach(resource => {
        const upperResource = resource.toUpperCase() as 'WOOD' | 'FOOD' | 'STONE' | 'SKIN';
        for (const dayPrices of pricesData) {
          for (let i = dayPrices.length - 1; i >= 0; i--) {
            const price = parseFloat(dayPrices[i][upperResource]);
            if (price > 0) {
              lastNonZeroPrices.value[resource] = price;
              break;
            }
          }
          if (lastNonZeroPrices.value[resource] > 0) break;
        }
      });

      const prevDayPrices = pricesData[pricesData.length - 1];
      resourceTypes.forEach(resource => {
        const upperResource = resource.toUpperCase() as 'WOOD' | 'FOOD' | 'STONE' | 'SKIN';
        const prices = prevDayPrices.map(item => parseFloat(item[upperResource])).filter(price => price > 0);
        const averagePrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        prevDayAveragePrices.value[resource] = averagePrice;
      });
    }

    chartPrices.value = pricesData.flat();
  }

  loadPricesForThreeDays();

  return {
    chartPrices,
    chartError,
    currentDate,
    fetchChartPrices,
    prevDayAveragePrices,
    foodData,
    stoneData,
    woodData,
    skinData,
    lastNonZeroPrices,
    fetchMoreData
  };
});