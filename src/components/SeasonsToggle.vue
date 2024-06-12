<template>
    <div class="toggle-container">
        <div class="toggle-title-summer" :class="{ 'toggle-title--active': !isWinter }">
            {{ $t('seasonSummer') }}
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
            {{ $t('seasonWinter') }}
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useSeasonStore } from '@/stores/season';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();

const seasonStore = useSeasonStore();

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