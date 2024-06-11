import { defineStore } from 'pinia';
import { ref } from 'vue';

type Weater = 'summer' | 'winter'

export const useSeasonStore = defineStore('season', () => {
    const season = ref<Weater>('summer')
    const getSeason = () => season.value
    const toggleSeason = () => {
        season.value = season.value === 'summer'
            ? 'winter'
            : 'summer';
    }
    const setSeason = (newSeason: Weater) => season.value = newSeason;
    return {
        season,
        getSeason,
        setSeason,
        toggleSeason,
    };
});
