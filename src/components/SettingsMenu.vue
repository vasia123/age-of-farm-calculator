<template>
  <template v-if="showSettingsMenu">
    <div class="settings-menu-close-area" @click="toggleSettingsMenu"></div>
    <div class="settings-menu">
      <div class="settings-menu-header">
        <h3>{{ $t('settings') }}</h3>
        <button type="button" class="close" @click="toggleSettingsMenu" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="settings-menu-content">
        <div v-if="state === 'local'">
          <div>
            <label for="woodPrice">{{ $t('woodPrice') }}:</label>
            <input type="number" id="woodPrice" v-model.number="prices.wood" step="0.0001"><br>
            <label for="foodPrice">{{ $t('foodPrice') }}:</label>
            <input type="number" id="foodPrice" v-model.number="prices.food" step="0.0001"><br>
            <label for="stonePrice">{{ $t('stonePrice') }}:</label>
            <input type="number" id="stonePrice" v-model.number="prices.stone" step="0.0001"><br>
          </div>
        </div>
        <button v-if="state === 'server'" @click="pricesStore.setManualPrices" class="btn btn-light">{{
          $t('manualPrices')
        }}</button>
        <button v-if="state === 'local'" @click="fetchPrices" class="btn btn-primary">{{ $t('fetchPrices') }}</button>

        <h5 class="my-4">{{ $t('accounts') }}</h5>
        <div v-if="accounts.length > 0">
          <ul class="accounts-list">
            <li v-for="account in accounts" :key="account.id" class="account-item">
              <div class="account-info">
                <div class="account-actions" v-if="!account.editing && accounts.length > 1">
                  <button @click="accountsStore.removeAccount(account.id)" class="remove-account-button">
                    <TrashIcon />
                  </button>
                </div>
                <div class="account-name">
                  <span v-if="!account.editing">{{ account.name }}</span>
                  <input v-else type="text" v-model="account.name" @keyup.enter="accountsStore.saveAccountName(account)"
                    class="account-name-input">
                </div>
                <div class="account-actions">
                  <button @click="account.editing = !account.editing" class="edit-account-button">
                    <component :is="account.editing ? DoneIcon : PencilIcon"></component>
                  </button>
                </div>
              </div>
              <div class="account-tools">
                <div v-if="account.tools.length === 0" class="no-tools">
                  {{ $t('noToolsAdded') }}
                </div>
                <ul v-else class="tools-list">
                  <li v-for="(tool, index) in account.tools" :key="index" class="tool-item">
                    <img :src="tool.icon" :alt="tool.name" class="tool-icon">
                    <span class="tool-name">{{ tool.name
                      }}<!-- - {{ tool.craftPrice }}<i class="ton-icon"></i>--></span>
                    <button @click="accountsStore.removeUserTool(account.id, index)" class="remove-tool-button">
                      <TrashIcon />
                    </button>
                  </li>
                </ul>
                <button @click="modalsStore.openAddToolModal(account.id)" class="btn btn-info add-tool-button">
                  <AddIcon class="mr-2" />
                  {{ $t('addTool') }}
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="no-accounts mb-2">
          {{ $t('noAccounts') }}
        </div>
        <button @click="accountsStore.addAccount" class="btn btn-secondary mt-2">{{ $t('addAccount') }}</button>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '@/stores/settings';
import { usePricesStore } from '@/stores/prices';
import { useModalsStore } from '@/stores/modals';
import { useAccountsStore } from '@/stores/accounts';
import PencilIcon from '@/components/icons/pencil-icon.vue'
import DoneIcon from '@/components/icons/done-icon.vue'
import AddIcon from '@/components/icons/add-icon.vue'
import TrashIcon from '@/components/icons/trash-icon.vue'

const { t: $t } = useI18n();
const settingsStore = useSettingsStore();
const pricesStore = usePricesStore();
const modalsStore = useModalsStore();
const accountsStore = useAccountsStore();

const showSettingsMenu = computed(() => modalsStore.showSettingsMenu);
const state = computed(() => settingsStore.state);
const prices = computed(() => pricesStore.prices);
const accounts = computed(() => accountsStore.accounts);

function toggleSettingsMenu() {
  modalsStore.toggleSettingsMenu();
}

function fetchPrices() {
  settingsStore.setState('server');
  pricesStore.fetchPrices();
}
</script>