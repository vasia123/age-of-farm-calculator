<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top scrolling-navbar">
    <div class="navbar-prices">
      <div class="alert alert-light p-1 fw_topBox token_TON">
        <img class="mr-1" src="/img/ton.png" alt="TON Coin">
        <strong>{{ formatNumber(tonPriceUsd) }}$</strong>
      </div>
      <div class="alert alert-light p-1 fw_topBox token_FWW">
        <img class="mr-1" src="/img/wood.png" alt="Wood">
        <strong>{{ formatNumber(prices.wood) }}</strong>
      </div>
      <div class="alert alert-light p-1 fw_topBox token_FWF">
        <img class="mr-1" src="/img/food.png" alt="Food">
        <strong>{{ formatNumber(prices.food) }}</strong>
      </div>
      <div class="alert alert-light p-1 fw_topBox token_FWG">
        <img class="mr-1" src="/img/stone.png" alt="Stone">
        <strong>{{ formatNumber(prices.stone) }}</strong>
      </div>
      <button @click="openChartModal" class="btn btn-primary">{{ $t('showCharts') }}</button>
    </div>
    <ul class="nav navbar-nav nav-flex-icons ml-auto">
      <li class="nav-item">
        <button class="nav-link btn btn-link" :class="{ 'active': locale === 'en' }" @click="changeLanguage('en')">
          <FlagEng />
        </button>
      </li>
      <li class="nav-item">
        <button class="nav-link btn btn-link" :class="{ 'active': locale === 'ru' }" @click="changeLanguage('ru')">
          <FlagRu />
        </button>
      </li>
      <li class="nav-item">
        <button class="nav-link btn btn-link" @click="toggleSettingsMenu">
          <SettingsIcon />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePricesStore } from '@/stores/prices';
import { useModalsStore } from '@/stores/modals';
import FlagEng from '@/components/icons/flag-eng.vue';
import FlagRu from '@/components/icons/flag-ru.vue';
import SettingsIcon from '@/components/icons/settings-icon.vue';
import { formatNumber } from '@/shared/utils';

const { locale, t: $t } = useI18n();
const pricesStore = usePricesStore();
const modalsStore = useModalsStore();

const tonPriceUsd = computed(() => pricesStore.tonPriceUsd);
const prices = computed(() => pricesStore.prices);

function changeLanguage(lang: string) {
  locale.value = lang;
  localStorage.setItem('selectedLanguage', lang);
}

function openChartModal() {
  modalsStore.openChartModal();
}

function toggleSettingsMenu() {
  modalsStore.toggleSettingsMenu();
}

function handleScroll() {
  const navbar = document.querySelector('.navbar');
  const scrollingNavbar = document.querySelector('.scrolling-navbar');

  if (navbar && scrollingNavbar) {
    if (window.scrollY > 50) {
      scrollingNavbar.classList.add('top-nav-collapse');
    } else {
      scrollingNavbar.classList.remove('top-nav-collapse');
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>