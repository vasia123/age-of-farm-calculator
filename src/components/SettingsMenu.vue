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
            <label for="skinPrice">{{ $t('skinPrice') }}:</label>
            <input type="number" id="skinPrice" v-model.number="prices.skin" step="0.0001"><br>
          </div>
        </div>
        <button v-if="state === 'server'" @click="pricesStore.setManualPrices" class="btn btn-light">
          {{ $t('manualPrices') }}
        </button>
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
                <h6>{{ $t('tools') }}</h6>
                <div v-if="account.tools.length === 0" class="no-tools">
                  {{ $t('noToolsAdded') }}
                </div>
                <ul v-else class="tools-list">
                  <li v-for="(tool, index) in account.tools" :key="index" class="tool-item">
                    <img :src="tool.icon" :alt="tool.name" class="tool-icon">
                    <span class="tool-name">{{ tool.name }}</span>
                    <button @click="accountsStore.removeUserTool(account.id, index)" class="remove-tool-button">
                      <TrashIcon />
                    </button>
                  </li>
                </ul>
                <button @click="modalsStore.openAddToolModal(account.id)" class="btn btn-info add-tool-button">
                  <AddIcon class="mr-2" />
                  {{ $t('addTool') }}
                </button>

                <h6 class="mt-4">{{ $t('tents') }}</h6>
                <div v-if="account.tents.length === 0" class="no-tents">
                  {{ $t('noTentsAdded') }}
                </div>
                <ul v-else class="tents-list">
                  <li v-for="(tent, index) in account.tents" :key="index" class="tent-item">
                    <img :src="tent.icon" :alt="tent.name" class="tent-icon">
                    <span class="tent-name">{{ $t(tent.name) }}</span>
                    <button @click="accountsStore.removeTentFromAccount(account.id, index)" class="remove-tent-button">
                      <TrashIcon />
                    </button>
                  </li>
                </ul>
                <button @click="modalsStore.openAddTentModal(account.id)" class="btn btn-info add-tool-button"
                  v-if="account.tents.length === 0">
                  <AddIcon class="mr-2" />
                  {{ $t('addTent') }}
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

<style scoped>
.settings-menu-close-area {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}

.settings-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background: #fff;
  padding: 20px;
  overflow-y: auto;
}

.settings-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.accounts-list {
  list-style-type: none;
  padding: 0;
}

.account-item {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.account-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.account-name {
  font-weight: bold;
}

.account-name-input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.account-actions {
  display: flex;
}

.edit-account-button,
.remove-account-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
}

.tools-list,
.tents-list {
  list-style-type: none;
  padding: 0;
}

.tool-item,
.tent-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.tool-icon,
.tent-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.tool-name,
.tent-name {
  flex-grow: 1;
}

.remove-tool-button,
.remove-tent-button {
  background: none;
  border: none;
  cursor: pointer;
}

.add-tool-button,
.add-tent-button {
  margin-top: 10px;
}

.no-tools,
.no-tents {
  color: #888;
  font-style: italic;
}
</style>