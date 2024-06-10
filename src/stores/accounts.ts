import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Account } from '@/types/main';
import { useI18n } from 'vue-i18n';

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([]);
  const { t: $t } = useI18n();

  function addAccount() {
    const accNum = (accounts.value.length > 0) ? ` ${accounts.value.length + 1}` : ''
    const newAccount: Account = {
      id: Date.now(),
      name: `${$t('myAccount')}${accNum}`,
      tools: [],
      editing: false
    };
    accounts.value.push(newAccount);
    saveAccounts();
  }

  function removeAccount(accountId: number) {
    accounts.value = accounts.value.filter(acc => acc.id !== accountId);
    saveAccounts();
  }

  function saveAccounts() {
    localStorage.setItem('accounts', JSON.stringify(accounts.value));
  }

  function loadAccounts() {
    const storedAccounts = localStorage.getItem('accounts');
    if (storedAccounts) {
      accounts.value = JSON.parse(storedAccounts);
      accounts.value?.forEach(account => {
        account.tools.forEach(tool => {
          tool.icon = tool.icon.replace('_shadow', '');
        });
      });
    }
  }

  function saveAccountName(account: Account) {
    account.editing = false;
    saveAccounts();
  }

  function removeUserTool(accountId: number, index: number) {
    const account = accounts.value.find(acc => acc.id === accountId);
    if (account) {
      account.tools.splice(index, 1);
      saveAccounts();
    }
  }

  return {
    accounts,
    addAccount,
    removeAccount,
    saveAccounts,
    loadAccounts,
    saveAccountName,
    removeUserTool,
  };
});