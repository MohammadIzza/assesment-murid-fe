import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useSekolahScopeStore = defineStore('sekolahScope', {
  state: () => ({
    activeSekolahId: null,
    activeSekolahName: null,
    loading: false,
    lastError: '',
  }),
  getters: {
    hasActive(state) {
      return !!state.activeSekolahId
    },
  },
  actions: {
    async initFromAuth(authStore) {
      try {
        const id = parseInt(authStore?.user?.idSekolah) || null
        if (id && id !== this.activeSekolahId) {
          this.activeSekolahId = id
          await this.refreshActiveSekolahName()
        }
      } catch (e) {
        // swallow
      }
    },
    async setActiveSekolah(id, name = null) {
      this.activeSekolahId = id || null
      if (name) {
        this.activeSekolahName = name
      } else if (id) {
        await this.refreshActiveSekolahName()
      } else {
        this.activeSekolahName = null
      }
    },
    async refreshActiveSekolahName() {
      this.lastError = ''
      if (!this.activeSekolahId) {
        this.activeSekolahName = null
        return
      }
      this.loading = true
      try {
        const res = await axios.get(`/view/sekolah/${this.activeSekolahId}`)
        const data = res?.data?.data || {}
        this.activeSekolahName = data.nama_sekolah || data.nama || null
      } catch (e) {
        this.lastError = e?.response?.data?.message || e?.message || 'Gagal memuat nama sekolah'
        // Keep previous name if any
      } finally {
        this.loading = false
      }
    },
  },
})
