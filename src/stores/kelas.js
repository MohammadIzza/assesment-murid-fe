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
    // Getter untuk mendapatkan daftar kelas yang sudah diurutkan
    getSortedKelasList: (state) => {
      const sortedList = [...state.kelasList]
      
      // Fungsi untuk mengurutkan berdasarkan urutan romawi
      const romanOrder = {
        'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10,
        'XI': 11, 'XII': 12, 'XIII': 13, 'XIV': 14, 'XV': 15, 'XVI': 16, 'XVII': 17, 'XVIII': 18, 'XIX': 19, 'XX': 20
      }
      
      return sortedList.sort((a, b) => {
        // Extract romawi dari nama kelas (misal: "III B" -> "III")
        const getRomanPart = (nama) => {
          const match = nama.match(/^([IVX]+)/)
          return match ? match[1] : ''
        }
        
        const romanA = getRomanPart(a.nama_kelas)
        const romanB = getRomanPart(b.nama_kelas)
        
        // Jika romawi sama, urutkan berdasarkan huruf (A, B, C, dst)
        if (romanA === romanB) {
          const letterA = a.nama_kelas.match(/[A-Z]$/)?.[0] || ''
          const letterB = b.nama_kelas.match(/[A-Z]$/)?.[0] || ''
          return letterA.localeCompare(letterB)
        }
        
        // Urutkan berdasarkan urutan romawi
        return (romanOrder[romanA] || 0) - (romanOrder[romanB] || 0)
      })
    },
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