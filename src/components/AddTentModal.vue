<template>
    <div v-if="showModal" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ $t('addTent') }}</h5>
                    <button type="button" class="close" @click="closeModal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="tentType">{{ $t('chooseTentType') }}</label>
                        <div class="icon-resource-select-wrapper icon-resource-select-wrapper--tents">
                            <div v-for="tent in tents" :key="tent.name" class="icon-resource-select-row" :class="{
                                'icon-resource-select-row--active': tent.name === selectedTent.name
                            }" @click="selectedTent = tent">
                                <img :src="tent.icon" class="icon-resource-select-img icon-resource-select-img--big">
                                <div class="icon-resource-select-resource">
                                    {{ $t(tent.name) }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="craftPrice">{{ $t('craftPriceFull') }}<i class="ton-icon"></i></label>
                        <input type="number" id="craftPrice" v-model.number="craftPrice" class="form-control"
                            step="0.0001">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" @click="closeModal">{{ $t('cancel') }}</button>
                    <button type="button" class="btn btn-primary" @click="addUserTent">{{ $t('add') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useModalsStore } from '@/stores/modals';
import { useTentsStore } from '@/stores/tents';
import { useAccountsStore } from '@/stores/accounts';
import type { Tent } from '@/types/main';

const { t: $t } = useI18n();
const modalsStore = useModalsStore();
const tentsStore = useTentsStore();
const accountsStore = useAccountsStore();

const showModal = computed(() => modalsStore.showAddTentModal);
const selectedAccountId = computed(() => modalsStore.selectedAccountId);
const craftPrice = ref(0);

const tents = computed(() => tentsStore.tents);
const selectedTent = ref<Tent>(tents.value[0]);

function closeModal() {
    craftPrice.value = 0;
    modalsStore.closeAddTentModal();
}

function addUserTent() {
    if (!selectedTent.value || !selectedAccountId.value) return;
    const account = accountsStore.accounts.find(acc => acc.id === selectedAccountId.value);
    if (!account) return;

    const newTent = {
        ...selectedTent.value,
        craftPrice: craftPrice.value
    };
    accountsStore.addTentToAccount(account.id, newTent);
    closeModal();
}
</script>