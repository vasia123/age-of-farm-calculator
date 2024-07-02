<template>
    <div class="d-block mt-4">
        <div class="d-inline-block w-50 b-atomic">
            <div class="d-inline-block w-25 flex-right">
                <img :src="tents.icon" :alt="tents.name" class="img-fluid ml-2">
            </div>
            <div class="d-inline-block w-75 flex-right vtop">
                <div class="d-block">
                    <span class="badge sm no-shadow">{{ $t('boostPercentage') }}:</span>
                    <span class="badge sm ml-1 gradbg-lime2">
                        +{{ tents.boost }}%
                    </span>
                </div>
                <div class="d-block mt-2">
                    <span class="badge sm no-shadow">{{ $t('workers') }}:</span>
                    <span class="badge grey darken-2 sm ml-1">
                        {{ tents.additionalToolSlots }}
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
                        {{ formatNumber(getTentTotalCost(tents)) }}<i class="ton-icon"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { formatNumber, translateIfString } from '@/shared/utils';
import { computed } from 'vue';
import type { Tent } from '@/types/main';
import { useTentsStore } from '@/stores/tents';

const { t: $t } = useI18n();
const tentsStore = useTentsStore();
const craftResources = computed(() => tentsStore.getTentCraftResources(props.tents));

const props = defineProps<{
    tents: Tent;
}>();

const getTentTotalCost = tentsStore.getTentTotalCost;
</script>