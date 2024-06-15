<template>
    <div class="toggle-container">
        <div class="toggle-label" :class="{
            'spring-active': isSpring,
            'summer-active': isSummer,
            'autumn-active': isAutumn,
            'winter-active': isWinter,
        }">
            <div class="toggle-icon" @click="toggleSeason('spring')">
                <img src="/img/spring-icon.png" alt="Spring" class="toggle-image toggle-image--spring">
            </div>
            <div class="toggle-icon" @click="toggleSeason('summer')">
                <img src="/img/summer-icon.png" alt="Summer" class="toggle-image toggle-image--summer">
            </div>
            <div class="toggle-icon" @click="toggleSeason('autumn')">
                <img src="/img/autumn-icon.png" alt="Autumn" class="toggle-image toggle-image--autumn">
            </div>
            <div class="toggle-icon" @click="toggleSeason('winter')">
                <img src="/img/winter-icon.png" alt="Winter" class="toggle-image toggle-image--winter">
            </div>
            <div class="toggle-switch"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useSeasonStore } from '@/stores/season';
import type { Season } from '@/types/main';

const seasonStore = useSeasonStore();

const isSpring = computed(() => seasonStore.season === 'spring')
const isSummer = computed(() => seasonStore.season === 'summer')
const isAutumn = computed(() => seasonStore.season === 'autumn')
const isWinter = computed(() => seasonStore.season === 'winter')

const toggleSeason = (season: Season) => {
    seasonStore.setSeason(season)
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
    justify-content: space-between;
    width: 180px;
    height: 40px;
    background-color: #FFF4C1;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 40px;
}

.toggle-image {
    width: 24px;
    z-index: 2;
}

.toggle-image--spring {
    margin-left: -4px;
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

.spring-active .toggle-switch {
    transform: translateX(0px);
}

.summer-active .toggle-switch {
    transform: translateX(47px);
}

.autumn-active .toggle-switch {
    transform: translateX(94px);
}

.winter-active .toggle-switch {
    transform: translateX(137px);
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