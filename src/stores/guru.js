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
        const response = await axios.get('/list/guru')
        
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
        const response = await axios.get(`/view/guru/${id}`)
        
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
     * Mengambil current guru berdasarkan user_id di JWT
     * Prioritas: user_id dari token -> endpoint /filter/guru/user/:user_id
     * Fallback: cari berdasarkan email jika 404
     */
    async fetchCurrentGuruFromToken() {
      this.loading = true
      this.error = null

      try {
        const token = Cookies.get('auth_token') || Cookies.get('token') || localStorage.getItem('token')
        if (!token) throw new Error('Token tidak ditemukan, silakan login kembali')
        const decoded = parseJWT(token) || {}
        const userId = decoded?.id || decoded?.user_id || null
        const email = decoded?.email || null
        if (!userId && !email) throw new Error('Klaim user pada token tidak lengkap')

        // Coba ambil via user_id terlebih dahulu
        if (userId) {
          try {
            const res = await axios.get(`/filter/guru/user/${userId}`)
            if (res?.data?.success) {
              this.currentGuru = res.data.data
              return this.currentGuru
            }
          } catch (err) {
            if (err?.response?.status !== 404) throw err
            // jika 404, lanjut fallback by email
          }
        }

        // Fallback: cari berdasarkan email dari /list/guru
        if (email) {
          const listRes = await axios.get('/list/guru')
          const rows = listRes?.data?.data || []
          const found = rows.find((g) => String(g.email).toLowerCase() === String(email).toLowerCase())
          if (found) {
            this.currentGuru = found
            return this.currentGuru
          }
        }

        throw new Error('Profil guru tidak ditemukan untuk user ini')
      } catch (error) {
        console.error('Error resolving current guru from token:', error)
        this.error = error.message || 'Gagal menentukan profil guru'
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
     * Tambah guru baru
     * @param {object} guruData - Data guru yang akan ditambahkan
     */
  async addGuru(guruData) {
      this.loading = true
      this.error = null
      
      try {
        console.log('Attempting to add guru')
        console.log('Add URL:', '/add/guru')
        console.log('Add data:', guruData)
        
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
        
        console.log('Add response:', response)
        console.log('Add response status:', response.status)
        console.log('Add response data:', response.data)
        
        if (response.data.success) {
          // Reload guru list untuk mendapatkan data terbaru
          await this.fetchGuruList()
          
          return response.data
        } else {
          throw new Error(response.data.message || 'Gagal menambahkan guru')
        }
      } catch (error) {
        console.error('Error adding guru:', error)
        console.error('Add error response:', error.response)
        console.error('Add error response status:', error.response?.status)
        console.error('Add error response data:', error.response?.data)
        
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
        console.log('Attempting to update guru with ID:', id)
        console.log('Update URL:', `/update/guru/${id}`)
        console.log('Update data:', guruData)
        
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
        
  // Backend menyediakan DELETE /delete/guru/:id
  const response = await axios.delete(`/delete/guru/${id}`)
        
        console.log('Final delete response:', response)
        console.log('Response status:', response.status)
        console.log('Response data:', response.data)
        
        // Cek berbagai format response yang mungkin
  const isSuccess = (response.data?.success !== false && response.status >= 200 && response.status < 300) || response.status === 204
        
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