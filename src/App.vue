<!--
  File: App.vue
  Deskripsi: Komponen utama aplikasi yang berfungsi sebagai container
  Fungsi: Menampilkan komponen yang sesuai dengan route yang aktif
-->

<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useThemeStore } from '@/stores/theme';
import { onMounted, watch, computed } from 'vue';

// Inisialisasi theme store
const themeStore = useThemeStore();
const isDarkMode = computed(() => themeStore.isDarkMode);

// Initialize theme when app is mounted
onMounted(() => {
  themeStore.initTheme();
});

// Watch for theme changes to update meta theme-color
watch(() => themeStore.isDarkMode, (newIsDarkMode) => {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.content = newIsDarkMode ? '#0F172A' : '#3B82F6';
  }
}, { immediate: true });
</script>

<template>
  <div :class="{ 'dark': isDarkMode }">
    <!-- RouterView akan menampilkan komponen yang sesuai dengan URL saat ini -->
    <RouterView />
  </div>
</template>

<style>
html, body {
  height: 100%;
}

/* Apply transition for theme switching */
body {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
</style>