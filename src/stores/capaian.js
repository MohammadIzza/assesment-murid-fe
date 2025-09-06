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
    /**
     * Mengambil daftar capaian berdasarkan sub elemen
     */
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
    },

    /**
     * Mengambil daftar capaian berdasarkan kelas
     */
    async fetchCapaianByKelasId(id_kelas) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(`/list/capaian/kelas/${id_kelas}`)
        
        if (response.data.success) {
          return response.data.data
        } else {
          throw new Error('Gagal mengambil data capaian kelas')
        }
      } catch (error) {
        console.error('Error fetching capaian kelas:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil data capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Menambahkan capaian kelas baru
     */
    async createCapaian(capaianData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.post('/add/capaian', capaianData)
        
        if (response.data.success) {
          return response.data.data
        } else {
          throw new Error(response.data.message || 'Gagal menambahkan capaian kelas')
        }
      } catch (error) {
        console.error('Error creating capaian:', error)
        this.error = error.message || 'Terjadi kesalahan saat menambahkan capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengupdate data capaian kelas
     */
    async updateCapaian(capaianData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.put(`/edit/capaian/${capaianData.id}`, capaianData)
        
        if (response.data.success) {
          return response.data.data
        } else {
          throw new Error(response.data.message || 'Gagal mengupdate capaian kelas')
        }
      } catch (error) {
        console.error('Error updating capaian:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengupdate capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Menghapus capaian kelas
     */
    async deleteCapaian(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.delete(`/delete/capaian/${id}`)
        
        if (response.data.success) {
          return true
        } else {
          throw new Error(response.data.message || 'Gagal menghapus capaian kelas')
        }
      } catch (error) {
        console.error('Error deleting capaian:', error)
        this.error = error.message || 'Terjadi kesalahan saat menghapus capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})