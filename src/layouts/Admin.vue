<script setup>
import Navbar from '@/components/admin/Navbar.vue'
import { useThemeStore } from '@/stores/theme';
import { computed } from 'vue';

const themeStore = useThemeStore();
const isDarkMode = computed(() => themeStore.isDarkMode);
</script>

<template>
  <div :class="[
    'min-h-screen transition-colors duration-300',
    isDarkMode ? 'dark bg-dark-background text-dark-text' : 'bg-gray-50 text-gray-900'
  ]">
    <!-- Navbar -->
    <Navbar />
    
    <!-- Main Content -->
    <main class="pt-16 transition-colors duration-300">
      <router-view></router-view>
    </main>
  </div>
</template>