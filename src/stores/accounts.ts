import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Account, CraftedTent, CraftedTool } from '@/types/main';
import { useI18n } from 'vue-i18n';
import { useToolsStore } from '@/stores/tools';
import { useTentsStore } from '@/stores/tents';

interface StoredTool {
  name: string;
  craftPrice: number;
}

interface StoredTent {
  name: string;
  craftPrice: number;
}
interface StoredAccount {
  id: number;
  name: string;
  tools: StoredTool[];
  tents: StoredTent[];
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([]);
  const toolsStore = useToolsStore();
  const tentsStore = useTentsStore();
  const { t: $t } = useI18n();

  function addAccount() {
    const accNum = (accounts.value.length > 0) ? ` ${accounts.value.length + 1}` : ''
    const newAccount: Account = {
      id: Date.now(),
      name: `${$t('myAccount')}${accNum}`,
      tools: [],
      tents: [],
      editing: false
    };
    accounts.value.push(newAccount);
    saveAccounts();
  }

  function removeAccount(accountId: number) {
    accounts.value = accounts.value.filter(acc => acc.id !== accountId);
    saveAccounts();
  }
  function addTentToAccount(accountId: number, tent: CraftedTent) {
    const account = accounts.value.find(acc => acc.id === accountId);
    if (account) {
      account.tents.push(tent);
      saveAccounts();
    }
  }

  function removeTentFromAccount(accountId: number, index: number) {
    const account = accounts.value.find(acc => acc.id === accountId);
    if (account) {
      account.tents.splice(index, 1);
      saveAccounts();
    }
  }

  function saveAccounts() {
    const zipAccounts: StoredAccount[] = accounts.value.map(acc => ({
      id: acc.id,
      name: acc.name,
      tools: acc.tools.map(tool => ({ name: tool.name, craftPrice: tool.craftPrice })),
      tents: acc.tents?.map(tent => ({ name: tent.name, craftPrice: tent.craftPrice })) || []
    }))
    localStorage.setItem('accounts-age-of-farm', JSON.stringify(zipAccounts));
  }

  function loadAccounts() {
    const storedAccounts = localStorage.getItem('accounts-age-of-farm');
    if (storedAccounts) {
      const rawAccounts: StoredAccount[] | undefined = JSON.parse(storedAccounts);
      if (rawAccounts) {
        accounts.value = [];
        rawAccounts.forEach(account => {
          const toolsRaw: Array<CraftedTool | undefined> = account.tools?.map(accountTool => {
            const toolFound = toolsStore.tools.find(tool => tool.name === accountTool.name)
            if (!toolFound) return undefined
            return {
              ...toolFound,
              craftPrice: accountTool.craftPrice,
            };
          });
          const tentsRaw: Array<CraftedTent | undefined> = account.tents?.map(accountTent => {
            const tentFound = tentsStore.tents.find(tent => tent.name === accountTent.name)
            if (!tentFound) return undefined
            return {
              ...tentFound,
              craftPrice: accountTent.craftPrice,
            };
          });
          accounts.value.push({
            id: account.id,
            name: account.name,
            tools: toolsRaw.filter(tool => tool !== undefined) as CraftedTool[],
            tents: tentsRaw?.filter(tent => tent !== undefined) as CraftedTent[] || [],
            editing: false,
          })
        });
      }
    } else {
      addAccount();
      saveAccounts();
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
    addTentToAccount,
    removeTentFromAccount,
  };
});