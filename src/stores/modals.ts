import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalsStore = defineStore('modals', () => {
  const showAddToolModal = ref(false);
  const showSettingsMenu = ref(false);
  const showChartModal = ref(false);
  const showStackPriceModal = ref(false);
  const showAddTentModal = ref(false);
  const selectedAccountId = ref<number | null>(null);

  function openAddToolModal(accountId: number) {
    showAddToolModal.value = true;
    selectedAccountId.value = accountId;
    document.body.classList.add('modal-open');
  }

  function closeAddToolModal() {
    showAddToolModal.value = false;
    document.body.classList.remove('modal-open');
  }

  function openAddTentModal(accountId: number) {
    console.log('openAddTentModal')
    showAddTentModal.value = true;
    selectedAccountId.value = accountId;
    document.body.classList.add('modal-open');
  }

  function closeAddTentModal() {
    showAddTentModal.value = false;
    document.body.classList.remove('modal-open');
  }

  function toggleSettingsMenu() {
    showSettingsMenu.value = !showSettingsMenu.value;
    if (showSettingsMenu.value) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }

  function openChartModal() {
    showChartModal.value = true;
    document.body.classList.add('modal-open');
  }

  function closeChartModal() {
    showChartModal.value = false;
    document.body.classList.remove('modal-open');
  }

  function openStackPriceModal() {
    showStackPriceModal.value = true;
    document.body.classList.add('modal-open');
  }

  function closeStackPriceModal() {
    showStackPriceModal.value = false;
    document.body.classList.remove('modal-open');
  }

  return {
    showAddToolModal,
    showSettingsMenu,
    showChartModal,
    showStackPriceModal,
    selectedAccountId,
    openAddToolModal,
    closeAddToolModal,
    toggleSettingsMenu,
    openChartModal,
    closeChartModal,
    openStackPriceModal,
    closeStackPriceModal,
    showAddTentModal,
    openAddTentModal,
    closeAddTentModal,
  };
});