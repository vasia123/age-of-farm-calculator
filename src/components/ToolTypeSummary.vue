<template>
  <div class="tool-type-summary">
    <div class="resources-container">
      <ResourceCard v-for="(items, resourceType) in groupedItems" :key="resourceType" :resource-type="resourceType"
        :resource-price="getResourcePrice(resourceType)" :price-change="getPriceChangePercentage(resourceType)"
        :is-resource="true">
        <template #default="{ resourceType }">
          <ItemSummary v-for="item in items" :key="item.name" :item="item" :resource-type="resourceType"
            :dog-boost="dogBoost" />
        </template>
      </ResourceCard>
      <ResourceCard resource-type="tents" :resource-price="0" price-change="N/A" :is-resource="false">
        <template #default>
          <TentSummary v-for="building in tents" :key="building.name" :tents="building" />
        </template>
      </ResourceCard>
      <EnhancementsSummary />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useToolsStore } from '@/stores/tools';
import { usePricesStore } from '@/stores/prices';
import type { ResourceType } from '@/types/main';
import ResourceCard from '@/components/ResourceCard.vue';
import ItemSummary from '@/components/ToolSummary.vue';
import TentSummary from '@/components/TentSummary.vue';
import { useTentsStore } from '@/stores/tents';
import { useEnhancementsStore } from '@/stores/enhancements';
import EnhancementsSummary from '@/components/EnhancementsSummary.vue';

const toolsStore = useToolsStore();
const pricesStore = usePricesStore();
const buildingsStore = useTentsStore();
const enhancementsStore = useEnhancementsStore();

const groupedItems = computed(() => toolsStore.toolsByType);
const tents = computed(() => buildingsStore.tents);

const getResourcePrice = (resourceType: ResourceType) => pricesStore.getResourcePrice(resourceType);
const getPriceChangePercentage = (resourceType: ResourceType) => pricesStore.getPriceChangePercentage(resourceType);

const dogBoost = computed(() => {
  const dogEnhancement = enhancementsStore.getEnhancementsByType('dog')[0];
  return dogEnhancement ? dogEnhancement.boost : 0;
});
</script>