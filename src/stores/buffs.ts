import type { Buff, Tool } from '@/types/main';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';

export const useBuffsStore = defineStore('buffs', () => {
    const { t: $t } = useI18n();

    const buffs: Buff[] = [
        {
            name: 'mining_buff',
            cost: {
                planks: 5,
                ton: 1
            }, 
            bonus_percent: {
                mining_up: 30
            },
            cooldown: `30 ${$t('days')}`
        },
        {
            name: 'energy_buff',
            cost: {
                soup: 5,
                ton: 1
            }, 
            bonus_percent: {
                energy_cost_reduce: 100
            },
            cooldown: `30 ${$t('days')}`
        },
        {
            name: 'durability_buff',
            cost: {
                ingot: 5,
                ton: 1
            }, 
            bonus_percent: {
                durability_cost_reduce: 100
            },
            cooldown: `30 ${$t('days')}`
        },
    ]

    function applyBuffToTool(tool: Tool, buff: Buff): Tool {
        const buffData = buffs.find(b => b.name === buff.name);
        if (!buffData) throw new Error("no buff data!");

        const updatedTool = { ...tool };
      
        for (const [bonus, percent] of Object.entries(buffData.bonus_percent)) {
          if (bonus === 'mining_up') {
            updatedTool.profit *= 1 + percent / 100;
          } else if (bonus === 'energy_cost_reduce') {
            updatedTool.energy *= 1 - percent / 100;
          } else if (bonus === 'durability_cost_reduce') {
            updatedTool.durability *= 1 - percent / 100;
          }
        }
      
        return updatedTool;
    }

    return {
        buffs,
        applyBuffToTool,
    };
});