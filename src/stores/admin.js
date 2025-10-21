/**
 * File: stores/admin.js
 * Deskripsi: Store Pinia untuk mengelola role admin
 * Fungsi: Menyimpan state untuk peran admin, tidak lagi melakukan operasi CRUD admin
 * Catatan: Admin panel untuk manajemen admin sudah tidak diperlukan, admin hanya untuk mengelola data
 */

import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    // State untuk menyimpan daftar admin
    adminList: [],
    // State untuk menyimpan detail admin yang sedang dilihat
    currentAdmin: null,
    // State untuk loading
    loading: false,
    // State untuk error
    error: null
  }),

  getters: {
    // Getter untuk mendapatkan daftar admin
    getAdminList: (state) => state.adminList,
    // Getter untuk mendapatkan detail admin
    getCurrentAdmin: (state) => state.currentAdmin,
    // Getter untuk status loading
    isLoading: (state) => state.loading,
    // Getter untuk error
    getError: (state) => state.error
  },

  actions: {
    /**
     * Mengambil daftar semua admin dari API
     */
    async fetchAdminList() {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get('/list/admin')
        
        if (response.data.success) {
          this.adminList = response.data.data
        } else {
          throw new Error('Gagal mengambil data admin')
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat mengambil data admin'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengambil detail admin berdasarkan ID
     * @param {number} id_admin - ID admin yang akan diambil detailnya
     */
    async fetchAdminDetail(id_admin) {
      this.loading = true
      this.error = null
      
      try {
        const response = await axios.get(`/view/admin/${id_admin}`)
        
        if (response.data.success) {
          this.currentAdmin = response.data.data
        } else {
          throw new Error('Gagal mengambil detail admin')
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat mengambil detail admin'
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
     * Membersihkan data admin yang sedang dilihat
     */
    clearCurrentAdmin() {
      this.currentAdmin = null
    },

    /**
     * CRUD operations for admin users have been removed
     * Admin role is only for managing other data, not admin users
     */
  }
})