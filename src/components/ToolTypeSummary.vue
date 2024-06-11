<template>
  <div class="tool-type-summary">
    <div class="resources-container">
      <div v-for="(toolsOfType, resource) in toolTypes" :key="resource"
        class="col-lg-4 col-md-6 col-sm-12 mb-4 text-center resource-item">
        <div class="card card-cascade wider">
          <div class="view view-cascade grey darken-3">
            <div class="m-1">
              <div class="text-center">
                <div class="chip gradbg-dark-grey shd mb-0 waves-effect resources-big">
                  <div class="mt-2 ml-2">
                    <img :src="'/age-of-farm-calculator/img/' + String(resource).toLowerCase() + '.png'">
                    <span class="badge darken-3 md no-shadow">
                      {{ formatNumber(pricesStore.getResourcePrice(resource)) }} <i class="ton-icon"></i>
                      <span class="badge ssm" :class="{
                        'green lighten-1': pricesStore.getPriceChangePercentage(resource).includes('+'),
                        'red lighten-1': !pricesStore.getPriceChangePercentage(resource).includes('+')
                      }">
                        {{ pricesStore.getPriceChangePercentage(resource) }}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="d-block mt-4" v-for="tool in toolsOfType" :key="tool.name">
                <div class="d-inline-block w-50 b-atomic">
                  <div class="d-inline-block w-25 flex-right">
                    <img :src="tool.icon" :alt="tool.name" class="img-fluid ml-2">
                  </div>
                  <div class="d-inline-block w-75 flex-right vtop">
                    <div class="d-block">
                      <span class="badge sm no-shadow">{{ $t('dailyProfit') }}:</span>
                      <span class="badge sm ml-1" :class="{
                        'gradbg-lime2': toolsStore.getToolDailyProfit(tool) > 0,
                        'gradbg-red': toolsStore.getToolDailyProfit(tool) < 0,
                      }">
                        {{ formatNumber(toolsStore.getToolDailyProfit(tool)) }}<i class="ton-icon"></i>
                      </span>
                    </div>
                    <div class="d-block mt-2">
                      <span class="ml-3 badge sm no-shadow">{{ $t('roi') }}:</span>
                      <span class="badge grey darken-2 sm ml-1">
                        {{ toolsStore.getToolDailyProfit(tool) > 0
                          ? toolsStore.getToolROI(tool, toolsStore.getToolCraftCost(tool)).days.toFixed(1)
                          : '🤷‍♂️'
                        }}
                      </span>
                      {{ $t('days') }}
                    </div>
                  </div>
                </div>
                <div class="d-inline-block w-50 b-alcor">
                  <div class="d-block fw_craft" v-if="tool.craft.wood > 0">
                    <div class="d-inline-block w-50 text-right">
                      <span class="badge ssm no-shadow">{{ tool.craft.wood }}</span>
                      <img src="/img/wood.png" style="height: 16px;">
                    </div>
                    <div class="d-inline-block w-50 text-right">
                      <span class="badge ssm no-shadow">
                        {{ formatNumber(tool.craft.wood * prices.wood) }}<i class="ton-icon"></i>
                      </span>
                    </div>
                  </div>
                  <div class="d-block fw_craft" v-if="tool.craft.stone > 0">
                    <div class="d-inline-block w-50 text-right">
                      <span class="badge ssm no-shadow">{{ tool.craft.stone }}</span>
                      <img src="/img/stone.png" style="height: 16px;">
                    </div>
                    <div class="d-inline-block w-50 text-right">
                      <span class="badge ssm no-shadow">
                        {{ formatNumber(tool.craft.stone * prices.stone) }}<i class="ton-icon"></i>
                      </span>
                    </div>
                  </div>
                  <div class="d-block fw_craft">
                    <div class="d-inline-block w-50 text-right">
                      <span class="badge sm no-shadow">{{ $t('craftCost') }}:</span>
                    </div>
                    <div class="d-inline-block w-50 text-right">
                      <span class="badge grey darken-2 sm">
                        {{ formatNumber(toolsStore.getToolCraftCost(tool)) }}<i class="ton-icon"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToolsStore } from '@/stores/tools';
import { usePricesStore } from '@/stores/prices';
import { formatNumber } from '@/shared/utils';

const { t: $t } = useI18n();
const toolsStore = useToolsStore();
const pricesStore = usePricesStore();

const toolTypes = computed(() => toolsStore.toolTypes);
const prices = computed(() => pricesStore.prices);
</script>