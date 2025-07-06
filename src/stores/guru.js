/**
 * File: stores/guru.js
 * Deskripsi: Store Pinia untuk mengelola data guru
 * Fungsi: Menyimpan state dan actions untuk operasi CRUD guru
 */

import { defineStore } from 'pinia'
import { axiosInstance } from '@/plugins/axios'

export const useGuruStore = defineStore('guru', {
  state: () => ({
    // State untuk menyimpan daftar guru
    guruList: [],
    // State untuk menyimpan detail guru yang sedang dilihat
    currentGuru: null,
    // State untuk loading
    loading: false,
    // State untuk error
    error: null
  }),

  getters: {
    // Getter untuk mendapatkan daftar guru
    getGuruList: (state) => state.guruList,
    // Getter untuk mendapatkan detail guru
    getCurrentGuru: (state) => state.currentGuru,
    // Getter untuk status loading
    isLoading: (state) => state.loading,
    // Getter untuk error
    getError: (state) => state.error
  },

  actions: {
    /**
     * Mengambil daftar guru dengan filter dari API
     * @param {object} filters - Object berisi filter yang akan diterapkan
     */
    async fetchGuruListWithFilters(filters = {}) {
      this.loading = true
      this.error = null
      
      try {
        // Buat query parameters dari filters
        const params = new URLSearchParams()
        
        if (filters.search) params.append('search', filters.search)
        if (filters.sekolah) params.append('id_sekolah', filters.sekolah)
        if (filters.role) params.append('id_role', filters.role)
        if (filters.status) params.append('status', filters.status)
        if (filters.nip) params.append('nip', filters.nip)
        if (filters.email) params.append('email', filters.email)
        if (filters.sort_by) params.append('sort_by', filters.sort_by)
        if (filters.sort_order) params.append('sort_order', filters.sort_order)
        
        const queryString = params.toString()
        const url = queryString ? `/list/guru?${queryString}` : '/list/guru'
        
        const response = await axiosInstance.get(url)
        
        if (response.data.success) {
          this.guruList = response.data.data
        } else {
          throw new Error('Gagal mengambil data guru dengan filter')
        }
      } catch (error) {
        console.error('Error fetching filtered guru list:', error)
        // Jika endpoint tidak mendukung filter, fallback ke method biasa
        if (error.response?.status === 404 || error.response?.status === 500) {
          console.log('API tidak mendukung filter, menggunakan filter frontend...')
          await this.fetchGuruList()
        } else {
          this.error = error.message || 'Terjadi kesalahan saat mengambil data guru'
          throw error
        }
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengambil daftar semua guru dari API
     */
    async fetchGuruList() {
      this.loading = true
      this.error = null
      
      try {
        // Menggunakan base URL yang sesuai dengan API backend
        const response = await axiosInstance.get('/list/guru')
        
        if (response.data.success) {
          this.guruList = response.data.data
        } else {
          throw new Error('Gagal mengambil data guru')
        }
      } catch (error) {
        console.error('Error fetching guru list:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil data guru'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengambil detail guru berdasarkan ID
     * @param {number} id - ID guru yang akan diambil detailnya
     */
    async fetchGuruDetail(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axiosInstance.get(`/view/guru/${id}`)
        
        if (response.data.success) {
          this.currentGuru = response.data.data
        } else {
          throw new Error('Gagal mengambil detail guru')
        }
      } catch (error) {
        console.error('Error fetching guru detail:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil detail guru'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Membersihkan error
     */
    clearError() {
      this.error = null
    },

    /**
     * Membersihkan data guru yang sedang dilihat
     */
    clearCurrentGuru() {
      this.currentGuru = null
    },

    /**
     * Update data guru
     * @param {number} id - ID guru yang akan diupdate
     * @param {object} guruData - Data guru yang akan diupdate
     */
    async updateGuru(id, guruData) {
      this.loading = true
      this.error = null
      
      try {
        console.log('Attempting to update guru with ID:', id)
        console.log('Update URL:', `/update/guru/${id}`)
        console.log('Update data:', guruData)
        
        const response = await axiosInstance.put(`/update/guru/${id}`, guruData)
        
        console.log('Update response:', response)
        console.log('Update response status:', response.status)
        console.log('Update response data:', response.data)
        
        if (response.data.success) {
          // Update guru di list jika ada
          const index = this.guruList.findIndex(guru => guru.id_guru == id)
          if (index !== -1) {
            this.guruList[index] = { ...this.guruList[index], ...guruData }
          }
          
          // Update current guru jika sedang dilihat
          if (this.currentGuru && this.currentGuru.id_guru == id) {
            this.currentGuru = { ...this.currentGuru, ...guruData }
          }
          
          return response.data
        } else {
          throw new Error('Gagal mengupdate data guru')
        }
      } catch (error) {
        console.error('Error updating guru:', error)
        console.error('Update error response:', error.response)
        console.error('Update error response status:', error.response?.status)
        console.error('Update error response data:', error.response?.data)
        
        this.error = error.response?.data?.message || error.message || 'Terjadi kesalahan saat mengupdate guru'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Hapus guru
     * @param {number} id - ID guru yang akan dihapus
     */
    async deleteGuru(id) {
      this.loading = true
      this.error = null
      
      try {
        console.log('Attempting to delete guru with ID:', id)
        
        // List endpoint alternatif untuk dicoba
        const endpoints = [
          { method: 'delete', url: `/delete/guru/${id}`, description: 'DELETE /delete/guru/:id' },
          { method: 'post', url: `/delete/guru/${id}`, description: 'POST /delete/guru/:id' },
          { method: 'post', url: `/guru/delete/${id}`, description: 'POST /guru/delete/:id' },
          { method: 'delete', url: `/guru/${id}`, description: 'DELETE /guru/:id' },
          { method: 'post', url: `/guru/delete`, data: { id_guru: id }, description: 'POST /guru/delete with id_guru in body' },
          { method: 'post', url: `/guru/delete`, data: { id }, description: 'POST /guru/delete with id in body' },
          { method: 'put', url: `/guru/${id}`, data: { _method: 'DELETE' }, description: 'PUT /guru/:id with _method DELETE' },
          { method: 'post', url: `/api/guru/delete/${id}`, description: 'POST /api/guru/delete/:id' }
        ]
        
        let response
        let lastError
        
        for (let i = 0; i < endpoints.length; i++) {
          const endpoint = endpoints[i]
          console.log(`Trying endpoint ${i + 1}/${endpoints.length}: ${endpoint.description}...`)
          
          try {
            if (endpoint.method === 'delete') {
              response = await axiosInstance.delete(endpoint.url)
            } else if (endpoint.method === 'post') {
              response = await axiosInstance.post(endpoint.url, endpoint.data || {})
            } else if (endpoint.method === 'put') {
              response = await axiosInstance.put(endpoint.url, endpoint.data || {})
            }
            
            console.log(`✅ SUCCESS with ${endpoint.description}:`, response.status, response.data)
            break // Jika berhasil, keluar dari loop
            
          } catch (error) {
            console.log(`❌ FAILED with ${endpoint.description}:`, error.response?.status, error.response?.statusText)
            console.log('Error data:', error.response?.data)
            lastError = error
            
            // Jika error 500, 404, atau 405, coba endpoint lain
            if ([500, 404, 405].includes(error.response?.status)) {
              console.log('Continuing to next endpoint...')
              continue
            } else {
              // Error lain yang mungkin tidak bisa diperbaiki dengan ganti endpoint
              console.log('Non-recoverable error, stopping attempts')
              throw error
            }
          }
        }
        
        if (!response) {
          console.error('All endpoints failed. Last error:', lastError)
          throw lastError || new Error('Semua endpoint gagal dicoba')
        }
        
        console.log('Final delete response:', response)
        console.log('Response status:', response.status)
        console.log('Response data:', response.data)
        
        // Cek berbagai format response yang mungkin
        const isSuccess = (response.data?.success !== false && 
                         response.status >= 200 && 
                         response.status < 300) ||
                         response.status === 204 // No Content - common for delete
        
        if (isSuccess) {
          console.log('Delete operation successful, updating local state...')
          
          // Remove guru dari list
          const originalLength = this.guruList.length
          this.guruList = this.guruList.filter(guru => guru.id_guru != id)
          console.log(`Removed guru from list. Original: ${originalLength}, New: ${this.guruList.length}`)
          
          // Clear current guru jika yang dihapus sedang dilihat
          if (this.currentGuru && this.currentGuru.id_guru == id) {
            this.currentGuru = null
            console.log('Cleared current guru')
          }
          
          return response.data || { success: true, message: 'Guru berhasil dihapus' }
        } else {
          throw new Error(response.data?.message || 'Gagal menghapus data guru')
        }
      } catch (error) {
        console.error('❌ FINAL ERROR deleting guru:', error)
        console.error('Error response:', error.response)
        console.error('Error response status:', error.response?.status)
        console.error('Error response data:', error.response?.data)
        console.error('Error message:', error.message)
        
        this.error = error.response?.data?.message || error.message || 'Terjadi kesalahan saat menghapus guru'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})