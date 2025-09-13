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
          // Normalisasi field agar konsisten di UI
          this.capaianKelasList = (response.data.data || []).map((row) => ({
            ...row,
            // Beberapa versi backend menyimpan relasi sebagai id_sub_elemen,
            // sebagian kode lama menggunakan nama id_capaian. Samakan di UI.
            id_sub_elemen: row.id_sub_elemen ?? row.id_capaian ?? row.id_subElemen,
            id_capaian: row.id_capaian ?? row.id_sub_elemen ?? row.id_subElemen,
            indikator: row.indikator ?? row.indicator ?? '',
          }))
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
     * Mengambil daftar capaian_kelas berdasarkan filter berantai
     * - Jika id_kelas dan id_sub_elemen tersedia, gunakan endpoint filter backend
     * - Jika hanya id_kelas tersedia, fallback ambil semua lalu filter client-side
     */
    async fetchCapaianKelasFiltered({ id_kelas, id_sub_elemen }) {
      this.loading = true
      this.error = null
      try {
        if (id_kelas && id_sub_elemen) {
          const res = await axios.get(`/filter/capaian_kelas/${id_sub_elemen}/${id_kelas}`)
          if (!res.data?.success) throw new Error('Gagal mengambil data capaian kelas terfilter')
          this.capaianKelasList = (res.data.data || []).map((row) => ({
            ...row,
            id_sub_elemen: row.id_sub_elemen ?? row.id_capaian ?? row.id_subElemen,
            id_capaian: row.id_capaian ?? row.id_sub_elemen ?? row.id_subElemen,
            indikator: row.indikator ?? row.indicator ?? '',
          }))
          return this.capaianKelasList
        }
        // Fallback: ambil semua lalu filter lokal
        await this.fetchCapaianKelasList()
        let list = [...this.capaianKelasList]
        if (id_kelas) list = list.filter((r) => String(r.id_kelas) === String(id_kelas))
        if (id_sub_elemen) list = list.filter((r) => String(r.id_sub_elemen) === String(id_sub_elemen))
        this.capaianKelasList = list
        return list
      } catch (error) {
        console.error('Error fetching filtered capaian_kelas:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil data (filter)'
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
          const row = response.data.data
          this.currentCapaianKelas = {
            ...row,
            id_sub_elemen: row.id_sub_elemen ?? row.id_capaian ?? row.id_subElemen,
            id_capaian: row.id_capaian ?? row.id_sub_elemen ?? row.id_subElemen,
            indikator: row.indikator ?? row.indicator ?? '',
          }
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
        // Backend addRouter mengharapkan field id_capaian,
        // sementara secara domain kita memilih Sub Elemen. Map aman di sini.
        const payload = {
          ...capaianKelasData,
          id_capaian: capaianKelasData.id_capaian ?? capaianKelasData.id_sub_elemen,
          indikator: capaianKelasData.indikator ?? '',
        }
        const response = await axios.post('/add/capaian_kelas', payload)
        
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
        // Samakan mapping seperti add
        const payload = {
          ...capaianKelasData,
          id_capaian: capaianKelasData.id_capaian ?? capaianKelasData.id_sub_elemen,
          indikator: capaianKelasData.indikator ?? this.currentCapaianKelas?.indikator ?? '',
        }
        const response = await axios.put(`/update/capaian_kelas/${id}`, payload)
        
        if (response.data.success) {
          // Update current capaian kelas jika sedang melihat detail
          if (this.currentCapaianKelas && this.currentCapaianKelas.id === id) {
            this.currentCapaianKelas = { ...this.currentCapaianKelas, ...payload }
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

    // Catatan: backend tidak menyediakan endpoint copy capaian_kelas.
    // Fitur copy dihapus dari store untuk mencegah error.

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
