import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const showMenu = ref(false);
  const state = ref<'server' | 'local'>('server');
  const serverError = ref(false);

  function setState(stateName: 'local' | 'server') {
    state.value = stateName;
  }

  return {
    showMenu,
    state,
    serverError,
    setState,
  };
});