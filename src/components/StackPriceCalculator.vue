<template>
  <div class="resources-container useful-tools-container">
    <div class="col-lg-4 col-md-6 col-sm-12 mb-4 pl-2 text-center useful-tool-item">
      <div class="card card-cascade wider">
        <div class="view view-cascade grey darken-3">
          <div class="m-1">
            <button @click="openStackPriceCalculator" class="btn btn-primary">
              {{ $t('stackPriceCalculator') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showModal" class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ $t('stackPriceCalculator') }}</h5>
          <button type="button" class="close" @click="closeModal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="resourceAmount">{{ $t('resourceAmount') }}</label>
            <input type="number" id="resourceAmount" class="form-control" v-model.number="resourceAmount">
          </div>
          <div class="form-group">
            <label for="resourceType">{{ $t('resourceType') }}</label>
            <div class="icon-resource-select-wrapper">
              <div v-for="resource in resources" :key="resource" class="icon-resource-select-row" :class="{
                'icon-resource-select-row--active': selectedResource === resource
              }" @click="selectedResource = resource">
                <img :src="`/age-of-farm-calculator/img/${resource}.png`" class="icon-resource-select-img">
                <div class="icon-resource-select-resource">
                  {{ $t(resource) }}
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="pricePerUnit">{{ $t('pricePerUnit') }}</label>
            <input type="number" id="pricePerUnit" class="form-control" v-model.number="pricePerUnit"
              :disabled="autoPrice" step="0.0001">
          </div>
          <div class="form-group form-check">
            <input type="checkbox" id="autoPrice" class="form-check-input" v-model="autoPrice"
              @change="updatePricePerUnit">
            <label class="form-check-label" for="autoPrice">{{ $t('autoPrice') }}</label>
          </div>
          <div class="form-group">
            <label>{{ $t('stackPrice') }}<i class="ton-icon"></i>: {{ stackPrice.toFixed(6) }}</label>
            <button @click="copyStackPrice" class="btn btn-link p-0">
              <CopyIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useModalsStore } from '@/stores/modals';
import { usePricesStore } from '@/stores/prices';
import CopyIcon from '@/components/icons/copy-icon.vue';
import { formatNumber } from '@/shared/utils';
import type { ResourceType } from '@/types/main';

const { t: $t } = useI18n();
const modalsStore = useModalsStore();
const pricesStore = usePricesStore();

const showModal = computed(() => modalsStore.showStackPriceModal);

function openStackPriceCalculator() {
  modalsStore.openStackPriceModal();
}

const resources: Array<ResourceType> = [
  "wood",
  "food",
  "stone",
]

const resourceAmount = ref(1);
const selectedResource = ref<ResourceType>('wood');
const pricePerUnit = ref(pricesStore.getResourcePrice(selectedResource.value));
const autoPrice = ref(true);

function updatePricePerUnit() {
  if (autoPrice.value) {
    pricePerUnit.value = pricesStore.getResourcePrice(selectedResource.value);
  }
}

watch(selectedResource, () => {
  if (autoPrice.value) {
    pricePerUnit.value = pricesStore.getResourcePrice(selectedResource.value);
  }
});

watch(pricesStore.prices, () => {
  if (autoPrice.value) {
    pricePerUnit.value = pricesStore.getResourcePrice(selectedResource.value);
  }
}, { deep: true });

const stackPrice = computed(() => {
  const decrease = 0.0001 / 10 ** onlySignificantDigits.value
  const price = autoPrice.value ? pricesStore.getResourcePrice(selectedResource.value) - decrease : pricePerUnit.value;
  return resourceAmount.value * price;
});

const onlySignificantDigits = computed(() => {
  const currentPrice = formatNumber(pricesStore.getResourcePrice(selectedResource.value));
  const match = String(currentPrice).match(/\.0+/);
  return match ? match[0].length - 1 : 0;
})

function closeModal() {
  modalsStore.closeStackPriceModal();
}

async function copyStackPrice() {
  try {
    const countNumbers = onlySignificantDigits.value + 4
    await navigator.clipboard.writeText(stackPrice.value.toFixed(countNumbers).toString());
    // Опционально: показать сообщение об успешном копировании
  } catch (error) {
    console.error('Failed to copy stack price:', error);
  }
}

</script>
