/**
 * File: stores/skl.js
 * Deskripsi: Store Pinia untuk mengelola data SKL (Standar Kompetensi Lulusan)
 * Fungsi: Menyimpan state dan actions untuk operasi CRUD SKL
 */

import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useSklStore = defineStore('skl', {
  state: () => ({
    // State untuk menyimpan daftar SKL
    sklList: [],
    // State untuk menyimpan detail SKL yang sedang dilihat
    currentSkl: null,
    // State untuk loading
    loading: false,
    // State untuk error
    error: null
  }),

  getters: {
    // Getter untuk mendapatkan daftar SKL
    getSklList: (state) => state.sklList,
    // Getter untuk mendapatkan detail SKL
    getCurrentSkl: (state) => state.currentSkl,
    // Getter untuk status loading
    isLoading: (state) => state.loading,
    // Getter untuk error
    getError: (state) => state.error
  },

  actions: {
    /**
     * Mengambil daftar semua SKL dari API
     */
    async fetchSklList() {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get('/list/skl')
        
        if (response.data.success) {
          this.sklList = response.data.data
        } else {
          throw new Error('Gagal mengambil data SKL')
        }
      } catch (error) {
        console.error('Error fetching SKL list:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil data SKL'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengambil detail SKL berdasarkan ID
     * @param {number} id - ID SKL yang akan diambil detailnya
     */
    async fetchSklDetail(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(`/view/skl/${id}`)
        
        if (response.data.success) {
          this.currentSkl = response.data.data
        } else {
          throw new Error('Gagal mengambil detail SKL')
        }
      } catch (error) {
        console.error('Error fetching SKL detail:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil detail SKL'
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
     * Membersihkan data SKL yang sedang dilihat
     */
    clearCurrentSkl() {
      this.currentSkl = null
    }
  }
})