<template>
    <div class="col-lg-4 col-md-6 col-sm-12 mb-4 text-center resource-item">
        <div class="card card-cascade wider">
            <div class="view view-cascade grey darken-3">
                <div class="m-1">
                    <div class="text-center">
                        <div class="chip gradbg-dark-grey shd mb-0 waves-effect resources-big">
                            <div class="mt-2 ml-2">
                                <template v-if="isResource">
                                    <img :src="`/age-of-farm-calculator/img/${resourceType.toLowerCase()}.png`">
                                    <span class="badge darken-3 md no-shadow">
                                        {{ formatNumber(resourcePrice) }} <i class="ton-icon"></i>
                                        <span class="badge ssm" :class="{
                                            'green lighten-1': priceChange.includes('+'),
                                            'red lighten-1': !priceChange.includes('+')
                                        }">
                                            {{ priceChange }}
                                        </span>
                                    </span>
                                </template>
                                <template v-else>
                                    <span class="badge darken-3 md no-shadow text-capitalize">
                                        {{ $t(resourceType) }}
                                    </span>
                                </template>
                            </div>
                        </div>
                    </div>
                    <slot :resource-type="resourceType"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatNumber } from '@/shared/utils';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

const props = defineProps<{
    resourceType: string;
    resourcePrice: number;
    priceChange: string;
    isResource: boolean;
}>();

const isResource = computed(() => props.isResource);
</script>