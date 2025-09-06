import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useCapaianKelasStore = defineStore('capaianKelas', {
  state: () => ({
    capaianKelasList: [],
    currentCapaianKelas: null,
    loading: false,
    error: null
  }),

  getters: {
    getCapaianKelasList: (state) => state.capaianKelasList,
    getCurrentCapaianKelas: (state) => state.currentCapaianKelas,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    /**
     * Mengambil daftar capaian kelas
     */
    async fetchCapaianKelasList() {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get('/list/capaian_kelas')
        
        if (response.data.success) {
          this.capaianKelasList = response.data.data
        } else {
          throw new Error('Gagal mengambil data capaian kelas')
        }
      } catch (error) {
        console.error('Error fetching capaian kelas list:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil data capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengambil detail capaian kelas berdasarkan ID
     * @param {number} id - ID capaian kelas
     */
    async fetchCapaianKelasDetail(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(`/view/capaian_kelas/${id}`)
        
        if (response.data.success) {
          this.currentCapaianKelas = response.data.data
        } else {
          throw new Error('Gagal mengambil detail capaian kelas')
        }
      } catch (error) {
        console.error('Error fetching capaian kelas detail:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil detail capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Menambahkan capaian kelas baru
     * @param {Object} capaianKelasData - Data capaian kelas
     */
    async addCapaianKelas(capaianKelasData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.post('/add/capaian_kelas', capaianKelasData)
        
        if (response.data.success) {
          // Refresh list setelah berhasil menambah
          await this.fetchCapaianKelasList()
          return response.data
        } else {
          throw new Error(response.data.message || 'Gagal menambahkan capaian kelas')
        }
      } catch (error) {
        console.error('Error adding capaian kelas:', error)
        this.error = error.message || 'Terjadi kesalahan saat menambahkan capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengupdate capaian kelas
     * @param {number} id - ID capaian kelas
     * @param {Object} capaianKelasData - Data capaian kelas yang diupdate
     */
    async updateCapaianKelas(id, capaianKelasData) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.put(`/update/capaian_kelas/${id}`, capaianKelasData)
        
        if (response.data.success) {
          // Update current capaian kelas jika sedang melihat detail
          if (this.currentCapaianKelas && this.currentCapaianKelas.id === id) {
            this.currentCapaianKelas = { ...this.currentCapaianKelas, ...capaianKelasData }
          }
          // Refresh list
          await this.fetchCapaianKelasList()
          return response.data
        } else {
          throw new Error(response.data.message || 'Gagal mengupdate capaian kelas')
        }
      } catch (error) {
        console.error('Error updating capaian kelas:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengupdate capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Menghapus capaian kelas
     * @param {number} id - ID capaian kelas
     */
    async deleteCapaianKelas(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.delete(`/delete/capaian_kelas/${id}`)
        
        if (response.data.success) {
          // Remove from list
          this.capaianKelasList = this.capaianKelasList.filter(item => item.id !== id)
          // Clear current jika yang dihapus sedang dilihat
          if (this.currentCapaianKelas && this.currentCapaianKelas.id === id) {
            this.currentCapaianKelas = null
          }
          return response.data
        } else {
          throw new Error(response.data.message || 'Gagal menghapus capaian kelas')
        }
      } catch (error) {
        console.error('Error deleting capaian kelas:', error)
        this.error = error.message || 'Terjadi kesalahan saat menghapus capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Menyalin capaian kelas
     * @param {number} id - ID capaian kelas yang akan disalin
     */
    async copyCapaianKelas(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.post(`/copy/capaian_kelas/${id}`)
        
        if (response.data.success) {
          // Refresh list setelah berhasil menyalin
          await this.fetchCapaianKelasList()
          return response.data
        } else {
          throw new Error(response.data.message || 'Gagal menyalin capaian kelas')
        }
      } catch (error) {
        console.error('Error copying capaian kelas:', error)
        this.error = error.message || 'Terjadi kesalahan saat menyalin capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Membersihkan data currentCapaianKelas
     */
    clearCurrentCapaianKelas() {
      this.currentCapaianKelas = null
    },

    /**
     * Membersihkan error
     */
    clearError() {
      this.error = null
    }
  }
})
