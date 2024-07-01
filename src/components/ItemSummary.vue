<template>
    <div class="d-block mt-4">
        <div class="d-inline-block w-50 b-atomic">
            <div class="d-inline-block w-25 flex-right">
                <img :src="item.icon" :alt="item.name" class="img-fluid ml-2">
            </div>
            <div class="d-inline-block w-75 flex-right vtop">
                <div class="d-block">
                    <span class="badge sm no-shadow">{{ $t('dailyProfit') }}:</span>
                    <span class="badge sm ml-1" :class="{
                        'gradbg-lime2': dailyProfit > 0,
                        'gradbg-red': dailyProfit < 0,
                    }">
                        {{ formatNumber(dailyProfit) }}<i class="ton-icon"></i>
                    </span>
                </div>
                <div class="d-block mt-2">
                    <span class="ml-3 badge sm no-shadow">{{ $t('roi') }}:</span>
                    <span class="badge grey darken-2 sm ml-1">
                        {{ roi }}
                    </span>
                    <span class="small-font ml-1">
                        {{ $t('days') }} ({{ isNFTPriceLower ? $t('nft') : $t('craft') }})
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
                        {{ formatNumber(craftCost) }}<i class="ton-icon"></i>
                    </span>
                </div>
            </div>
            <div class="d-block fw_craft">
                <div class="d-inline-block w-50 text-right">
                    <span class="badge sm no-shadow">
                        <a :href="nftCollectionUrl" target="_blank">{{ $t('nftPrice') }}</a>:
                    </span>
                </div>
                <div class="d-inline-block w-50 text-right">
                    <span class="badge grey darken-2 sm">
                        {{ nftPrice > 0 ? formatNumber(nftPrice) : '🤷‍♂️' }}<i class="ton-icon"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToolsStore } from '@/stores/tools';
import { useNftPricesStore } from '@/stores/nft_prices';
import { useSummariesStore } from '@/stores/summaries';
import { formatNumber, translateIfString } from '@/shared/utils';

const { t: $t } = useI18n();
const toolsStore = useToolsStore();
const nftPricesStore = useNftPricesStore();
const summariesStore = useSummariesStore();

const props = defineProps<{
    item: any;
    resourceType: string;
}>();

const dailyProfit = computed(() => toolsStore.getToolDailyProfit(props.item));
const craftCost = computed(() => toolsStore.getToolCraftCost(props.item));
const nftPrice = computed(() => nftPricesStore.getNftPriceForTool(props.item.name));
const isNFTPriceLower = computed(() => nftPrice.value > 0 && nftPrice.value < craftCost.value);
const roi = computed(() => {
    const cost = isNFTPriceLower.value ? nftPrice.value : craftCost.value;
    return summariesStore.getToolROI(props.item, cost).days.toFixed(1);
});
const craftResources = computed(() => toolsStore.getToolCraftResources(props.item));
const nftCollectionUrl = computed(() => {
    const nftName = nftPricesStore.getNftNameForTool(props.item.name);
    const encodedNftName = encodeURIComponent(nftName.replace(/ /g, '+'));
    return `https://getgems.io/collection/EQCacs0fOBdHPrOuzscIFHbCytC1MfxcWGRRoqFOJTZwrNSK?filter=%7B%22q%22%3A%22${encodedNftName}%22%2C%22saleType%22%3A%22fix_price%22%7D`;
});


</script>