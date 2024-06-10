<template>
    <footer class="footer">
        <div class="text-center">
            {{ $t('appreciationText') }}
            <div class="ton-address" @click="copyAddress">
                UQDv96pmc4Ze5tqMbC8I7I7jzZUu2kgGYL5-oe7tIs5HhNYr<i class="ton-icon"></i>
            </div>
            <div v-if="showCopiedMessage" class="copied-message">{{ $t('copiedMessage') }}</div>
        </div>
    </footer>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t: $t } = useI18n();
const showCopiedMessage = ref(false);

async function copyAddress() {
    try {
        await navigator.clipboard.writeText('UQDv96pmc4Ze5tqMbC8I7I7jzZUu2kgGYL5-oe7tIs5HhNYr');
        showCopiedMessage.value = true;
        setTimeout(() => {
            showCopiedMessage.value = false;
        }, 2000);
    } catch (error) {
        console.error('Failed to copy address:', error);
    }
}
</script>