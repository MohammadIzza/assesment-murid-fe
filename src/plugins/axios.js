/**
 * File: plugins/axios.js
 * Deskripsi: Konfigurasi Axios untuk HTTP requests
 * Fungsi: Mengatur instance Axios dengan interceptors dan headers default
 */

import axios from 'axios'

// Konfigurasi default untuk Axios
axios.defaults.baseURL = 'http://129.150.60.200:3000'  // URL dasar API
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'  // Menandai request sebagai AJAX
axios.defaults.headers.common['Content-Type'] = 'application/json'  // Format data default
axios.defaults.headers.common['Accept'] = 'application/json'  // Menerima response dalam format JSON

// Interceptor untuk request
// Akan dijalankan sebelum request dikirim
axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Interceptor untuk response
// Akan dijalankan setelah response diterima
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// Export instance Axios yang sudah dikonfigurasi
export const axiosInstance = axios