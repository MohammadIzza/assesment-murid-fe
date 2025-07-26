<template>
  <!-- Pastikan menambahkan class dark mode pada navbar -->
  <nav class="bg-white dark:bg-dark-header border-b border-gray-200 dark:border-dark-border px-4 py-2.5 fixed w-full z-50 top-0 left-0 transition-colors duration-300">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo & Brand -->
        <div class="flex items-center space-x-4">
          <RouterLink :to="{ name: 'dashboard' }" class="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div class="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg shadow-md">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Assessment Murid</h1>
              <p class="text-xs text-gray-500">Management System</p>
            </div>
          </RouterLink>
        </div>

        <!-- Navigation Menu -->
        <div class="hidden md:flex items-center space-x-1">
          <!-- Dashboard -->
          <RouterLink 
            :to="{ name: 'dashboard' }"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            :class="isDashboardActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
            </svg>
            Dashboard
          </RouterLink>

          <!-- Assessment Link -->
          <RouterLink 
            :to="{ name: 'assesment-index' }"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            :class="isAssessmentActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Assessment
          </RouterLink>

          <!-- Data Dropdown (was Guru Dropdown) -->
          <div class="relative group">
            <div 
              class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              :class="isGuruActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
              Data
              <svg class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            
            <!-- Dropdown Menu -->
            <div class="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
              <RouterLink 
                :to="{ name: 'guru-list' }"
                class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                Daftar Guru
              </RouterLink>
              <RouterLink 
                :to="{ name: 'SiswaList' }"
                class="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
                Daftar Siswa
              </RouterLink>
            </div>
          </div>

          <!-- Reports -->
          <RouterLink 
            :to="{ name: 'laporan-nilai' }"
            class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            :class="isLaporanActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Laporan
          </RouterLink>
        </div>

        <!-- User Profile & Actions -->
        <div class="flex items-center space-x-2 lg:space-x-4">

          <!-- User Menu - Responsive -->
          <div class="relative group">
            <div class="flex items-center space-x-2 bg-gray-50 px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
              <div class="flex items-center justify-center w-7 h-7 bg-blue-600 rounded-full">
                <span class="text-sm font-semibold text-white">{{ userInitial }}</span>
              </div>
              <div class="hidden sm:block text-left">
                <span class="text-sm font-medium text-gray-900 truncate max-w-32">{{ authStore.user?.name || 'User' }}</span>
              </div>
              <svg class="w-4 h-4 text-gray-400 transition-transform duration-200 group-hover:rotate-180 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>

            <!-- User Dropdown -->
            <div class="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
              <div class="px-4 py-2 border-b border-gray-100">
                <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name || 'User' }}</p>
                <p class="text-xs text-gray-500">{{ authStore.user?.email || 'user@example.com' }}</p>
              </div>
              <RouterLink 
                :to="{ name: 'profile' }"
                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Profil Saya
              </RouterLink>
              <RouterLink 
                :to="{ name: 'settings' }"
                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Pengaturan
              </RouterLink>
              <div class="border-t border-gray-100 my-1"></div>
              <button 
                @click="handleLogout"
                class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Keluar
              </button>
            </div>
          </div>

          <!-- Theme Toggle - Around User Profile Dropdown -->
          <div class="ml-3">
            <button 
              @click="toggleTheme"
              class="p-2 rounded-full transition-colors duration-200"
              :class="isDarkMode ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'"
              :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <!-- Sun icon for light mode -->
              <svg v-if="isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <!-- Moon icon for dark mode -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden relative">
            <button 
              @click.stop="toggleMobileMenu"
              class="mobile-menu-button p-2 flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              aria-label="Toggle menu"
            >
              <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu - Enhanced with hover support -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-full opacity-0"
    >
      <div 
        v-show="isMobileMenuOpen" 
        @click.stop
        class="md:hidden fixed top-16 right-0 left-0 bg-white border-t border-gray-200 shadow-lg z-50"
      >
        <!-- Menu content -->
        <div class="px-2 pt-2 pb-3 space-y-1 max-w-7xl mx-auto">
          <!-- Dashboard Mobile -->
          <RouterLink 
            :to="{ name: 'dashboard' }"
            @click="closeMobileMenu"
            class="flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors"
            :class="isDashboardActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            </svg>
            Dashboard
          </RouterLink>

          <!-- Assessment Mobile -->
          <RouterLink 
            :to="{ name: 'assesment-index' }"
            @click="closeMobileMenu"
            class="flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors"
            :class="isAssessmentActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Assessment
          </RouterLink>

          <!-- Data Mobile -->
          <RouterLink 
            :to="{ name: 'guru-list' }"
            @click="closeMobileMenu"
            class="flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors"
            :class="isGuruActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Daftar Guru
          </RouterLink>
          <RouterLink 
            :to="{ name: 'SiswaList' }"
            @click="closeMobileMenu"
            class="flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
            Daftar Siswa
          </RouterLink>
          
          <!-- Reports Mobile -->
          <RouterLink 
            :to="{ name: 'laporan-nilai' }"
            @click="closeMobileMenu"
            class="flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors"
            :class="isLaporanActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Laporan
          </RouterLink>

          <!-- Divider -->
          <div class="border-t border-gray-200 my-2"></div>

          <!-- Profile Mobile -->
          <RouterLink 
            :to="{ name: 'profile' }"
            @click="closeMobileMenu"
            class="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Profil Saya
          </RouterLink>

          <!-- Settings Mobile -->
          <RouterLink 
            :to="{ name: 'settings' }"
            @click="closeMobileMenu"
            class="flex items-center px-3 py-3 text-sm font-medium rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Pengaturan
          </RouterLink>

          <!-- Logout Mobile -->
          <button 
            @click.stop="handleLogout"
            class="flex items-center w-full px-3 py-3 text-sm font-medium rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Keluar
          </button>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme';

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const themeStore = useThemeStore();
const isMobileMenuOpen = ref(false)
const hoverTimeout = ref(null)
const isHoverMode = ref(false)
const lastClickTime = ref(0)

const isGuruActive = computed(() => {
  return ['guru-list', 'guru-detail', 'guru-add', 'guru-edit', 'guru-import', 'guru-index'].includes(route.name)
})

const isDashboardActive = computed(() => {
  return ['dashboard', 'dashboard-main'].includes(route.name)
})

const isAssessmentActive = computed(() => {
  return ['assesment-index', 'assesment-detail', 'assesment-add', 'assesment-edit'].includes(route.name)
})

const userInitial = computed(() => {
  const name = authStore.user?.name || 'U'
  return name.charAt(0).toUpperCase()
})

const activeTheme = computed(() => {
  if (themeStore.theme === 'auto') {
    return themeStore.systemIsDark ? 'dark' : 'light';
  }
  return themeStore.theme;
});

// Dark mode related
const isDarkMode = computed(() => themeStore.isDarkMode);
const toggleTheme = () => {
  themeStore.setTheme(isDarkMode.value ? 'light' : 'dark');
};

// Toggle mobile menu (for click)
const toggleMobileMenu = () => {
  console.log('Toggle mobile menu clicked')
  
  // Add this line to prevent multiple rapid clicks from causing issues
  if (Date.now() - lastClickTime.value < 300) return
  lastClickTime.value = Date.now()
  
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// Close mobile menu
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  isHoverMode.value = false
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
}

const handleLogout = (event) => {
  // Prevent event from bubbling up to parent elements
  event.stopPropagation()
  
  // Confirm logout on mobile to prevent accidental clicks
  if (window.innerWidth < 768) {
    if (!confirm('Anda yakin ingin keluar?')) {
      return
    }
  }
  
  authStore.logout()
  router.push('/login')
}

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  // Don't handle the event if it's on the burger button itself
  if (event.target.closest('.mobile-menu-button')) {
    return
  }
  
  // Only close if clicked outside navbar and menu is open
  const navbar = document.querySelector('nav')
  if (navbar && !navbar.contains(event.target) && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

// Close mobile menu on escape key
const handleEscapeKey = (event) => {
  if (event.key === 'Escape') {
    closeMobileMenu()
  }
}

// Close mobile menu on window resize to desktop
const handleResize = () => {
  if (window.innerWidth >= 768) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscapeKey)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscapeKey)
  window.removeEventListener('resize', handleResize)
})
</script>


<style scoped>
/* Enhanced hover support for mobile menu button */
@media (hover: hover) {
  .group:hover .mobile-menu-button {
    background-color: rgb(243 244 246);
  }
}

/* Smooth transitions for mobile menu */
.mobile-menu-transition {
  transition: all 0.2s ease-out;
}

/* Ensure hover works properly on touch devices that support it */
@media (hover: hover) and (pointer: fine) {
  .group .mobile-menu-button:hover {
    transform: scale(1.05);
  }
}
</style>