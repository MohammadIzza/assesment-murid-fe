/**
 * File: stores/siswa.js
 * Deskripsi: Store Pinia untuk mengelola data siswa
 * Fungsi: Menyimpan state dan actions untuk operasi CRUD siswa
 */

import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useSiswaStore = defineStore('siswa', {
  state: () => ({
    // State untuk menyimpan daftar siswa
    siswaList: [],
    // State untuk menyimpan detail siswa yang sedang dilihat
    currentSiswa: null,
    // State untuk loading
    loading: false,
    // State untuk error
    error: null
  }),

  getters: {
    // Getter untuk mendapatkan daftar siswa
    getSiswaList: (state) => state.siswaList,
    // Getter untuk mendapatkan detail siswa
    getCurrentSiswa: (state) => state.currentSiswa,
    // Getter untuk status loading
    isLoading: (state) => state.loading,
    // Getter untuk error
    getError: (state) => state.error
  },

  actions: {
    /**
     * Mengambil daftar siswa dengan filter dari API
     * @param {object} filters - Object berisi filter yang akan diterapkan
     */
    async fetchSiswaListWithFilters(filters = {}) {
      this.loading = true
      this.error = null
      
      try {
        // Buat query parameters dari filters
        const params = new URLSearchParams()
        
        if (filters.search) params.append('search', filters.search)
        if (filters.id_sekolah) params.append('id_sekolah', filters.id_sekolah)
        if (filters.id_kelas) params.append('id_kelas', filters.id_kelas)
        if (filters.status) params.append('status', filters.status)
        if (filters.nisn) params.append('nisn', filters.nisn)
        if (filters.sort_by) params.append('sort_by', filters.sort_by)
        if (filters.sort_order) params.append('sort_order', filters.sort_order)
        
        const queryString = params.toString()
        const url = queryString ? `/list/siswa?${queryString}` : '/list/siswa'
        
        const response = await axios.get(url)
        
        if (response.data.success) {
          this.siswaList = response.data.data
        } else {
          throw new Error('Gagal mengambil data siswa dengan filter')
        }
      } catch (error) {
        // Jika endpoint tidak mendukung filter, fallback ke method biasa
        if (error.response?.status === 404 || error.response?.status === 500) {
          await this.fetchSiswaList()
        } else {
          this.error = error.message || 'Terjadi kesalahan saat mengambil data siswa'
          throw error
        }
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengambil daftar semua siswa dari API
     */
    async fetchSiswaList() {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get('/list/siswa')
        
        if (response.data.success) {
          this.siswaList = response.data.data
        } else {
          throw new Error('Gagal mengambil data siswa')
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat mengambil data siswa'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengambil detail siswa berdasarkan ID
     * @param {number} id_siswa - ID siswa yang akan diambil detailnya
     */
    async fetchSiswaDetail(id_siswa) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(`/view/siswa/${id_siswa}`)
        
        if (response.data.success) {
          this.currentSiswa = response.data.data
        } else {
          throw new Error('Gagal mengambil detail siswa')
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat mengambil detail siswa'
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
     * Membersihkan data siswa yang sedang dilihat
     */
    clearCurrentSiswa() {
      this.currentSiswa = null
    },

    /**
     * Tambah siswa baru
     * @param {object} siswaData - Data siswa yang akan ditambahkan
     */
    async addSiswa(siswaData) {
      this.loading = true
      this.error = null
      
      try {
        
        const response = await axios.post('/add/siswa', siswaData)
        
        
        if (response.data.success) {
          // Reload siswa list untuk mendapatkan data terbaru
          await this.fetchSiswaList()
          
          return response.data
        } else {
          throw new Error(response.data.message || 'Gagal menambahkan siswa')
        }
      } catch (error) {
        
        this.error = error.response?.data?.message || error.message || 'Terjadi kesalahan saat menambahkan siswa'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Update data siswa
     * @param {number} id_siswa - ID siswa yang akan diupdate
     * @param {object} siswaData - Data siswa yang akan diupdate
     */
    async updateSiswa(id_siswa, siswaData) {
      this.loading = true
      this.error = null
      
      try {
        
        const response = await axios.put(`/update/siswa/${id_siswa}`, siswaData)
        
        
        if (response.data.success) {
          // Update current siswa jika sedang melihat detail siswa yang diupdate
          if (this.currentSiswa && this.currentSiswa.id_siswa === id_siswa) {
            this.currentSiswa = { ...this.currentSiswa, ...siswaData }
          }
          
          // Reload siswa list untuk mendapatkan data terbaru
          await this.fetchSiswaList()
          
          return response.data
        } else {
          throw new Error(response.data.message || 'Gagal mengupdate siswa')
        }
      } catch (error) {
        
        this.error = error.response?.data?.message || error.message || 'Terjadi kesalahan saat mengupdate siswa'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Hapus siswa
     * @param {number} id_siswa - ID siswa yang akan dihapus
     */
    async deleteSiswa(id_siswa) {
      this.loading = true
      this.error = null
      
      try {
        
        const response = await axios.delete(`/delete/siswa/${id_siswa}`)
        
        
        if (response.data.success) {
          // Remove siswa from list
          this.siswaList = this.siswaList.filter(siswa => siswa.id_siswa !== id_siswa)
          
          // Clear current siswa if it's the one being deleted
          if (this.currentSiswa && this.currentSiswa.id_siswa === id_siswa) {
            this.currentSiswa = null
          }
          
          return response.data
        } else {
          throw new Error(response.data.message || 'Gagal menghapus siswa')
        }
      } catch (error) {
        
        this.error = error.response?.data?.message || error.message || 'Terjadi kesalahan saat menghapus siswa'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Generic operation untuk operasi yang memerlukan endpoint khusus
     * @param {string} endpoint - Endpoint yang akan dipanggil
     */
    async genericOperation(endpoint) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(endpoint)
        
        if (response.data.success) {
          return response.data
        } else {
          throw new Error('Operasi gagal')
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan dalam operasi'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengambil daftar siswa berdasarkan kelas
     * @param {number} id_kelas - ID kelas untuk filter siswa
     */
    async fetchSiswaByKelas(id_kelas) {
      this.loading = true
      this.error = null
      
      try {
        // Ambil semua siswa dan filter berdasarkan id_kelas
        const response = await axios.get(`/list/siswa`)
        
        if (response.data.success) {
          // Filter siswa berdasarkan id_kelas
          const siswaInKelas = response.data.data.filter(siswa => siswa.id_kelas === id_kelas)
          this.siswaList = siswaInKelas
        } else {
          throw new Error('Gagal mengambil data siswa berdasarkan kelas')
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat mengambil data siswa'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})

