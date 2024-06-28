<template>
  <div class="tool-box-wrapper">
    <div v-for="account in accounts" :key="account.id" class="mb-3 px-1 tool-box-container">
      <div class="card card-cascade wider">
        <div class="view view-cascade grey darken-3">
          <div class="text-center my-2 font-weight-bolder">
            {{ account.name }}
          </div>
          <!-- <SeasonsToggle /> -->
          <div class="no-tools" v-if="account.tools.length == 0">
            {{ $t('noToolsAdded') }}<br>{{ $t('addToolsInSettings') }}
          </div>
          <div v-else class="tools-tables mb-2">
            <table class="tools-table">
              <tr>
                <th>&nbsp;</th>
                <th>{{ $t('production') }}</th>
                <th>{{ $t('consumption') }}</th>
                <th>{{ $t('income') }}</th>
                <th>{{ $t('invested') }}</th>
              </tr>
              <tr v-for="(tool, index) in account.tools" :key="index" class="tool-row">
                <td>
                  <img :src="tool.icon" :alt="tool.name" class="mr-2" width="20px">
                </td>
                <td>
                  {{ fn(getToolProfit(tool)) }}
                  <img :src="'/age-of-farm-calculator/img/' + String(tool.resource).toLowerCase() + '.png'" width="20px"
                    class="mb-1" />
                </td>
                <td>
                  <div v-if="tool.energy > 0" class="tool-costs-row">
                    -{{ fn(tool.energy * energyMultiplyer / 5 * 24) }}
                    <img src="/img/food.png" width="20px" class="mb-1" />
                  </div>
                  <div v-if="tool.repair.stone > 0" class="tool-costs-row">
                    -{{ fn(tool.repair.stone * 24) }}
                    <img src="/img/stone.png" width="20px" class="mb-1" />
                  </div>
                  <div v-if="tool.repair.wood > 0" class="tool-costs-row">
                    -{{ fn(tool.repair.wood * 24) }}
                    <img src="/img/wood.png" width="20px" class="mb-1" />
                  </div>
                </td>
                <td>
                  {{ fn(toolsStore.getToolDailyProfit(tool)) }} <i class="ton-icon"></i>
                </td>
                <td>
                  {{ tool.craftPrice }} <i class="ton-icon"></i>
                </td>
              </tr>
              <tr class="tool-row">
                <td>
                  {{ $t('dailyProfit') }}:
                </td>
                <td>
                  <template v-for="(amount, resource) in summariesStore.getAccountResourcesSummary(account.id)"
                    :key="resource">
                    <div v-if="amount > 0" class="tool-costs-row">
                      {{ fn(amount) }}
                      <img :src="'/age-of-farm-calculator/img/' + resource + '.png'" width="20px" class="mb-1" />
                    </div>
                  </template>
                </td>
                <td>
                  <template v-for="(amount, resource) in summariesStore.getAccountDailyConsumptionSummary(account.id)"
                    :key="resource">
                    <div v-if="amount > 0" class="tool-costs-row">
                      -{{ fn(amount) }}
                      <img :src="'/age-of-farm-calculator/img/' + resource + '.png'" width="20px" class="mb-1" />
                    </div>
                  </template>
                </td>
                <td>
                  {{ fn(summariesStore.getAccountDailyProfitSummary(account.id)) }} <i class="ton-icon"></i>
                </td>
                <td>
                  {{ $t('roi') }}: <span class="badge grey darken-2 sm ml-1">{{
                    summariesStore.getAccountROI(account.id).toFixed(1)
                    }}</span>
                  {{ $t('days') }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-3 px-1 tool-box-container" v-if="accounts.length > 1">
      <div class="card card-cascade wider">
        <div class="view view-cascade grey darken-3">
          <div class="text-center my-2 font-weight-bolder">
            {{ $t('fullDailyProfit') }}
          </div>
          <div class="tools-tables p-2">
            <table class="tools-table">
              <tr class="tool-row">
                <td>
                  {{ fn(summariesStore.getAllProfitSummary()) }} <i class="ton-icon"></i>
                </td>
                <td>
                  {{ $t('roi') }}:
                  <span class="badge grey darken-2 sm ml-1">
                    {{ summariesStore.getFullAccountROI().toFixed(1) }}
                  </span>
                  {{ $t('days') }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAccountsStore } from '@/stores/accounts';
import { useSummariesStore } from '@/stores/summaries';
import { useToolsStore } from '@/stores/tools';
import { formatNumber } from '@/shared/utils';
import type { Tool } from '@/types/main';

const { t: $t } = useI18n();
const accountsStore = useAccountsStore();
const summariesStore = useSummariesStore();
const toolsStore = useToolsStore();
const fn = formatNumber;
const accounts = computed(() => accountsStore.accounts);
const energyMultiplyer = computed(() => toolsStore.energyMultiplyer);
const getToolProfit = (tool: Tool) => {
  const chance = tool.chance ? tool.chance / 100 : 1;
  return tool.profit * 24 * chance;
}
</script>