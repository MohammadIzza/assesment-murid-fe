import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import { parseJWT } from '@/utils/jwt'
import Cookies from 'js-cookie'

// Constants for cookie names and options
const TOKEN_COOKIE = 'auth_token'
const USER_COOKIE = 'user_data'
const SESSION_COOKIE = 'session_id'
const COOKIE_OPTIONS = {
  expires: 1, // 1 day
  secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
  sameSite: 'strict',
  path: '/',
  domain: process.env.NODE_ENV === 'production' ? process.env.VITE_COOKIE_DOMAIN : undefined
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    let user = null;
    try {
      const userCookie = Cookies.get(USER_COOKIE);
      if (userCookie) {
        user = JSON.parse(userCookie);
      }
    } catch (e) {
      console.error('Error parsing user cookie:', e);
    }

  const token = Cookies.get(TOKEN_COOKIE);
  const sessionId = Cookies.get(SESSION_COOKIE);
  const isAuthenticated = !!token && !!user && !!sessionId;

    return {
      user,
      token: token || null,
      sessionId: sessionId || null,
      isAuthenticated: isAuthenticated,
      loading: false,
      error: null
    }
  },

  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
    getUser: (state) => state.user,
    getToken: (state) => state.token
  },

  actions: {
    // Initialize auth state from cookies
    async initAuth() {
      const token = Cookies.get(TOKEN_COOKIE)
      const userCookie = Cookies.get(USER_COOKIE)
      const sessionId = Cookies.get(SESSION_COOKIE)
      
      if (token && userCookie && sessionId) {
        try {
          this.token = token
          this.user = JSON.parse(userCookie)
          this.sessionId = sessionId
          this.isAuthenticated = true
          
          // Set axios default headers
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          if (sessionId) axios.defaults.headers.common['Session-Id'] = sessionId

          // Parse token and enrich user object with claims if available
          try {
            const decoded = parseJWT(token) || {}
            // Merge decoded claims into user state if not present
            this.user = Object.assign({}, this.user || {}, {
              id: decoded.id || this.user?.id || null,
              email: decoded.email || this.user?.email || null,
              is_verified: typeof decoded.is_verified !== 'undefined' ? decoded.is_verified : this.user?.is_verified,
              is_verified_nip: typeof decoded.is_verified_nip !== 'undefined' ? decoded.is_verified_nip : this.user?.is_verified_nip
            })
          } catch (e) {
            // ignore parse errors
          }
          
          // Verify the token silently, but don't logout if it fails to prevent refresh issues
          try {
            const response = await axios.get('/user/profile')
            if (response.data.success) {
              // Update user if needed
              this.user = response.data.data || response.data.user || this.user
              
              // If a new token is provided, update it
              if (response.data.token) {
                this.token = response.data.token
                Cookies.set(TOKEN_COOKIE, this.token, COOKIE_OPTIONS)
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
              }
            }
          } catch (error) {
            console.warn('Token verification warning:', error.message)
            // Don't logout here, let the user continue with the session
          }
        } catch (error) {
          console.error('Error during auth initialization:', error)
          // Don't immediately logout on init error
        }
      }
    },

    // Set secure cookies with proper options
    setAuthCookies(token, user, sessionId) {
      try {
        // Set cookies in a specific order and verify each one
        Cookies.set(TOKEN_COOKIE, token, COOKIE_OPTIONS);
        if (!Cookies.get(TOKEN_COOKIE)) {
          throw new Error('Failed to set token cookie');
        }

        // Set session cookie only if provided (backend may not return sessionId)
        if (typeof sessionId !== 'undefined' && sessionId !== null) {
          Cookies.set(SESSION_COOKIE, sessionId, COOKIE_OPTIONS);
          if (!Cookies.get(SESSION_COOKIE)) {
            throw new Error('Failed to set session cookie');
          }
        }

        const userStr = JSON.stringify(user);
        Cookies.set(USER_COOKIE, userStr, COOKIE_OPTIONS);
        if (!Cookies.get(USER_COOKIE)) {
          throw new Error('Failed to set user cookie');
        }

        // Additional security check
        const storedUser = JSON.parse(Cookies.get(USER_COOKIE));
        if (!storedUser || storedUser.email !== user.email) {
          throw new Error('User cookie verification failed');
        }
      } catch (error) {
        console.error('Error setting auth cookies:', error);
        // Cleanup in case of partial cookie setting
        this.clearAuthCookies();
        throw error;
      }
    },

    // Clear all auth cookies
    clearAuthCookies() {
      // Definisikan opsi untuk penghapusan cookie
      const removalOptions = {
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? process.env.VITE_COOKIE_DOMAIN : undefined,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      };
      
      // Hapus setiap cookie dengan menggunakan opsi yang sama dengan saat pembuatan
      Cookies.remove(TOKEN_COOKIE, removalOptions);
      Cookies.remove(USER_COOKIE, removalOptions);
      Cookies.remove(SESSION_COOKIE, removalOptions);
      
      // Untuk kompatibilitas dengan kode lama, hapus juga cookie 'auth' jika ada
      Cookies.remove('auth', removalOptions);
      
      // Verifikasi penghapusan
      if (Cookies.get(TOKEN_COOKIE) || Cookies.get(USER_COOKIE) || Cookies.get(SESSION_COOKIE)) {
        console.warn('Some cookies could not be removed. Trying alternative method...');
        
        // Alternatif: coba hapus tanpa opsi
        Cookies.remove(TOKEN_COOKIE);
        Cookies.remove(USER_COOKIE);
        Cookies.remove(SESSION_COOKIE);
      }
    },

    // Register new user
    async register(userData) {
      this.loading = true
      this.error = null
      
      try {
        console.log('Attempting registration with:', { 
          nama: userData.name, 
          email: userData.email 
        })
        
        const response = await axios.post('/auth/register', {
          nama: userData.name,
          email: userData.email,
          password_hash: userData.password
        })
        
        console.log('Registration response:', response.data)
        
        if (response.data.success) {
          return { success: true, message: response.data.message }
        } else {
          throw new Error(response.data.message || 'Registration failed')
        }
      } catch (error) {
        console.error('Registration error:', error)
        this.error = error.response?.data?.message || error.message || 'Registration failed'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    // Login user with enhanced session handling
    async login(credentials) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.post('/auth/login', {
          email: credentials.email,
          password_hash: credentials.password,
          deviceInfo: {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language
          }
        })
        
        if (response.data.success && response.data.token) {
            const { token } = response.data
            // Fallback sessionId if backend didn't provide one
            const sessionId = response.data.sessionId || String(Date.now())

            // Parse token for user claims
            const decoded = parseJWT(token) || {}
            const user = {
              id: decoded.id || null,
              email: decoded.email || credentials.email,
              name: decoded.email ? (decoded.email.split('@')[0]) : credentials.email.split('@')[0],
              lastLogin: new Date().toISOString(),
              is_verified: typeof decoded.is_verified !== 'undefined' ? decoded.is_verified : 1,
              is_verified_nip: typeof decoded.is_verified_nip !== 'undefined' ? decoded.is_verified_nip : 0
            }

            // Store in state
            this.token = token
            this.user = user
            this.sessionId = sessionId
            this.isAuthenticated = true

            // Store in secure cookies
            this.setAuthCookies(token, user, sessionId)

            // Set axios default headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            axios.defaults.headers.common['Session-Id'] = sessionId

            return response.data
        } else {
          throw new Error(response.data.message || 'Login failed')
        }
      } catch (error) {
        console.error('Login error occurred')
        this.error = error.response?.data?.message || error.message || 'Login failed'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    // Logout user with session cleanup
    async logout() {
      try {
        // Call backend to invalidate session if session exists
        if (this.sessionId) {
          try {
            // Set timeout to avoid hanging if server doesn't respond
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            
            await axios.post('/auth/logout', {
              sessionId: this.sessionId
            }, { signal: controller.signal });
            
            clearTimeout(timeoutId);
          } catch (apiError) {
            console.error('API logout error:', apiError);
            // Continue with client-side logout even if API call fails
          }
        }
      } catch (error) {
        console.error('Logout error:', error)
      } finally {
        // Clear cookies first - most important for ensuring session ends
        this.clearAuthCookies()
        
        // Clear state after cookies
        this.token = null
        this.user = null
        this.sessionId = null
        this.isAuthenticated = false
        this.error = null
        
        // Remove axios default headers
        delete axios.defaults.headers.common['Authorization']
        delete axios.defaults.headers.common['Session-Id']
        
        // Return promise to allow awaiting completion
        return Promise.resolve();
      }
    },

    // Check if token and session are valid
    async checkAuth() {
      if (!this.token || !this.sessionId) {
        return false
      }
      
      try {
        const response = await axios.post('/auth/verify', {
          sessionId: this.sessionId,
          deviceInfo: {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language
          }
        })
        
        if (response.data.success && response.data.user) {
          // Update user data and session if needed
          this.user = response.data.user
          if (response.data.newToken) {
            this.token = response.data.newToken
            this.setAuthCookies(this.token, this.user, this.sessionId)
            axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
          }
          this.isAuthenticated = true
          return true
        } else {
          throw new Error('Invalid session')
        }
      } catch (error) {
        console.error('Session verification failed:', error)
        // Session/token is invalid, logout
        await this.logout()
        return false
      }
    },

    // Update user profile
    async updateProfile(userData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.put('/profile', userData)
        
        // Update user in state and cookies
        const updatedUser = response.data.user
        this.user = updatedUser

        // Update cookies while preserving session
        const currentToken = Cookies.get(TOKEN_COOKIE)
        const currentSessionId = Cookies.get(SESSION_COOKIE)
        
        if (currentToken && currentSessionId) {
          this.setAuthCookies(currentToken, updatedUser, currentSessionId)
        } else {
          throw new Error('Session expired during profile update')
        }
        
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Profile update failed'
        
        // If session related error, force logout
        if (error.message.includes('Session expired')) {
          await this.logout()
        }
        
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    // Change password
    async changePassword(passwordData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.put('/change-password', {
          oldPassword: passwordData.oldPassword,
          newPassword: passwordData.newPassword
        })
        
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Password change failed'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    // Ini akan dihapus karena merupakan duplikat dari initAuth() yang ada di atas
  }
})
