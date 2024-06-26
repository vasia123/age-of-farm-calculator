import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useSettingsStore } from '@/stores/settings';
import type { Prices, ResourceType } from '@/types/main';
import { useChartStore } from './chart';

export const usePricesStore = defineStore('prices', () => {
  const prices = ref<Prices>({
    wood: 0.00,
    food: 0.00,
    stone: 0.00,
    skin: 0.00,
  });
  const tonPriceUsd = ref<number | string>('...');
  let priceTimeout: number;
  let priceTonTimeout: number;

  const settingsStore = useSettingsStore();
  const chartStore = useChartStore();

  async function fetchPrices() {
    try {
      const response = await fetch('https://app.age-of-farm.site/api/floor?token=123');
      const data = await response.json();
      prices.value = {
        wood: data.WOOD && data.WOOD > 0 ? data.WOOD : chartStore.lastNonZeroPrices.wood,
        food: data.FOOD && data.FOOD > 0 ? data.FOOD : chartStore.lastNonZeroPrices.food,
        stone: data.STONE && data.STONE > 0 ? data.STONE : chartStore.lastNonZeroPrices.stone,
        skin: data.SKIN && data.SKIN > 0 ? data.SKIN : chartStore.lastNonZeroPrices.skin,
      };
      priceTimeout = window.setTimeout(fetchPrices, 30 * 1000);
      saveResourcesPrices();
    } catch (error) {
      console.error(error);
    }
  }


  function getResourcePrice(resource: ResourceType): number {
    const currentPrice = prices.value[resource];
    if (currentPrice && currentPrice > 0) {
      return Number(currentPrice);
    }
    const lastNonZeroPrice = chartStore.lastNonZeroPrices[resource];
    return lastNonZeroPrice > 0 ? Number(lastNonZeroPrice) : 0;
  }

  function setManualPrices() {
    settingsStore.setState('local');
    window.clearTimeout(priceTimeout);
  }

  function saveTonPrice(price: number | string) {
    localStorage.setItem('tonPrice', price.toString());
  }

  function saveResourcesPrices() {
    localStorage.setItem('resourcesPrices', JSON.stringify(prices.value));
  }

  function loadResourcesPrices(): Prices | null {
    const storedPrices = localStorage.getItem('resourcesPrices');
    if (storedPrices) {
      try {
        return JSON.parse(storedPrices);
      } catch (error) {
        // 
      }
    }
    return null;
  }

  function loadTonPrice(): number | string | null {
    const storedPrice = localStorage.getItem('tonPrice');
    return storedPrice ? storedPrice : null;
  }

  async function fetchTonPrice() {
    try {
      const response = await fetch('https://tonapi.io/v2/rates?tokens=ton&currencies=usd');
      const data = await response.json();
      const price = data?.rates?.TON?.prices?.USD;
      if (price) {
        tonPriceUsd.value = price;
        saveTonPrice(price);
      }
    } catch (error) {
      console.error('Ошибка получения цены TON Coin:', error);
    }
    priceTonTimeout = setInterval(fetchTonPrice, 5 * 60 * 1000);
  }

  async function startPricesTimers() {
    const storedPrices = loadResourcesPrices();
    if (storedPrices) {
      if (storedPrices.wood) prices.value.wood = storedPrices.wood;
      if (storedPrices.food) prices.value.food = storedPrices.food;
      if (storedPrices.stone) prices.value.stone = storedPrices.stone;
      if (storedPrices.skin) prices.value.skin = storedPrices.skin;
    }
    fetchPrices();

    const storedTonPrice = loadTonPrice();
    if (storedTonPrice && !['err', '"err"'].includes(storedTonPrice.toString())) {
      tonPriceUsd.value = storedTonPrice;
      priceTonTimeout = setInterval(fetchTonPrice, 5 * 60 * 1000);
    } else {
      fetchTonPrice();
    }
  }

  async function stopPricesTimers() {
    window.clearTimeout(priceTimeout);
    window.clearInterval(priceTonTimeout);
  }
  function getPriceChangePercentage(resource: ResourceType): string {
    const currentPrice = prices.value[resource];
    const prevDayAveragePrice = chartStore.prevDayAveragePrices[resource];

    // Проверяем, что обе цены существуют и не равны нулю
    if (!currentPrice || !prevDayAveragePrice || prevDayAveragePrice === 0) {
      return '';
    }

    const changePercentage = ((currentPrice - prevDayAveragePrice) / prevDayAveragePrice) * 100;

    // Проверяем, что результат является числом
    if (isNaN(changePercentage)) {
      return '';
    }

    return changePercentage >= 0 ? `+${changePercentage.toFixed(1)}%` : `${changePercentage.toFixed(1)}%`;
  }

  return {
    prices,
    tonPriceUsd,
    fetchPrices,
    fetchTonPrice,
    getResourcePrice,
    startPricesTimers,
    setManualPrices,
    stopPricesTimers,
    getPriceChangePercentage,
  };
});