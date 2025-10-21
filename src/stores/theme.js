/**
 * File: stores/theme.js
 * Deskripsi: Store Pinia untuk mengelola tema aplikasi
 * Fungsi: Menyimpan state dan actions untuk pengaturan tema (light, dark, auto)
 */

import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    // Theme bisa 'light', 'dark', atau 'auto'
    theme: localStorage.getItem('theme') || 'light',
    // Flag untuk menandai apakah tema otomatis sedang menggunakan dark mode
    systemIsDark: false
  }),

  getters: {
    // Getter untuk menentukan apakah tema dark sedang aktif
    isDarkMode: (state) => {
      if (state.theme === 'dark') return true
      if (state.theme === 'auto') return state.systemIsDark
      return false
    },
    
    // Getter untuk mendapatkan nama tema
    currentTheme: (state) => state.theme
  },

  actions: {
    /**
     * Mengatur tema aplikasi
     * @param {string} newTheme - 'light', 'dark', atau 'auto'
     */
    setTheme(newTheme) {
      if (!['light', 'dark', 'auto'].includes(newTheme)) {
        newTheme = 'light'
      }
      
      this.theme = newTheme
      localStorage.setItem('theme', newTheme)
      this.applyTheme()
    },

    /**
     * Mengaplikasikan tema ke document
     */
    applyTheme() {
      // Cek preferensi sistem jika tema 'auto'
      if (this.theme === 'auto') {
        this.listenToSystemTheme()
        this.checkSystemTheme()
      } else {
        // Hapus listener jika tidak auto
        if (window.matchMedia) {
          const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
          mediaQuery.removeEventListener('change', this.handleSystemThemeChange)
        }
        
        // Terapkan tema yang dipilih
        document.documentElement.classList.toggle('dark', this.theme === 'dark')
      }
    },

    /**
     * Cek preferensi tema sistem
     */
    checkSystemTheme() {
      if (window.matchMedia) {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.systemIsDark = isDarkMode
        document.documentElement.classList.toggle('dark', isDarkMode)
      }
    },

    /**
     * Memasang listener untuk perubahan tema sistem
     */
    listenToSystemTheme() {
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        mediaQuery.addEventListener('change', this.handleSystemThemeChange.bind(this))
      }
    },

    /**
     * Handler untuk perubahan tema sistem
     */
    handleSystemThemeChange(e) {
      this.systemIsDark = e.matches
      document.documentElement.classList.toggle('dark', e.matches)
    },

    /**
     * Inisialisasi tema
     */
    initTheme() {
      this.applyTheme()
    }
  }
})