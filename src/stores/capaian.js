import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useCapaianStore = defineStore('capaian', {
  state: () => ({
    capaianList: [],
    currentCapaian: null,
    loading: false,
    error: null
  }),

  getters: {
    getCapaianList: (state) => state.capaianList,
    getCurrentCapaian: (state) => state.currentCapaian,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    async fetchCapaianBySubElemen(id_sub_elemen) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(`/list/capaian?id_sub_elemen=${id_sub_elemen}`)
        
        if (response.data.success) {
          this.capaianList = response.data.data
        } else {
          throw new Error('Gagal mengambil data capaian')
        }
      } catch (error) {
        console.error('Error fetching capaian list:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil data capaian'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})