<template>
    <div class="d-block mt-4">
        <div class="d-inline-block w-50 b-atomic">
            <div class="d-inline-block w-25 flex-right">
                <img :src="building.icon" :alt="building.name" class="img-fluid ml-2">
            </div>
            <div class="d-inline-block w-75 flex-right vtop">
                <div class="d-block">
                    <span class="badge sm no-shadow">{{ $t('boostPercentage') }}:</span>
                    <span class="badge sm ml-1 gradbg-lime2">
                        +{{ building.boost }}%
                    </span>
                </div>
                <div class="d-block mt-2">
                    <span class="badge sm no-shadow">{{ $t('workers') }}:</span>
                    <span class="badge grey darken-2 sm ml-1">
                        {{ building.additionalToolSlots }}
                    </span>
                </div>
            </div>
        </div>
        <div class="d-inline-block w-50 b-alcor">
            <div v-for="(cost, resource) in building.craftCost" :key="resource" class="d-block fw_craft">
                <div class="d-inline-block w-50 text-right">
                    <span class="badge ssm no-shadow">{{ cost }}</span>
                    <img :src="`/age-of-farm-calculator/img/${resource}.png`" style="height: 16px;">
                </div>
                <div class="d-inline-block w-50 text-right">
                    <span class="badge ssm no-shadow">
                        {{ formatNumber(cost * getResourcePrice(resource)) }}<i class="ton-icon"></i>
                    </span>
                </div>
            </div>
            <div class="d-block fw_craft">
                <div class="d-inline-block w-50 text-right">
                    <span class="badge sm no-shadow">{{ $t('craftCost') }}:</span>
                </div>
                <div class="d-inline-block w-50 text-right">
                    <span class="badge grey darken-2 sm">
                        {{ formatNumber(getBuildingTotalCost(building)) }}<i class="ton-icon"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { usePricesStore } from '@/stores/prices';
import { useBuildingsStore, type Building } from '@/stores/buildings';
import { formatNumber } from '@/shared/utils';
import type { ResourceType } from '@/types/main';

const { t: $t } = useI18n();
const pricesStore = usePricesStore();
const buildingsStore = useBuildingsStore();

defineProps<{
    building: Building;
}>();

const getResourcePrice = (resourceType: ResourceType) => pricesStore.getResourcePrice(resourceType);
const getBuildingTotalCost = buildingsStore.getBuildingTotalCost;
</script>