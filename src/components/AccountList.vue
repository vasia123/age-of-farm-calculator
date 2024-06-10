<template>
  <div class="tool-box-wrapper">
    <div v-for="account in accounts" :key="account.id" class="mb-3 px-1 tool-box-container">
      <div class="card card-cascade wider">
        <div class="view view-cascade grey darken-3">
          <div class="text-center my-2 font-weight-bolder">
            {{ account.name }}
          </div>
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
                  {{ fn(tool.profit * 24) }}
                  <img :src="'/age-of-farm-calculator/img/' + String(tool.resource).toLowerCase() + '.png'" width="20px"
                    class="mb-1" />
                </td>
                <td>
                  <div v-if="tool.energy > 0" class="tool-costs-row">
                    {{ fn(tool.energy / 5 * 24) }}
                    <img src="/img/food.png" width="20px" class="mb-1" />
                  </div>
                  <div v-if="tool.durability > 0" class="tool-costs-row">
                    {{ fn(tool.durability / 5 * 24) }}
                    <img src="/img/stone.png" width="20px" class="mb-1" />
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
                  <div v-for="(amount, resource) in summariesStore.getAccountResourcesSummary(account.id)"
                    :key="resource" class="tool-costs-row">
                    {{ fn(amount) }}
                    <img :src="'/age-of-farm-calculator/img/' + resource + '.png'" width="20px" class="mb-1" />
                  </div>
                </td>
                <td>
                  <template v-for="(amount, resource) in summariesStore.getAccountConsumptionSummary(account.id)"
                    :key="resource">
                    <div v-if="amount > 0" class="tool-costs-row">
                      {{ fn(amount) }}
                      <img :src="'/age-of-farm-calculator/img/' + resource + '.png'" width="20px" class="mb-1" />
                    </div>
                  </template>
                </td>
                <td>
                  {{ fn(summariesStore.getAccountProfitSummary(account.id)) }} <i class="ton-icon"></i>
                </td>
                <td>
                  {{ $t('roi') }}: <span class="badge grey darken-2 sm ml-1">{{
                    summariesStore.getAccountROI(account.id).toFixed(1)
                  }}</span>
                  {{ $t('days') }}
                </td>
              </tr>
            </table>
            <!-- <div class="text-center mt-2 mb-0 font-weight-bolder">
                {{  $t('buffs_roi') }}
              </div>
              <div class="text-center mb-2 font-weight-bolder font-">
                <small>
                  {{  $t('buffs_roi_hint') }}
                </small>
              </div>
              <table class="tools-table">
                <tr>
                  <th>{{ $t('buff') }}</th>
                  <th>{{ $t('consumption') }}</th>
                  <th>{{ $t('roi') }}</th>
                </tr>
                <tr v-for="buff in buffsStore.buffs" :key="buff.name" class="tool-row">
                  <td class="text-left pl-2">
                    <img :src="'/age-of-farm-calculator/img/' + buff.name + '.png'" width="20px" class="mb-1" />
                    {{ $t(buff.name) }}
                  </td>
                  <td>
                    <div v-for="(amount, resource) in buff.cost" :key="resource" class="tool-costs-row">
                      {{ amount }}
                      <img :src="'/age-of-farm-calculator/img/' + resource + '.png'" width="20px" class="mb-1" />
                    </div>
                  </td>
                  <td>
                    <span class="badge sm ml-1"  :class="{
                      'gradbg-lime2': summariesStore.getAccountBuffROI(account.id, buff) < 30,
                      'gradbg-red': summariesStore.getAccountBuffROI(account.id, buff) >= 30,
                    }">
                      {{ summariesStore.getAccountBuffROI(account.id, buff).toFixed(1) }} 
                    </span>
                    {{ $t('days') }}
                  </td>
                </tr>
              </table> -->
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
// import { useBuffsStore } from '@/stores/buffs';
import { useToolsStore } from '@/stores/tools';
import { formatNumber } from '@/shared/utils';

const { t: $t } = useI18n();
const accountsStore = useAccountsStore();
const summariesStore = useSummariesStore();
const toolsStore = useToolsStore();
// const buffsStore = useBuffsStore();
const fn = formatNumber;
const accounts = computed(() => accountsStore.accounts);
</script>