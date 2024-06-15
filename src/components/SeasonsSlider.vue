<template>
    <div class="toggle-container" :class="`toggle-${seasonStore.season}`">
        <div class="toggle-dates-wrapper">
            <div class="toggle-dates">
                <div v-for="season in visibleTitlesOfSeasons" :key="season.name" class="toggle-date"
                    :class="{ 'toggle-date--active': season.active }">
                    {{ formatDate(season.startDate) }}
                </div>
            </div>
        </div>
        <div class="toggle-label" :class="currentSeason">
            <div class="toggle-icons">
                <div class="toggle-line" :style="{ transform: `translateX(${seasonsOffset}px)` }"></div>
                <div v-for="season, index in visibleSeasons" :key="season.name" class="toggle-icon"
                    :class="{ 'toggle-icon--active': season.active }" @click="setSeason(index)">
                    <img :src="season.icon" :alt="season.name" class="toggle-icon__image">
                </div>
            </div>
            <div class="toggle-switch" :class="`toggle-switch--${seasonIndex}`"></div>
        </div>
        <div class="toggle-titles-wrapper">
            <div class="toggle-titles">
                <div v-for="season in visibleSeasons" :key="season.name" class="toggle-title"
                    :class="{ 'toggle-title--active': season.active }">
                    {{ $t(season.label) }}
                    <div v-if="season.name === 'winter'" class="toggle-title-hint">
                        <img src="/img/food.png" width="20px" class="mb-1">x3
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useSeasonStore } from '@/stores/season';
import { useI18n } from 'vue-i18n';
import { DateTime } from 'luxon';

const { t: $t } = useI18n();

const seasonStore = useSeasonStore();

const currentSeason = computed(() => seasonStore.season);

seasonStore.updateSeasonBySchedule();

const seasons = seasonStore.generateSeasons();

const totalVisibleSeasons = 5;
const totalSeasonsWidth = 300;
const seasonWidth = totalSeasonsWidth / totalVisibleSeasons;

const visibleTitlesOfSeasons = computed(() => {
    const activeSeason = seasons.find(season => season.active);
    if (activeSeason) {
        const activeIndex = seasons.indexOf(activeSeason);
        return seasons.slice(activeIndex - Math.floor(totalVisibleSeasons / 2), activeIndex + Math.ceil(totalVisibleSeasons / 2) + 1);
    }
    return seasons.slice(0, totalVisibleSeasons);
});

const visibleSeasons = computed(() => {
    const activeSeason = seasons.find(season => season.active);
    if (activeSeason) {
        const activeIndex = seasons.indexOf(activeSeason);
        return seasons.slice(activeIndex - Math.floor(totalVisibleSeasons / 2), activeIndex + Math.ceil(totalVisibleSeasons / 2));
    }
    return seasons.slice(0, totalVisibleSeasons);
});

const seasonIndex = ref(visibleSeasons.value.findIndex(s => s.active))

const seasonsOffset = computed(() => {
    const activeSeason = seasons.find(season => season.active);
    if (activeSeason) {
        const now = DateTime.now().setZone('Europe/Moscow');
        const seasonProgress = now.diff(activeSeason.startDate, 'days').days;
        const offset = (seasonProgress * (seasonWidth / 4) - 2 * (seasonWidth / 4))
        return totalSeasonsWidth / 2 + offset - 4;
    }
    return 0;
});

const formatDate = (date: DateTime) => {
    return date.toFormat('d.MM');
};

const setSeason = (index: number) => {
    const season = visibleSeasons.value[index]
    seasonIndex.value = index
    seasonStore.setSeason(season.name)
};
</script>

<style scoped>
.toggle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 30px;
}

.toggle-label {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 300px;
    height: 40px;
    background-color: #FFF4C1;
    border-radius: 25px;
    transition: background-color 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: #6c7ae0;
}

.toggle-icon--active .toggle-icon__image {
    animation: rotate 4s linear infinite;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 40px;
    border-right: 1px solid #ccc;
    cursor: pointer;
}

.toggle-icon:last-child {
    border-right: none;
}

.toggle-icon img {
    width: 24px;
    z-index: 3;
}

.toggle-title {
    margin: 0 5px;
    color: #888;
}

.toggle-date {
    margin: 5px;
    color: #888;
    font-size: 12px;
}

.toggle-title.toggle-title--active,
.toggle-date.toggle-date--active {
    color: #FFD717;
}

.toggle-date:first-child {
    margin-left: -20px;
}

.toggle-date:last-child {
    margin-right: -30px;
}

.toggle-titles-wrapper,
.toggle-dates-wrapper {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.toggle-titles,
.toggle-icons,
.toggle-dates {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    transition: transform 0.3s;
}

.toggle-title-hint {
    font-size: 12px;
    height: 12px;
    margin-top: -3px;
    margin-bottom: -12px;
}

.toggle-switch {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 32px;
    height: 32px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #6c7ae0;
    transition: transform 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.toggle-switch--0 {
    transform: translateX(10px);
}

.toggle-switch--1 {
    transform: translateX(69px);
}

.toggle-switch--2 {
    transform: translateX(129px);
}

.toggle-switch--3 {
    transform: translateX(189px);
}

.toggle-switch--4 {
    transform: translateX(250px);
}

.toggle-winter .toggle-label {
    background-color: #6c7ae0;
}

.toggle-winter .toggle-line {
    background-color: yellow;
}
</style>