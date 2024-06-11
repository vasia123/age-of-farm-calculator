<template>
  <div class="toggle-container">
    <div class="toggle-title-summer" :class="{ 'toggle-title--active': !isWinter }">
      лето
    </div>
    <div class="toggle-label" :class="{ 'winter-active': isWinter }" @click="toggleSeason">
      <div class="toggle-summer">
        <img src="/img/summer-icon.png" alt="Summer">
      </div>
      <div class="toggle-switch" :class="{ 'winter-active': isWinter }"></div>
      <div class="toggle-winter">
        <img src="/img/winter-icon.png" alt="Winter">
      </div>
    </div>
    <div class="toggle-title-winter" :class="{ 'toggle-title--active': isWinter }">
      зима
    </div>
  </div>
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
                    {{ fn(tool.energy * toolsStore.energyMultiplyer / 5 * 24) }}
                    <img src="/img/food.png" width="20px" class="mb-1" />
                  </div>
                  <div v-if="tool.repair.stone > 0" class="tool-costs-row">
                    {{ fn(tool.repair.stone * 24) }}
                    <img src="/img/stone.png" width="20px" class="mb-1" />
                  </div>
                  <div v-if="tool.repair.wood > 0" class="tool-costs-row">
                    {{ fn(tool.repair.wood * 24) }}
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
import { useSeasonStore } from '@/stores/season';
import { useToolsStore } from '@/stores/tools';
import { formatNumber } from '@/shared/utils';

const { t: $t } = useI18n();
const accountsStore = useAccountsStore();
const summariesStore = useSummariesStore();
const seasonStore = useSeasonStore();
const toolsStore = useToolsStore();
const fn = formatNumber;
const accounts = computed(() => accountsStore.accounts);

const isWinter = computed(() => seasonStore.season === 'winter')

const toggleSeason = () => {
  seasonStore.toggleSeason()
};
</script>
<style scoped>
.toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 30px;
}

.toggle-label {
  position: relative;
  display: flex;
  align-items: center;
  width: 120px;
  height: 40px;
  background-color: #FFF4C1;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-switch {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 32px;
  height: 32px;
  background-color: #fff;
  border-radius: 50%;
  transition: transform 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.winter-active .toggle-switch {
  transform: translateX(80px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  z-index: 2;
}

.toggle-summer,
.toggle-winter {
  display: flex;
  align-items: center;
  justify-content: left;
  width: 60px;
  height: 40px;
}

.toggle-winter {
  justify-content: right;
}

.toggle-summer img,
.toggle-winter img {
  width: 28px;
  margin: 0 6px;
  z-index: 3;
}

.toggle-summer span,
.toggle-winter span {
  font-size: 14px;
}

.winter-active {
  background-color: #6c7ae0;
}

.toggle-title-summer,
.toggle-title-winter {
  margin: 0 5px;
  color: #888;
}

.toggle-title-summer.toggle-title--active {
  color: #FFD717;
}

.toggle-title-winter.toggle-title--active {
  color: #2AD8E6;
}
</style>