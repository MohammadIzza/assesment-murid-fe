/**
 * File: plugins/axios.js
 * Deskripsi: Konfigurasi Axios untuk HTTP requests dengan JWT authentication
 * Fungsi: Mengatur instance Axios dengan interceptors dan headers default
 */

import axios from 'axios'

// Konfigurasi default untuk Axios
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'  // Menandai request sebagai AJAX
axios.defaults.headers.common['Content-Type'] = 'application/json'  // Format data default
axios.defaults.headers.common['Accept'] = 'application/json'  // Menerima response dalam format JSON

// Set JWT token jika tersedia di localStorage
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Interceptor untuk request
// Akan dijalankan sebelum request dikirim
axios.interceptors.request.use(
  config => {
    // Tambahkan token jika tersedia dan belum ada di header
    const token = localStorage.getItem('token')
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    console.log('API Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// Interceptor untuk response
// Akan dijalankan setelah response diterima
axios.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.config.url)
    return response
  },
  error => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message)
    
    // Jika token expired atau unauthorized, redirect ke login
    if (error.response?.status === 401) {
      // Hapus token yang tidak valid
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete axios.defaults.headers.common['Authorization']
      
      // Redirect ke login jika bukan di halaman auth
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
      }
    }
    
    return Promise.reject(error)
  }
)

// Export instance Axios yang sudah dikonfigurasi
export default axios