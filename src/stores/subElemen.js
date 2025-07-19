import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useSubElemenStore = defineStore('subElemen', {
  state: () => ({
    subElemenList: [],
    currentSubElemen: null,
    loading: false,
    error: null
  }),

  getters: {
    getSubElemenList: (state) => state.subElemenList,
    getCurrentSubElemen: (state) => state.currentSubElemen,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    async fetchSubElemenByElemen(id_elemen) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(`/list/sub_elemen?id_elemen=${id_elemen}`)
        
        if (response.data.success) {
          this.subElemenList = response.data.data
        } else {
          throw new Error('Gagal mengambil data sub elemen')
        }
      } catch (error) {
        console.error('Error fetching sub elemen list:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil data sub elemen'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})