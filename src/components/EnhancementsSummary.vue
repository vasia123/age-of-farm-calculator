<template>
    <ResourceCard resource-type="enhancements" :resource-price="0" price-change="N/A" :is-resource="false">
        <template #default>
            <div v-for="enhancement in enhancements" :key="enhancement.name" class="enhancement-item">
                <div class="enhancement-icon">
                    <img :src="enhancement.icon" :alt="enhancement.name">
                </div>
                <div class="enhancement-details">
                    <h5>{{ $t(enhancement.name.toLowerCase()) }}</h5>
                    <p v-if="enhancement.type === 'dog'">{{ $t('dogBoost', { boost: enhancement.boost }) }}</p>
                    <p v-if="enhancement.craftChance < 1">
                        {{ $t('dogCraftChance', { chance: enhancement.craftChance * 100 }) }}
                    </p>
                    <p v-else-if="enhancement.type === 'clothing'">{{ $t('clothingEffect') }}</p>
                    <p>{{ $t('craftCost') }}: {{ formatNumber(getEnhancementCraftCost(enhancement)) }} <i
                            class="ton-icon"></i></p>
                </div>
            </div>
        </template>
    </ResourceCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useEnhancementsStore } from '@/stores/enhancements';
import ResourceCard from '@/components/ResourceCard.vue';
import { formatNumber } from '@/shared/utils';

const { t: $t } = useI18n();
const enhancementsStore = useEnhancementsStore();

const enhancements = computed(() => enhancementsStore.enhancements);
const getEnhancementCraftCost = enhancementsStore.getEnhancementCraftCost;
</script>

<style scoped>
.enhancement-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.enhancement-icon {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
}

.enhancement-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.enhancement-details {
    flex: 1;
}
</style>