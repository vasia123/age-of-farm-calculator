// season.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { DateTime } from 'luxon';
import type { Season } from '@/types/main';

interface SeasonsListRaw {
    name: Season;
    label: string;
    icon: string;
}
interface SeasonsList {
    name: Season;
    label: string;
    icon: string;
    startDate: DateTime;
    endDate: DateTime;
    active: boolean;
}

export const useSeasonStore = defineStore('season', () => {
    const firstSeasonStart = DateTime.fromObject({ year: 2024, month: 6, day: 12 }, { zone: 'Europe/Moscow' });
    const now = DateTime.now().setZone('Europe/Moscow');
    const daysSinceFirstSeason = Math.floor(now.diff(firstSeasonStart, 'days').days);
    const currentSeasonIndex = Math.floor(daysSinceFirstSeason % 16 / 4);
    const seasons: Season[] = ['spring', 'summer', 'autumn', 'winter'];

    const season = ref<Season>(seasons[currentSeasonIndex]);

    const setSeason = (newSeason: Season) => {
        season.value = newSeason;
    };

    const generateSeasons = () => {
        const now = DateTime.now().setZone('Europe/Moscow').startOf('day');
        const seasons: SeasonsListRaw[] = [
            { name: 'spring', label: 'seasonSpring', icon: '/age-of-farm-calculator/img/spring-icon.png' },
            { name: 'summer', label: 'seasonSummer', icon: '/age-of-farm-calculator/img/summer-icon.png' },
            { name: 'autumn', label: 'seasonAutumn', icon: '/age-of-farm-calculator/img/autumn-icon.png' },
            { name: 'winter', label: 'seasonWinter', icon: '/age-of-farm-calculator/img/winter-icon.png' },
        ];

        const generatedSeasons: SeasonsList[] = [];
        seasons.forEach((season, i) => {
            const daysSinceFirstSeason = Math.floor(now.diff(firstSeasonStart, 'days').days);
            const currentSeason = Math.floor(daysSinceFirstSeason % 16 / 4);
            const offset = Math.floor(daysSinceFirstSeason / 16) * 16;
            const startDate = firstSeasonStart.plus({ days: offset + (currentSeason + i) * 4 });
            const endDate = startDate.plus({ days: 4 });
            const active = now >= startDate && now < endDate;
            generatedSeasons.push({
                ...season,
                startDate: endDate > now
                    ? startDate
                    : startDate.plus({ days: 16 }),
                endDate,
                active
            });
        })

        return generatedSeasons;
    };


    return {
        season,
        setSeason,
        generateSeasons,
    };
});