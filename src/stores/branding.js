import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useBrandingStore = defineStore('branding', {
  state: () => ({
    logoObjectUrl: null,
    loading: false,
    error: null,
    lastUpdatedAt: null,
  }),
  getters: {
    hasLogo: (state) => !!state.logoObjectUrl,
  },
  actions: {
    _revokeUrl() {
      try {
        if (this.logoObjectUrl) URL.revokeObjectURL(this.logoObjectUrl)
      } catch (e) {
        // ignore
      }
    },

    clearLogo() {
      this._revokeUrl()
      this.logoObjectUrl = null
      this.lastUpdatedAt = Date.now()
    },

    setLogoFromBlob(blob) {
      this._revokeUrl()
      const url = URL.createObjectURL(blob)
      this.logoObjectUrl = url
      this.lastUpdatedAt = Date.now()
    },

    async refreshLogoForCurrentUser(userId) {
      if (!userId) {
        this.clearLogo()
        return null
      }
      this.loading = true
      this.error = null
      try {
        // ✅ GURU: Cek apakah user adalah guru atau admin
        const { useAuthStore } = await import('./auth')
        const authStore = useAuthStore()
        
        if (authStore.isAdmin) {
          // Admin: gunakan endpoint yang sudah ada
          const res = await axios.get(`/upload/user/${userId}/logo`, { responseType: 'blob' })
          if (res && res.status >= 200 && res.status < 300) {
            this.setLogoFromBlob(res.data)
            return this.logoObjectUrl
          }
        } else {
          // ✅ GURU: Ambil logo sekolah melalui guru.id_sekolah
          const { useGuruStore } = await import('./guru')
          const guruStore = useGuruStore()
          const currentGuru = guruStore.getCurrentGuru
          
          if (currentGuru?.id_sekolah) {
            // ✅ GURU: Gunakan endpoint /sekolah/:id/logo
            const res = await axios.get(`/upload/sekolah/${currentGuru.id_sekolah}/logo`, { responseType: 'blob' })
            if (res && res.status >= 200 && res.status < 300) {
              this.setLogoFromBlob(res.data)
              return this.logoObjectUrl
            }
          }
        }
        
        this.clearLogo()
        return null
      } catch (err) {
        // 404 means no logo yet
        if (err?.response?.status === 404) {
          this.clearLogo()
          return null
        }
        this.error = err?.message || 'Failed to load logo'
        return null
      } finally {
        this.loading = false
      }
    },
  },
})
