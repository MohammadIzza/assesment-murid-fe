import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
    getUser: (state) => state.user,
    getToken: (state) => state.token
  },

  actions: {
    // Initialize auth state from localStorage
    initAuth() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      
      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
        this.isAuthenticated = true
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
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

    // Login user
    async login(credentials) {
      this.loading = true
      this.error = null
      
      try {
        console.log('Attempting login with:', { email: credentials.email })
        
        const response = await axios.post('/auth/login', {
          email: credentials.email,
          password_hash: credentials.password
        })
        
        console.log('Login response:', response.data)
        
        if (response.data.success && response.data.token) {
          const token = response.data.token
          
          // Store in state
          this.token = token
          this.user = { 
            name: credentials.email.split('@')[0], 
            email: credentials.email 
          }
          this.isAuthenticated = true
          
          // Store in localStorage
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(this.user))
          
          // Set axios default header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          
          console.log('Login successful, token saved:', token)
          return response.data
        } else {
          throw new Error(response.data.message || 'Login failed')
        }
      } catch (error) {
        console.error('Login error:', error)
        this.error = error.response?.data?.message || error.message || 'Login failed'
        throw new Error(this.error)
      } finally {
        this.loading = false
      }
    },

    // Logout user
    logout() {
      // Clear state
      this.token = null
      this.user = null
      this.isAuthenticated = false
      this.error = null
      
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Remove axios default header
      delete axios.defaults.headers.common['Authorization']
    },

    // Check if token is valid
    async checkAuth() {
      if (!this.token) {
        return false
      }
      
      try {
        const response = await axios.get('/auth/me')
        
        if (response.data.success && response.data.user) {
          this.user = response.data.user
          this.isAuthenticated = true
          return true
        } else {
          throw new Error('Invalid token')
        }
      } catch (error) {
        console.error('Token verification failed:', error)
        // Token is invalid, logout
        this.logout()
        return false
      }
    },

    // Update user profile
    async updateProfile(userData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.put('/profile', userData)
        
        // Update user in state and localStorage
        this.user = response.data.user
        localStorage.setItem('user', JSON.stringify(this.user))
        
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Profile update failed'
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
    }
  }
})
