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
    // Get token from cookie (support both TOKEN_COOKIE formats)
    const token = Cookies.get('auth_token'); 
    
    // If token exists, add to headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Get session ID if exists
    const sessionId = Cookies.get('session_id');
    if (sessionId) {
      config.headers['Session-Id'] = sessionId;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor untuk handling error
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API request failed');
    
    // Handle 401 errors only on specific API calls, not on all
    // Avoid auto logout on page refresh or when checking auth status
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || '';
      
      // Only logout on specific endpoints, not on profile checks or verification
      const isAuthEndpoint = 
        requestUrl.includes('/auth/login') || 
        requestUrl.includes('/auth/register');
      
      // Avoid auto-logout on profile or verification endpoints
      const isProfileOrVerify = 
        requestUrl.includes('/user/profile') || 
        requestUrl.includes('/auth/verify');
      
      // Only remove tokens and redirect on auth endpoints, not on profile/verify checks
      if (isAuthEndpoint && !isProfileOrVerify) {
        // Import authStore and handle logout through proper channels
        const { useAuthStore } = require('@/stores/auth');
        const authStore = useAuthStore();
        authStore.logout();
        
        // Redirect only if explicitly logging out, not on page refresh auth checks
        if (requestUrl.includes('/auth/logout')) {
          // Redirect to login
          if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
            window.location.href = '/login';
          }
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default axios;