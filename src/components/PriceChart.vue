<template>
    <div ref="chartContainer" style="position: relative; width: 100%; height: 100%;"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, type PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { createChart, TickMarkType } from 'lightweight-charts';
import type { IChartApi, LineData, ISeriesApi, UTCTimestamp } from 'lightweight-charts';
import { formatNumber } from '@/shared/utils';
import { useChartStore } from '@/stores/chart';

const { t: $t } = useI18n();

const props = defineProps({
    resourcesData: {
        type: Object as PropType<Record<string, LineData<UTCTimestamp>[]>>,
        required: true,
    },
});

let chart: IChartApi | null = null;
const seriesRefs = ref<Record<string, ISeriesApi<'Line'> | null>>({});

const chartContainer = ref<HTMLElement | null>(null);

let loadedDataCount = 0;
let isLoading = false;
let lastLogicalRange: { from: number; to: number } | null = null;
let isOver = false;

const chartStore = useChartStore();

const loadMoreData = async () => {
    if (isLoading || isOver) return;
    isLoading = true;

    const success = await chartStore.fetchMoreData();
    if (!success) isOver = true;
    loadedDataCount += Object.values(props.resourcesData)[0].length;

    isLoading = false;

    if (lastLogicalRange && lastLogicalRange.to > loadedDataCount || loadedDataCount === 0) {
        loadMoreData();
    }
};

const initChart = () => {
    if (!chartContainer.value) return;

    chart = createChart(chartContainer.value, {
        width: chartContainer.value.clientWidth,
        height: chartContainer.value.clientHeight,
        timeScale: {
            timeVisible: true,
            secondsVisible: false,
            rightBarStaysOnScroll: true,
            barSpacing: 3,
            tickMarkFormatter: (timeRaw: UTCTimestamp, tickMarkType: TickMarkType, locale: string) => {
                const time = timeRaw * 1000;
                const date = new Date(time);
                if (tickMarkType === TickMarkType.DayOfMonth) {
                    const formattedDate = date.toLocaleString(locale, { day: '2-digit', month: 'short' });
                    return formattedDate;
                }
                if (tickMarkType === TickMarkType.Month) {
                    const formattedMonth = date.toLocaleString(locale, { month: 'long', year: 'numeric' });
                    return formattedMonth;
                }
                if (tickMarkType === TickMarkType.Year) {
                    const year = date.getUTCFullYear().toString();
                    return year;
                }
                if (tickMarkType === TickMarkType.Time) {
                    const hours = date.getUTCHours().toString().padStart(2, '0');
                    const minutes = Math.floor(date.getUTCMinutes() / 10) * 10;
                    const formattedMinutes = minutes.toString().padStart(2, '0');
                    return `${hours}:${formattedMinutes}`;
                }
                return time;
            },
        },
        localization: {
            priceFormatter: (price: number) => formatNumber(price, 3),
        },
        layout: {
            background: { color: '#fff' },
            textColor: '#333333',
        },
        grid: {
            vertLines: {
                color: 'rgba(197, 203, 206, 0.5)',
            },
            horzLines: {
                color: 'rgba(197, 203, 206, 0.5)',
            },
        },
    });

    for (const resource in props.resourcesData) {
        const sortedData = props.resourcesData[resource].slice().filter(a => a.value).sort((a, b) => a.time - b.time);
        seriesRefs.value[resource] = chart.addLineSeries({
            color: getResourceColor(resource),
            lineWidth: 2,
            title: $t(resource.toLowerCase()),
        });
        if (sortedData.length === 0) {
            loadMoreData();
        } else {
            try {
                seriesRefs.value[resource]?.setData(sortedData);
            } catch (error) {
                console.error(error)
            }
        }
    }

    chart.timeScale().fitContent();

    chart.timeScale().subscribeVisibleLogicalRangeChange((logicalRange) => {
        lastLogicalRange = logicalRange;
        if (!isLoading && logicalRange && logicalRange.from < 0) {
            loadMoreData();
        }
    });
};

const updateChart = () => {
    for (const resource in props.resourcesData) {
        const sortedData = props.resourcesData[resource].slice().filter(a => a.value).sort((a, b) => a.time - b.time);
        if (sortedData.length === 0) {
            loadMoreData();
        } else {
            try {
                seriesRefs.value[resource]?.setData(sortedData);
            } catch (error) {
                console.error(error)
            }
        }
    }
};

const getResourceColor = (resource: string) => {
    switch (resource) {
        case 'FOOD':
            return 'blue';
        case 'STONE':
            return 'gold';
        case 'WOOD':
            return 'green';
        default:
            return 'black';
    }
};

watch(
    () => props.resourcesData,
    () => {
        updateChart();
    },
    { deep: true }
);

onMounted(() => {
    initChart();
});
</script>