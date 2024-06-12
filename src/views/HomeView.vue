<template>
  <div class="page-outer">
    <Navbar />
    <ProjectsLinks />

    <h1 class="title">
      {{ $t('title') }}
      <a href="https://t.me/aof_ton_bot?start=ref_ac5a6f1c" target="_blank">
        Age of Farm
      </a>
    </h1>

    <div v-if="serverError" class="server-error red mb-3">{{ $t('serverError') }}</div>

    <SeasonsToggle />
    <AccountList />

    <StackPriceCalculator />

    <ToolTypeSummary />
  </div>

  <Footer />
  <AddToolModal />
  <SettingsMenu />
  <!-- <PriceChartModal /> -->
  <!-- <NewsModal /> -->
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAccountsStore } from '@/stores/accounts';
import { usePricesStore } from '@/stores/prices';
import { useSettingsStore } from '@/stores/settings';
import Navbar from '@/components/NavBar.vue';
import AccountList from '@/components/AccountList.vue';
import ToolTypeSummary from '@/components/ToolTypeSummary.vue';
import Footer from '@/components/PageFooter.vue';
import AddToolModal from '@/components/AddToolModal.vue';
import ProjectsLinks from '@/components/ProjectsLinks.vue';
import SeasonsToggle from '@/components/SeasonsToggle.vue';
// import NewsModal from '@/components/NewsModal.vue';
import SettingsMenu from '@/components/SettingsMenu.vue';
// import PriceChartModal from '@/components/PriceChartModal.vue';
import StackPriceCalculator from '@/components/StackPriceCalculator.vue';

const { t: $t } = useI18n();
const accountsStore = useAccountsStore();
const pricesStore = usePricesStore();
const settingsStore = useSettingsStore();

const serverError = computed(() => settingsStore.serverError);

let reloadTimeout: number;

function startReloadTimer() {
  reloadTimeout = window.setTimeout(() => {
    window.location.reload();
  }, 30 * 60 * 1000);
}

onMounted(() => {
  const savedLanguage = localStorage.getItem('selectedLanguage');
  if (savedLanguage) {
    const { locale } = useI18n();
    locale.value = savedLanguage;
  }
  accountsStore.loadAccounts();
  startReloadTimer();
  pricesStore.startPricesTimers();
  window.addEventListener('beforeunload', () => {
    window.clearTimeout(reloadTimeout);
  });
  pricesStore.loadPricesForThreeDays();
});

onUnmounted(() => {
  window.clearTimeout(reloadTimeout);
  pricesStore.stopPricesTimers();
});
</script>