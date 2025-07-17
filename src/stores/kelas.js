/**
 * File: stores/kelas.js
 * Deskripsi: Store Pinia untuk mengelola data kelas
 * Fungsi: Menyimpan state dan actions untuk operasi CRUD kelas
 */

import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useKelasStore = defineStore('kelas', {
  state: () => ({
    // State untuk menyimpan daftar kelas
    kelasList: [],
    // State untuk menyimpan detail kelas yang sedang dilihat
    currentKelas: null,
    // State untuk loading
    loading: false,
    // State untuk error
    error: null
  }),

  getters: {
    // Getter untuk mendapatkan daftar kelas
    getKelasList: (state) => state.kelasList,
    // Getter untuk mendapatkan detail kelas
    getCurrentKelas: (state) => state.currentKelas,
    // Getter untuk status loading
    isLoading: (state) => state.loading,
    // Getter untuk error
    getError: (state) => state.error
  },

  actions: {
    /**
     * Mengambil daftar semua kelas dari API
     */
    async fetchKelasList() {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get('/list/kelas')
        
        if (response.data.success) {
          this.kelasList = response.data.data
        } else {
          throw new Error('Gagal mengambil data kelas')
        }
      } catch (error) {
        console.error('Error fetching kelas list:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil data kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengambil detail kelas berdasarkan ID
     * @param {number} id - ID kelas yang akan diambil detailnya
     */
    async fetchKelasDetail(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(`/view/kelas/${id}`)
        
        if (response.data.success) {
          this.currentKelas = response.data.data
        } else {
          throw new Error('Gagal mengambil detail kelas')
        }
      } catch (error) {
        console.error('Error fetching kelas detail:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil detail kelas'
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
     * Membersihkan data kelas yang sedang dilihat
     */
    clearCurrentKelas() {
      this.currentKelas = null
    }
  }
})