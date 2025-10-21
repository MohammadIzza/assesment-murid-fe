import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import { parseJWT } from '@/utils/jwt'
import Cookies from 'js-cookie'
import { useGuruStore } from '@/stores/guru'

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
      // Silent error handling
    }

  const token = Cookies.get(TOKEN_COOKIE);
  const sessionId = Cookies.get(SESSION_COOKIE);
  const isAuthenticated = !!token && !!user && !!sessionId;

    const userRole = user?.id_role ? parseInt(user.id_role) : 0;
    
    
    return {
      user,
      token: token || null,
      sessionId: sessionId || null,
      isAuthenticated: isAuthenticated,
      loading: false,
      error: null,
      userRole: userRole // 1 untuk admin, 2 untuk guru, 0 untuk belum diketahui
    }
  },

  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isAdmin: (state) => {
      const stateUserRole = parseInt(state.userRole) || 0;
      const userIdRole = parseInt(state.user?.id_role) || 0;
      
      const isAdminRole = stateUserRole === 1 || userIdRole === 1;
      
      return isAdminRole;
    },
    isGuru: (state) => {
      const stateUserRole = parseInt(state.userRole) || 0;
      const userIdRole = parseInt(state.user?.id_role) || 0;
      return stateUserRole === 2 || userIdRole === 2;
    },
    getUserRole: (state) => parseInt(state.userRole) || 0
  },

  actions: {
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
              is_verified_nip: typeof decoded.is_verified_nip !== 'undefined' ? decoded.is_verified_nip : this.user?.is_verified_nip,
              id_role: typeof decoded.id_role !== 'undefined' ? parseInt(decoded.id_role) : parseInt(this.user?.id_role) || 0
            })
            
            // Update userRole state from user object - ensure it's parsed as integer
            this.userRole = parseInt(this.user.id_role) || 0
            
          } catch (e) {
            // ignore parse errors
            // Silent error handling
          }
          
          const isAdmin = this.isAdmin
          
          // Fetch fresh user data from API to ensure we have correct role information
          if (this.user && this.user.id) {
            await this.fetchUserInfo(this.user.id)
            
            const isAdminAfterFetch = this.isAdmin
          }
          

          try {
            const guruStore = useGuruStore()
            await guruStore.fetchCurrentGuruFromToken()
          } catch (e) {
          }
        } catch (error) {
        }
      } else {
      }
    },

    setAuthCookies(token, user, sessionId) {
      try {
        Cookies.set(TOKEN_COOKIE, token, COOKIE_OPTIONS);
        if (!Cookies.get(TOKEN_COOKIE)) {
          throw new Error('Failed to set token cookie');
        }

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
        this.clearAuthCookies();
        throw error;
      }
    },

    clearAuthCookies() {
      const removalOptions = {
        path: '/',
        domain: process.env.NODE_ENV === 'production' ? process.env.VITE_COOKIE_DOMAIN : undefined,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      };
      
      Cookies.remove(TOKEN_COOKIE, removalOptions);
      Cookies.remove(USER_COOKIE, removalOptions);
      Cookies.remove(SESSION_COOKIE, removalOptions);
      
      Cookies.remove('auth', removalOptions);
      
      if (Cookies.get(TOKEN_COOKIE) || Cookies.get(USER_COOKIE) || Cookies.get(SESSION_COOKIE)) {
        
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
        
        const response = await axios.post('/auth/register', {
          nama: userData.name,
          email: userData.email,
          password_hash: userData.password
        })
        
        
        if (response.data.success) {
          return { success: true, message: response.data.message }
        } else {
          throw new Error(response.data.message || 'Registration failed')
        }
      } catch (error) {
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
            
            // Extract user ID from token if available
            const userId = decoded.id || null
            
            // Parse id_role explicitly as integer and log it
            const idRole = typeof decoded.id_role !== 'undefined' ? parseInt(decoded.id_role) : 2
            
            // Create initial user object from token claims
            const user = {
              id: userId,
              email: decoded.email || credentials.email,
              name: decoded.email ? (decoded.email.split('@')[0]) : credentials.email.split('@')[0],
              lastLogin: new Date().toISOString(),
              is_verified: typeof decoded.is_verified !== 'undefined' ? decoded.is_verified : 1,
              is_verified_nip: typeof decoded.is_verified_nip !== 'undefined' ? decoded.is_verified_nip : 0,
              id_role: idRole // Ensure it's stored as integer
            }
            

            // Store in state
            this.token = token
            this.user = user
            this.sessionId = sessionId
            this.isAuthenticated = true
            this.userRole = idRole
            
            // Force check the admin status immediately and log result
            const isAdmin = this.userRole === 1 || user.id_role === 1
            
            // Fetch complete user data from API to ensure we have correct role information
            if (userId) {
              try {
                await this.fetchUserInfo(userId)
                
                // Check admin status again after API fetch
              } catch (e) {
                // Non-fatal, continue with login
              }
            } else {
            }

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
            // Continue with client-side logout even if API call fails
          }
        }
      } catch (error) {
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
        // No server-side verify endpoint; consider the presence of token+session as valid
        this.isAuthenticated = !!this.token && !!this.sessionId
        
        // If authenticated, fetch current user data to ensure we have current role
        if (this.isAuthenticated && this.user?.id) {
          await this.fetchUserInfo(this.user.id)
        }
        
        return this.isAuthenticated
      } catch (error) {
        // Session/token is invalid, logout
        await this.logout()
        return false
      }
    },
    
    // Fetch user information by ID to get current role
    async fetchUserInfo(userId) {
      try {
        const response = await axios.get(`/view/users/${userId}`)
        
        if (response.data && response.data.success) {
          const userData = response.data.data
          
          // Update user data and role
          if (userData) {
            // Important: Make sure we store id_user from API as the user's id in our app state
            const userId = userData.id_user || this.user?.id || null
            
            // Parse and log id_role from API response
            let idRole = 0;
            if (userData.id_role !== undefined && userData.id_role !== null) {
              idRole = parseInt(userData.id_role);
            } else {
            }

            // Capture admin's school scope if provided by backend (users.idSekolah)
            let idSekolah = null;
            if (userData.idSekolah !== undefined && userData.idSekolah !== null) {
              const parsed = parseInt(userData.idSekolah);
              idSekolah = Number.isNaN(parsed) ? null : parsed;
            }
            
            // Update user object with the latest data
            this.user = {
              ...this.user,
              id: userId,
              email: userData.email || this.user?.email || null,
              is_verified: userData.is_verified || this.user?.is_verified || 0,
              is_verified_nip: userData.is_verified_nip || this.user?.is_verified_nip || 0,
              id_role: idRole, // Store as integer
              name: this.user?.name || (userData.email ? userData.email.split('@')[0] : 'User'),
              idSekolah: idSekolah
            }
            
            // Update userRole in state
            this.userRole = idRole
            
            
            // Update user cookie with the latest data
            const userStr = JSON.stringify(this.user)
            Cookies.set(USER_COOKIE, userStr, COOKIE_OPTIONS)
            
            // Test isAdmin getter and verify consistency
            const directAdminCheck = this.userRole === 1
            const getterAdminCheck = this.isAdmin
            
            if (directAdminCheck !== getterAdminCheck) {
            }
          }
          return true
        } else {
        }
        return false
      } catch (error) {
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
