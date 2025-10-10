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
        const res = await axios.get(`/upload/user/${userId}/logo`, { responseType: 'blob' })
        if (res && res.status >= 200 && res.status < 300) {
          this.setLogoFromBlob(res.data)
          return this.logoObjectUrl
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
