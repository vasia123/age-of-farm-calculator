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
            <template v-for="resource in craftResources" :key="resource.icon">
                <div class="d-block fw_craft" v-if="resource.cost > 0">
                    <div class="d-inline-block w-50 text-right">
                        <span class="badge ssm no-shadow" v-if="resource.count !== ''">
                            {{ translateIfString(resource.count, $t) }}
                        </span>
                        <img :src="resource.icon" style="height: 16px;">
                    </div>
                    <div class="d-inline-block w-50 text-right">
                        <span class="badge ssm no-shadow">
                            {{ formatNumber(resource.cost) }}<i class="ton-icon"></i>
                        </span>
                    </div>
                </div>
            </template>
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
import { useBuildingsStore, type Building } from '@/stores/buildings';
import { formatNumber, translateIfString } from '@/shared/utils';
import { computed } from 'vue';

const { t: $t } = useI18n();
const buildingsStore = useBuildingsStore();
const craftResources = computed(() => buildingsStore.getBuildingCraftResources(props.building));

const props = defineProps<{
    building: Building;
}>();

const getBuildingTotalCost = buildingsStore.getBuildingTotalCost;
</script>