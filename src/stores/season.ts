// season.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { DateTime } from 'luxon';
import type { Season } from '@/types/main';

interface SeasonsList {
    name: Season;
    label: string;
    icon: string;
}

export const useSeasonStore = defineStore('season', () => {
    const season = ref<Season>('spring');
    const isScheduled = ref<boolean>(true);


    const setSeason = (newSeason: Season) => {
        season.value = newSeason;
    };

    const setIsScheduled = (value: boolean) => {
        isScheduled.value = value;
    };

    const updateSeasonBySchedule = () => {
        if (!isScheduled.value) return;

        const now = DateTime.now().setZone('Europe/Moscow');
        const startDate = DateTime.fromObject({ year: 2024, month: 6, day: 12 }, { zone: 'Europe/Moscow' });
        const daysDiff = Math.floor(now.diff(startDate, 'days').days);
        const seasonIndex = Math.floor(daysDiff / 16) % 4;
        const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];
        season.value = seasons[seasonIndex];
    };

    const generateSeasons = () => {
        const now = DateTime.now().setZone('Europe/Moscow');
        const firstSeasonStart = DateTime.fromObject({ year: 2024, month: 6, day: 12 }, { zone: 'Europe/Moscow' });
        const daysSinceFirstSeason = Math.floor(now.diff(firstSeasonStart, 'days').days);
        const currentSeason = Math.floor(daysSinceFirstSeason / 16) % 4;
        const seasons: SeasonsList[] = [
            { name: 'spring', label: 'seasonSpring', icon: '/age-of-farm-calculator/img/spring-icon.png' },
            { name: 'summer', label: 'seasonSummer', icon: '/age-of-farm-calculator/img/summer-icon.png' },
            { name: 'autumn', label: 'seasonAutumn', icon: '/age-of-farm-calculator/img/autumn-icon.png' },
            { name: 'winter', label: 'seasonWinter', icon: '/age-of-farm-calculator/img/winter-icon.png' },
        ];

        const generatedSeasons = [];
        for (let i = -4; i <= 4; i++) {
            const seasonIndex = (currentSeason + i + 4) % 4;
            const season = seasons[seasonIndex];
            const startDate = firstSeasonStart.plus({ days: (currentSeason + i) * 4 });
            const endDate = startDate.plus({ days: 4 });
            const active = now >= startDate && now < endDate;
            generatedSeasons.push({ ...season, startDate, endDate, active });
        }

        return generatedSeasons;
    };

    return {
        season,
        isScheduled,
        setSeason,
        setIsScheduled,
        updateSeasonBySchedule,
        generateSeasons,
    };
});