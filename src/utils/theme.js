/**
 * Utility untuk manajemen tema (light, dark, auto)
 */

// Konstanta untuk tema
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto'
}

// Konstanta untuk storage key
export const THEME_STORAGE_KEY = 'app-theme-preference'

/**
 * Mengecek apakah sistem menggunakan dark mode
 * @returns {boolean} - true jika sistem dalam dark mode
 */
export const getSystemThemePreference = () => {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Listener untuk perubahan tema sistem
 * @param {Function} callback - Fungsi yang dipanggil saat tema sistem berubah
 * @returns {Function} - Fungsi untuk menghapus listener
 */
export const watchSystemThemeChange = (callback) => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  
  // Event listener untuk perubahan tema
  const handleChange = () => callback(mediaQuery.matches ? THEMES.DARK : THEMES.LIGHT)
  
  // Tambahkan event listener
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  } else {
    // Fallback untuk browser lama
    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }
}

/**
 * Mendapatkan tema aktif berdasarkan preferensi
 * @param {string} themePreference - Preferensi tema dari user (light, dark, auto)
 * @returns {string} - Tema aktif yang akan digunakan (light atau dark)
 */
export const getActiveTheme = (themePreference) => {
  if (themePreference === THEMES.AUTO) {
    return getSystemThemePreference() ? THEMES.DARK : THEMES.LIGHT
  }
  return themePreference
}

/**
 * Menyimpan preferensi tema ke storage
 * @param {string} theme - Tema yang dipilih
 */
export const saveThemePreference = (theme) => {
  localStorage.setItem(THEME_STORAGE_KEY, theme)
}

/**
 * Mendapatkan preferensi tema dari storage
 * @returns {string} - Tema yang tersimpan atau default (light)
 */
export const loadThemePreference = () => {
  return localStorage.getItem(THEME_STORAGE_KEY) || THEMES.LIGHT
}

/**
 * Mengaplikasikan tema ke DOM
 * @param {string} theme - Tema untuk diaplikasikan (light atau dark)
 */
export const applyTheme = (theme) => {
  const isDark = theme === THEMES.DARK
  
  // Tambah atau hapus class dark pada root HTML
  if (isDark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  
  // Update meta theme-color untuk mobile browser
  const metaThemeColor = document.querySelector('meta[name="theme-color"]')
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', isDark ? '#1E293B' : '#3B82F6')
  }
}