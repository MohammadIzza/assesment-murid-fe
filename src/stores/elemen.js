import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useElemenStore = defineStore('elemen', {
  state: () => ({
    elemenList: [],
    currentElemen: null,
    loading: false,
    error: null
  }),

  getters: {
    getElemenList: (state) => state.elemenList,
    getCurrentElemen: (state) => state.currentElemen,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    async fetchElemenByDimensi(id_dimensi) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(`/list/elemen?id_dimensi=${id_dimensi}`)
        
        if (response.data.success) {
          this.elemenList = response.data.data
        } else {
          throw new Error('Gagal mengambil data elemen')
        }
      } catch (error) {
        console.error('Error fetching elemen list:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil data elemen'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})