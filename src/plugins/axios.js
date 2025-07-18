/**
 * File: plugins/axios.js
 * Deskripsi: Konfigurasi Axios untuk HTTP requests dengan JWT authentication
 * Fungsi: Mengatur instance Axios dengan interceptors dan headers default
 */

import axios from 'axios';
import Cookies from 'js-cookie';

// Set base URL dari environment variable
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Add request interceptor untuk menambahkan token otentikasi
axios.interceptors.request.use(
  (config) => {
    // Get token from cookie
    const token = Cookies.get('token');
    
    // If token exists, add to headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Remove this line to stop logging API requests
    // console.log('API Request:', config.method?.toUpperCase(), config.url);
    
    return config;
  },
  (error) => {
    // Remove or modify this line
    // console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor untuk handling error
axios.interceptors.response.use(
  (response) => {
    // Remove this line to stop logging API responses
    // console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    // Modify this to be less specific
    // console.error('API Error:', error.response?.status, error.response?.data || error.message);
    console.error('API request failed');
    
    // Rest of your error handling code
    if (error.response?.status === 401) {
      // Hapus token yang tidak valid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      
      // Redirect ke login jika bukan di halaman auth
      if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
        // Your redirect code
      }
    }
    
    return Promise.reject(error);
  }
);

export default axios;