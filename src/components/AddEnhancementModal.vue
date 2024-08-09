<template>
    <div v-if="showModal" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ $t('addEnhancement') }}</h5>
                    <button type="button" class="close" @click="closeModal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="tentType">{{ $t('chooseEnhancementType') }}</label>
                        <div class="icon-resource-select-wrapper icon-resource-select-wrapper--tents">
                            <div v-for="enhancement in enhancementsStore.availableEnhancements(tool)"
                                :key="enhancement.name" class="icon-resource-select-row" :class="{
                                    'icon-resource-select-row--active': enhancement.name === selectedEnhancement?.name
                                }" @click="selectedEnhancement = enhancement">
                                <img :src="enhancement.icon"
                                    class="icon-resource-select-img icon-resource-select-img--big">
                                <div class="icon-resource-select-resource">
                                    {{ $t(enhancement.name.toLocaleLowerCase()) }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="craftPrice">{{ $t('craftPriceFull') }}<i class="ton-icon"></i></label>
                        <input type="number" id="craftPrice" v-model.number="craftPrice" class="form-control"
                            step="0.0001">
                    </div>
                    <div class="enhancement-details" v-if="selectedEnhancement">
                        <p v-if="selectedEnhancement.type === 'dog'">{{ $t('dogBoost', {
                            boost:
                                selectedEnhancement.boost
                        }) }}</p>
                        <p v-else-if="selectedEnhancement.type === 'clothing'">{{ $t('clothingEffect') }}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" @click="closeModal">{{ $t('cancel') }}</button>
                    <button type="button" class="btn btn-primary" :disabled="selectedEnhancement === null"
                        @click="addEnhancement">{{ $t('add') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useModalsStore } from '@/stores/modals';
import { useAccountsStore } from '@/stores/accounts';
import { useEnhancementsStore } from '@/stores/enhancements';
import type { Enhancement } from '@/types/main';

const { t: $t } = useI18n();
const modalsStore = useModalsStore();
const accountsStore = useAccountsStore();
const enhancementsStore = useEnhancementsStore();

const showModal = computed(() => modalsStore.showAddEnhancementModal);
const selectedAccountId = computed(() => modalsStore.selectedAccountId);
const selectedToolIndex = computed(() => modalsStore.selectedToolIndex);

const selectedEnhancement = ref<Enhancement | null>(null);
const craftPrice = ref(0);

function closeModal() {
    craftPrice.value = 0;
    selectedEnhancement.value = null;
    modalsStore.closeAddEnhancementModal();
}

const tool = computed(() => {
    if (selectedAccountId.value) {
        const account = accountsStore.accounts.find(acc => acc.id === selectedAccountId.value);
        return account?.tools[selectedToolIndex.value ?? -1];
    }
    return undefined
})

function addEnhancement() {
    if (!selectedEnhancement.value || selectedAccountId.value === null || selectedToolIndex.value === null) return;

    const newEnhancement = {
        ...selectedEnhancement.value,
        craftPrice: craftPrice.value
    };

    accountsStore.addEnhancementToTool(selectedAccountId.value, selectedToolIndex.value, newEnhancement);
    closeModal();
}
</script>

<style scoped>
.enhancement-details {
    margin-top: 1rem;
    padding: 0.5rem;
    background-color: #f8f9fa;
    border-radius: 0.25rem;
}
</style>