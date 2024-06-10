<template>
    <div v-if="showModal" class="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ $t('siteNews') }}</h5>
                    <button type="button" class="close" @click="closeModal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-for="(article, timestamp) in langNews" :key="timestamp">
                        <div>
                            <h5>
                                {{ article.title }}
                            </h5>
                            <div v-html="article.content"></div>
                        </div>
                    </div>
                </div>
                <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-light" @click="closeModal">{{ $t('close') }}</button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, t: $t } = useI18n();
const showModal = ref(false);

function closeModal() {
    showModal.value = false;
}
const langNews = computed(() => news[locale.value as "en" | "ru"] || []);

const news = {
    ru: {
        1716152400: { // 20.05.24
            title: "Добавлены фактории в калькулятор аккаунтов",
            content: "Теперь в настройках есть кнопка \"добавить фаторию\""
        }
    },
    en: {
        1716152400: { // 20.05.24
            title: "",
            content: ""
        }
    }
}
</script>