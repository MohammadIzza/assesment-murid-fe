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
    }
  }
}) 