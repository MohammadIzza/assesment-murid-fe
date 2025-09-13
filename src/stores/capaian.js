import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useCapaianStore = defineStore('capaian', {
  state: () => ({
    capaianList: [],
    capaianKelasList: [],
    currentCapaian: null,
    loading: false,
    error: null
  }),

  getters: {
    getCapaianList: (state) => state.capaianList,
    getCurrentCapaian: (state) => state.currentCapaian,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

  actions: {
    // Ambil semua capaian (referensi master) jika backend menyediakan; fallback dari capaian_kelas join
    async fetchCapaianList() {
      this.loading = true
      this.error = null
      try {
        // Tidak ada endpoint /list/capaian di backend saat ini; gunakan capaian_kelas sebagai sumber dan de-dupe id_capaian
        const ckRes = await axios.get('/list/capaian_kelas')
        if (ckRes.data.success) {
          this.capaianKelasList = ckRes.data.data || []
          // Bentuk daftar pseudo-capaian minimal: { id_capaian, deskripsi?, id_sub_elemen? }
          // Catatan: backend tidak expose tabel capaian secara langsung; field deskripsi tidak tersedia di capaian_kelas.
          // Biarkan UI menggunakan capaian_kelas langsung ketika butuh menampilkan kode/nama_ck.
          const uniqueIds = [...new Set(this.capaianKelasList.map(x => x.id_capaian))]
          // Simpan sebagai shape ringan (tanpa deskripsi)
          this.capaianList = uniqueIds.map(id => ({ id_capaian: id }))
        } else {
          this.capaianKelasList = []
          this.capaianList = []
        }
      } catch (error) {
        console.error('Error fetching capaian list:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil data capaian'
        throw error
      } finally {
        this.loading = false
      }
    },

    /** Ambil capaian_kelas untuk kelas tertentu (dan opsional sub elemen) */
    async fetchCapaianKelasByKelas(id_kelas, options = {}) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get('/list/capaian_kelas')
        if (!res.data.success) throw new Error('Gagal mengambil data capaian_kelas')
        let list = res.data.data || []
        list = list.filter(x => x.id_kelas == id_kelas)
        if (options.id_sub_elemen) {
          // Jika skema ck memiliki kolom id_sub_elemen (di filterRouter ada join), filter jika tersedia
          list = list.filter(x => x.id_sub_elemen == options.id_sub_elemen)
        }
        this.capaianKelasList = list
        return list
      } catch (e) {
        this.error = e.message || 'Gagal mengambil capaian_kelas'
        throw e
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengambil daftar capaian berdasarkan kelas
     */
    async fetchCapaianByKelasId(id_kelas) {
      this.loading = true
      this.error = null
      
      try {
        const list = await this.fetchCapaianKelasByKelas(id_kelas)
        // Representasikan capaian berdasarkan capaian_kelas yang relevan
        const ids = [...new Set(list.map(x => x.id_capaian))]
        this.capaianList = ids.map(id => ({ id_capaian: id }))
        return this.capaianList
      } catch (error) {
        console.error('Error fetching capaian kelas:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengambil data capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Menambahkan capaian kelas baru
     */
    async createCapaian(capaianData) {
      this.loading = true
      this.error = null
      
      try {
        // Backend tidak expose /add/capaian, gunakan capaian_kelas untuk membuat mapping di kelas
        const response = await axios.post('/add/capaian_kelas', capaianData)
        
        if (response.data.success) {
          return response.data.data
        } else {
          throw new Error(response.data.message || 'Gagal menambahkan capaian kelas')
        }
      } catch (error) {
        console.error('Error creating capaian:', error)
        this.error = error.message || 'Terjadi kesalahan saat menambahkan capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Mengupdate data capaian kelas
     */
    async updateCapaian(capaianData) {
      this.loading = true
      this.error = null
      
      try {
        // Update record capaian_kelas (bukan tabel capaian master)
        const response = await axios.put(`/update/capaian_kelas/${capaianData.id}`, capaianData)
        
        if (response.data.success) {
          return response.data.data
        } else {
          throw new Error(response.data.message || 'Gagal mengupdate capaian kelas')
        }
      } catch (error) {
        console.error('Error updating capaian:', error)
        this.error = error.message || 'Terjadi kesalahan saat mengupdate capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Menghapus capaian kelas
     */
    async deleteCapaian(id_capaian) {
      this.loading = true
      this.error = null
      
      try {
        // Hapus semua mapping capaian_kelas yang refer ke id_capaian tertentu di kelas saat ini (opsional: butuh id)
        // Untuk amannya, ekspektasi caller mengirim id (primary key) dari capaian_kelas saat menghapus
        const response = await axios.delete(`/delete/capaian_kelas/${id_capaian}`)
        
        if (response.data.success) {
          return true
        } else {
          throw new Error(response.data.message || 'Gagal menghapus capaian kelas')
        }
      } catch (error) {
        console.error('Error deleting capaian:', error)
        this.error = error.message || 'Terjadi kesalahan saat menghapus capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})