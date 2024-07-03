<template>
  <div class="tool-type-summary">
    <div class="resources-container">
      <ResourceCard v-for="(items, resourceType) in groupedItems" :key="resourceType" :resource-type="resourceType"
        :resource-price="getResourcePrice(resourceType)" :price-change="getPriceChangePercentage(resourceType)"
        :is-resource="true">
        <template #default="{ resourceType }">
          <ItemSummary v-for="item in items" :key="item.name" :item="item" :resource-type="resourceType" />
        </template>
      </ResourceCard>
      <ResourceCard resource-type="tents" :resource-price="0" price-change="N/A" :is-resource="false">
        <template #default>
          <TentSummary v-for="building in tents" :key="building.name" :tents="building" />
        </template>
      </ResourceCard>
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

const toolsStore = useToolsStore();
const pricesStore = usePricesStore();
const buildingsStore = useTentsStore();

const groupedItems = computed(() => toolsStore.toolsByType);
const tents = computed(() => buildingsStore.tents);

const getResourcePrice = (resourceType: ResourceType) => pricesStore.getResourcePrice(resourceType);
const getPriceChangePercentage = (resourceType: ResourceType) => pricesStore.getPriceChangePercentage(resourceType);
</script>