/**
 * File: stores/guru.js
 * Deskripsi: Store Pinia untuk mengelola data guru
 * Fungsi: Menyimpan state dan actions untuk operasi CRUD guru
 */

import { defineStore } from 'pinia'
import axios from '@/plugins/axios'
import Cookies from 'js-cookie'
import { parseJWT } from '@/utils/jwt'

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
  // Getter untuk mendapatkan id_guru saat ini
  getCurrentGuruId: (state) => state.currentGuru?.id_guru || null,
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
        
        const response = await axios.get(url)
        
        if (response.data.success) {
          this.guruList = response.data.data
        } else {
          throw new Error('Gagal mengambil data guru dengan filter')
        }
      } catch (error) {
        // Jika endpoint tidak mendukung filter, fallback ke method biasa
        if (error.response?.status === 404 || error.response?.status === 500) {
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
        const response = await axios.get('/list/guru')
        
        if (response.data.success) {
          this.guruList = response.data.data
        } else {
          throw new Error('Gagal mengambil data guru')
        }
      } catch (error) {
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
        const response = await axios.get(`/view/guru/${id}`)
        
        if (response.data.success) {
          this.currentGuru = response.data.data
        } else {
          throw new Error('Gagal mengambil detail guru')
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat mengambil detail guru'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengambil current guru berdasarkan user_id di JWT
     * Prioritas: user_id dari token -> endpoint /filter/guru/user/:user_id
     * Fallback: cari berdasarkan email jika 404
     * GRACEFUL: Jika tidak ditemukan, return null (tidak error)
     */
    async fetchCurrentGuruFromToken() {
      this.loading = true
      this.error = null

      try {
        const token = Cookies.get('auth_token') || Cookies.get('token') || localStorage.getItem('token')
        if (!token) {
          this.currentGuru = null
          return null
        }
        
        const decoded = parseJWT(token) || {}
        const userId = decoded?.id || decoded?.user_id || null
        const email = decoded?.email || null
        
        if (!userId && !email) {
          this.currentGuru = null
          return null
        }

        // Coba ambil via user_id terlebih dahulu
        if (userId) {
          try {
            const res = await axios.get(`/filter/guru/user/${userId}`)
            if (res?.data?.success && res.data.data) {
              this.currentGuru = res.data.data
              return this.currentGuru
            }
          } catch (err) {
            if (err?.response?.status !== 404) {
            }
          }
        }

        // Fallback: cari berdasarkan email dari /list/guru
        if (email) {
          try {
            const listRes = await axios.get('/list/guru')
            const rows = listRes?.data?.data || []
            const found = rows.find((g) => String(g.email).toLowerCase() === String(email).toLowerCase())
            if (found) {
              this.currentGuru = found
              return this.currentGuru
            }
          } catch (err) {
          }
        }

        // Jika tidak ditemukan, set null
        this.currentGuru = null
        return null
        
      } catch (error) {
        this.error = error.message || 'Gagal menentukan profil guru'
        this.currentGuru = null
        return null
      } finally {
        this.loading = false
      }
    },

    /**
     * ✅ GURU: Ambil data sekolah dari guru data
     * Untuk support branding dan sekolah scope
     */
    async fetchSekolahDataForGuru() {
      try {
        const currentGuru = this.getCurrentGuru
        if (!currentGuru?.id_sekolah) {
          return null
        }
        
        const res = await axios.get(`/view/sekolah/${currentGuru.id_sekolah}`)
        if (res?.data?.success && res.data.data) {
          return res.data.data
        }
        return null
      } catch (err) {
        return null
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
     * Tambah guru baru
     * @param {object} guruData - Data guru yang akan ditambahkan
     */
  async addGuru(guruData) {
      this.loading = true
      this.error = null
      
      try {
        
        // Utility: sanitize single guru payload
        const sanitize = (g) => {
          const nama = g?.nama != null ? String(g.nama).trim() : null
          const nip = g?.nip != null ? String(g.nip).trim() : null
          const id_sekolah = g?.id_sekolah !== undefined && g?.id_sekolah !== ''
            ? Number(g.id_sekolah)
            : null
          const id_role = g?.id_role !== undefined && g?.id_role !== ''
            ? Number(g.id_role)
            : null

          return { id_sekolah, nama, nip, id_role }
        }

        // Kirim hanya field yang didukung backend (dengan sanitasi)
        const payload = Array.isArray(guruData)
          ? guruData
              .map(sanitize)
              // Hanya kirim baris yang punya minimal nama atau nip
              .filter((r) => (r.nama != null && r.nama !== '') || (r.nip != null && r.nip !== ''))
          : sanitize(guruData)

        // Validasi minimal untuk single create (form add)
        if (!Array.isArray(payload)) {
          const missing = []
          if (!payload.nama) missing.push('nama')
          if (!payload.nip) missing.push('nip')
          if (payload.id_sekolah === null || Number.isNaN(payload.id_sekolah)) missing.push('id_sekolah')
          if (payload.id_role === null || Number.isNaN(payload.id_role)) missing.push('id_role')
          if (missing.length) {
            throw new Error(`Field wajib belum lengkap: ${missing.join(', ')}`)
          }
        }

        const response = await axios.post('/add/guru', payload)
        
        
        if (response.data.success) {
          // Reload guru list untuk mendapatkan data terbaru
          await this.fetchGuruList()
          
          return response.data
        } else {
          throw new Error(response.data.message || 'Gagal menambahkan guru')
        }
      } catch (error) {
        
        this.error = error.response?.data?.message || error.message || 'Terjadi kesalahan saat menambahkan guru'
        throw error
      } finally {
        this.loading = false
      }
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
        
        // Kirim hanya field yang didukung backend (dengan sanitasi)
        const payload = {
          id_sekolah: guruData?.id_sekolah !== undefined && guruData?.id_sekolah !== '' ? Number(guruData.id_sekolah) : null,
          nama: guruData?.nama != null ? String(guruData.nama).trim() : null,
          nip: guruData?.nip != null ? String(guruData.nip).trim() : null,
          id_role: guruData?.id_role !== undefined && guruData?.id_role !== '' ? Number(guruData.id_role) : null,
        }

        // Validasi minimal
        const missing = []
        if (!payload.nama) missing.push('nama')
        if (!payload.nip) missing.push('nip')
        if (payload.id_sekolah === null || Number.isNaN(payload.id_sekolah)) missing.push('id_sekolah')
        if (payload.id_role === null || Number.isNaN(payload.id_role)) missing.push('id_role')
        if (missing.length) {
          throw new Error(`Field wajib belum lengkap: ${missing.join(', ')}`)
        }
        const response = await axios.put(`/update/guru/${id}`, payload)
        
        
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
        
  // Backend menyediakan DELETE /delete/guru/:id
  const response = await axios.delete(`/delete/guru/${id}`)
        
        
        // Cek berbagai format response yang mungkin
  const isSuccess = (response.data?.success !== false && response.status >= 200 && response.status < 300) || response.status === 204
        
        if (isSuccess) {
          
          // Remove guru dari list
          const originalLength = this.guruList.length
          this.guruList = this.guruList.filter(guru => guru.id_guru != id)
          
          // Clear current guru jika yang dihapus sedang dilihat
          if (this.currentGuru && this.currentGuru.id_guru == id) {
            this.currentGuru = null
          }
          
          return response.data || { success: true, message: 'Guru berhasil dihapus' }
        } else {
          throw new Error(response.data?.message || 'Gagal menghapus data guru')
        }
      } catch (error) {
        
  this.error = error.response?.data?.message || error.message || 'Terjadi kesalahan saat menghapus guru'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})