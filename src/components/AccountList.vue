<template>
  <div class="tool-box-wrapper">
    <div v-for="account in accounts" :key="account.id" class="mb-3 px-1 tool-box-container">
      <div class="card card-cascade wider">
        <div class="view view-cascade grey darken-3">
          <div class="text-center my-2 font-weight-bolder">
            {{ account.name }}
          </div>
          <div class="no-tools" v-if="account.tools.length == 0 && account.tents.length == 0">
            {{ $t('noToolsOrTentsAdded') }}<br>{{ $t('addToolsOrTentsInSettings') }}
          </div>
          <div v-else class="tools-tables mb-2">
            <!-- Tools section -->
            <table class="tools-table" v-if="account.tools.length > 0"
              :class="{ 'tools-table-with-tents': account.tents.length > 0 }">
              <tr>
                <th colspan="6">{{ $t('tools') }}</th>
              </tr>
              <tr>
                <th>&nbsp;</th>
                <th>{{ $t('production') }}</th>
                <th>{{ $t('consumption') }}</th>
                <th>{{ $t('income') }}</th>
                <th>{{ $t('invested') }}</th>
                <th class="text-center">{{ $t('enhancement') }}</th>
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
                    -{{ fn(tool.energy * summariesStore.getEnergyMultiplier(tool) / 4 * 24) }}
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
                  {{ getToolCraftPrice(tool) }} <i class="ton-icon"></i>
                </td>
                <td>
                  <span v-for="enhancement in tool.enhancements" :key="enhancement.name">
                    <img :src="enhancement.icon" :alt="enhancement.name" height="30px">
                    <button @click="removeEnhancementFromTool(account.id, index, enhancement)"
                      class="btn btn-sm btn-danger ml-2 p-1">
                      <TrashIcon fill="fff" />
                    </button>
                  </span>
                  <button v-if="haveAvailbleEnhancements(tool).length > 0"
                    @click="openAddEnhancementModal(account.id, index)" class="btn btn-sm btn-primary p-1">
                    <AddIcon />
                  </button>
                </td>
              </tr>
              <tr class="tool-row">
                <td>
                  {{ $t('dailyProfit') }}:
                </td>
                <td>
                  <template v-for="(amount, resource) in getAccountResourcesSummary(account)" :key="resource">
                    <div v-if="amount > 0" class="tool-costs-row">
                      {{ fn(amount) }}
                      <img :src="'/age-of-farm-calculator/img/' + resource + '.png'" width="20px" class="mb-1" />
                    </div>
                  </template>
                </td>
                <td>
                  <template v-for="(amount, resource) in getAccountDailyConsumptionSummary(account)" :key="resource">
                    <div v-if="amount > 0" class="tool-costs-row">
                      -{{ fn(amount) }}
                      <img :src="'/age-of-farm-calculator/img/' + resource + '.png'" width="20px" class="mb-1" />
                    </div>
                  </template>
                </td>
                <td>
                  {{ fn(getAccountDailyProfitSummary(account)) }} <i class="ton-icon"></i>
                </td>
                <td colspan="2" class="text-center">
                  {{ $t('roi') }}: <span class="badge grey darken-2 sm ml-1">{{
                    getAccountROI(account).toFixed(1)
                  }}</span>
                  {{ $t('days') }}
                </td>
              </tr>
            </table>

            <!-- Tents section -->
            <table class="tools-table tents-table" v-if="account.tents.length > 0">
              <tr>
                <th colspan="5">{{ $t('tents') }}</th>
              </tr>
              <tr>
                <th>&nbsp;</th>
                <th>{{ $t('production') }}</th>
                <th>{{ $t('income') }}</th>
                <th>{{ $t('craftPriceShort') }}</th>
                <th>{{ $t('roi') }}</th>
              </tr>
              <tr v-for="tent in account.tents" :key="tent.name" class="tool-row">
                <td>
                  <img :src="tent.icon" :alt="tent.name" class="mr-2" width="20px">
                </td>
                <td>
                  <template v-for="(amount, resource) in getAccountRawResourcesSummary(account, excludeBowsNames)"
                    :key="resource">
                    <div v-if="amount > 0" class="tool-costs-row">
                      {{ fn(amount * tent.boost / 100) }}
                      <img :src="'/age-of-farm-calculator/img/' + resource + '.png'" width="20px" class="mb-1" />
                    </div>
                  </template>
                </td>
                <td>
                  {{ fn(getTentProfit(account, tent)) }} <i class="ton-icon"></i>
                </td>
                <td>
                  {{ fn(tent.craftPrice) }} <i class="ton-icon"></i>
                </td>
                <td>
                  {{ $t('roi') }}: <span class="badge grey darken-2 sm ml-1">{{
                    getTentROI(account, tent).toFixed(1)
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
                  {{ fn(getAllProfitSummary()) }} <i class="ton-icon"></i>
                </td>
                <td>
                  {{ $t('roi') }}:
                  <span class="badge grey darken-2 sm ml-1">
                    {{ getFullAccountROI().toFixed(1) }}
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
import type { Account, CraftedTent, ResourceType, CraftedTool, CraftedEnhancement } from '@/types/main';
import { usePricesStore } from '@/stores/prices';
import { useModalsStore } from '@/stores/modals';
import AddIcon from '@/components/icons/add-icon.vue'
import TrashIcon from './icons/trash-icon.vue';
import { useEnhancementsStore } from '@/stores/enhancements';

const { t: $t } = useI18n();
const accountsStore = useAccountsStore();
const summariesStore = useSummariesStore();
const toolsStore = useToolsStore();
const pricesStore = usePricesStore();
const modalsStore = useModalsStore();
const enhancementsStore = useEnhancementsStore();

const fn = formatNumber;
const accounts = computed(() => accountsStore.accounts);

const getToolProfit = (tool: CraftedTool) => {
  const chance = tool.chance ? tool.chance / 100 : 1;
  const dogBoost = getDogBoost(tool);
  return tool.profit * 24 * chance * (1 + dogBoost / 100);
}

const getTentProfit = (account: Account, tent: CraftedTent): number => {
  const resources = summariesStore.calculateNetResourceSummary(
    summariesStore.getAccountRawResourcesSummary(account.id, excludeBowsNames),
    {} as Record<ResourceType, number>
  )
  return Object.entries(resources).reduce((sum, [resource, amount]) => {
    return sum + amount * pricesStore.getResourcePrice(resource as ResourceType) * tent.boost / 100
  }, 0)
}

const getTentROI = (account: Account, tent: CraftedTent): number => {
  return tent.craftPrice / getTentProfit(account, tent)
}

const excludeBowsNames = [
  'Bow (Common)',
  'Bow (Uncommon)',
  'Bow (Rare)',
  'Bow (Epic)',
  'Bow (Legendary)',
]

const getAccountResourcesSummary = (account: Account) => summariesStore.getAccountResourcesSummary(account.id);
const getAccountDailyConsumptionSummary = (account: Account) => summariesStore.getAccountDailyConsumptionSummary(account.id);
const getAccountDailyProfitSummary = (account: Account) => summariesStore.getAccountDailyProfitSummary(account.id);
const getAccountROI = (account: Account) => summariesStore.getAccountROI(account.id);
const getAllProfitSummary = () => summariesStore.getAllProfitSummary();
const getFullAccountROI = () => summariesStore.getFullAccountROI();
const getAccountRawResourcesSummary = (account: Account, excludeTools: string[]) =>
  summariesStore.getAccountRawResourcesSummary(account.id, excludeTools);

const getDogBoost = (tool: CraftedTool) => {
  const dogEnhancement = tool.enhancements?.find(e => e.type === 'dog');
  return dogEnhancement ? dogEnhancement.boost : 0;
}

function removeEnhancementFromTool(accountId: number, toolIndex: number, enhancement: CraftedEnhancement) {
  accountsStore.removeEnhancementFromTool(accountId, toolIndex, enhancement);
}

function openAddEnhancementModal(accountId: number, toolIndex: number) {
  modalsStore.openAddEnhancementModal(accountId, toolIndex);
}

const getToolCraftPrice = (tool: CraftedTool) => {
  const enhancements = tool.enhancements || []
  return tool.craftPrice + enhancements.reduce((acc, enh) => enh.craftPrice + acc, 0)
}

const haveAvailbleEnhancements = (tool: CraftedTool) => {
  const allAvailEnh = enhancementsStore.availableEnhancements(tool).map(enh => enh.name);
  const alreadyHaveEnh = (tool.enhancements || []).map(enh => enh.name);
  return allAvailEnh.reduce((acc, enhName) => {
    if (!alreadyHaveEnh.includes(enhName)) acc.push(enhName)
    return acc
  }, [] as string[])
}
</script>


<style scoped>
.tools-table {
  width: 100%;
  border-collapse: collapse;
}

.tents-table {
  margin-top: 10px;
}

.tools-table th,
.tools-table td {
  padding: 1px 8px;
  text-align: left;
}

/* Apply bottom border only when there are tents */
.tools-table-with-tents td {
  border-bottom: 1px solid #ddd;
}

/* Remove bottom border from the last row of the tents table */
.tools-table:last-child tr:last-child td {
  border-bottom: none;
}

.tool-costs-row {
  display: flex;
  align-items: center;
}

.tool-costs-row img {
  margin-left: 4px;
}
</style>