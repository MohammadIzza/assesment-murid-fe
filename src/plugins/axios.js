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

// Helper: safely logout via store if available, else fallback to clearing cookies
async function safeLogoutAndRedirect() {
  try {
    const mod = await import('@/stores/auth');
    if (mod && typeof mod.useAuthStore === 'function') {
      const authStore = mod.useAuthStore();
      await authStore.logout();
    }
  } catch (e) {
    // Fallback: clear cookies and axios headers directly if store isn't available
    try {
      Cookies.remove('auth_token');
      Cookies.remove('user_data');
      Cookies.remove('session_id');
    } catch (_) { /* noop */ }
    delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common['Session-Id'];
  } finally {
    // Redirect to login if not already there
    const isOnAuthPage = /\/login|\/regist|\/register/i.test(window.location.pathname);
    if (!isOnAuthPage) {
      // Preserve return path and mark reason
      const returnTo = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/login?redirect=${returnTo}&reason=expired`;
    }
  }
}

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
      const requestUrl = String(error.config?.url || '');
      const isLogin = requestUrl.includes('/auth/login');
      const isRegister = requestUrl.includes('/auth/register') || requestUrl.includes('/auth/regist');
      const isLogout = requestUrl.includes('/auth/logout');
      const isRefresh = requestUrl.includes('/auth/refresh');

      // If 401 on login/register, just reject (wrong credentials, don't logout)
      if (isLogin || isRegister) {
        return Promise.reject(error);
      }
      // Ignore 401 coming back from our own logout/refresh attempts
      if (isLogout || isRefresh) {
        return Promise.reject(error);
      }

      // For any other 401, treat as session expired: logout and redirect
      safeLogoutAndRedirect();
    }
    
    return Promise.reject(error);
  }
);

export default axios;