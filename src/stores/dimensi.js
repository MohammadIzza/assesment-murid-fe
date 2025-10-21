import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useDimensiStore = defineStore('dimensi', {
  state: () => ({
    dimensiList: [],
    currentDimensi: null,
    loading: false,
    error: null
  }),

  getters: {
    getDimensiList: (state) => state.dimensiList,
    getCurrentDimensi: (state) => state.currentDimensi,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    async fetchDimensiList() {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get('/list/dimensi')
        
        if (response.data.success) {
          this.dimensiList = response.data.data
        } else {
          throw new Error('Gagal mengambil data dimensi')
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat mengambil data dimensi'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})