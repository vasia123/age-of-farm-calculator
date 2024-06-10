<template>
  <div v-if="showModal" class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t('addTool') }}</h5>
          <button type="button" class="close" @click="closeModal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="toolType">{{ $t('chooseToolType') }}</label>
            <div class="icon-resource-select-wrapper icon-resource-select-wrapper--tools">
              <div v-for="tool in tools" :key="tool.name" class="icon-resource-select-row" :class="{
                'icon-resource-select-row--active': tool.name === selectedTool.name
              }" @click="selectedTool = tool">
                <img :src="tool.icon" class="icon-resource-select-img icon-resource-select-img--big">
                <div class="icon-resource-select-resource">
                  {{ $t(tool.name) }}
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="craftPrice">{{ $t('craftPriceFull') }}<i class="ton-icon"></i></label>
            <input type="number" id="craftPrice" v-model.number="craftPrice" class="form-control" step="0.0001">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" @click="closeModal">{{ $t('cancel') }}</button>
          <button type="button" class="btn btn-primary" @click="addUserTool">{{ $t('add') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useModalsStore } from '@/stores/modals';
import { useToolsStore } from '@/stores/tools';
import { useAccountsStore } from '@/stores/accounts';
import type { Tool } from '@/types/main';

const { t: $t } = useI18n();
const modalsStore = useModalsStore();
const toolsStore = useToolsStore();
const accountsStore = useAccountsStore();

const showModal = computed(() => modalsStore.showAddToolModal);
const selectedAccountId = computed(() => modalsStore.selectedAccountId);
const craftPrice = ref(0);

const tools = computed(() => toolsStore.tools);
const selectedTool = ref<Tool>(tools.value[0]);

function closeModal() {
  craftPrice.value = 0;
  modalsStore.closeAddToolModal();
}

function addUserTool() {
  if (!selectedTool.value || !selectedAccountId.value) return;
  const account = accountsStore.accounts.find(acc => acc.id === selectedAccountId.value);
  if (!account) return;

  const newTool = {
    ...selectedTool.value,
    craftPrice: craftPrice.value
  };
  account.tools.push(newTool);
  accountsStore.saveAccounts();
  closeModal();
}
</script>