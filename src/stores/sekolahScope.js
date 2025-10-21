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
        // ✅ GURU: Ambil id_sekolah dari guru data atau user data
        let id = null
        
        if (authStore?.user?.idSekolah) {
          // Admin: langsung ambil dari user
          id = parseInt(authStore.user.idSekolah)
        } else {
          // ✅ GURU: Ambil dari guru data
          try {
            const { useGuruStore } = await import('./guru')
            const guruStore = useGuruStore()
            
            // ✅ GURU: Pastikan guru data sudah dimuat
            if (!guruStore.getCurrentGuru) {
              await guruStore.fetchCurrentGuruFromToken()
            }
            
            const currentGuru = guruStore.getCurrentGuru
            if (currentGuru?.id_sekolah) {
              id = parseInt(currentGuru.id_sekolah)
            }
          } catch (e) {
            // Fallback: coba ambil dari user data jika ada
            id = parseInt(authStore?.user?.idSekolah) || null
          }
        }
        
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
