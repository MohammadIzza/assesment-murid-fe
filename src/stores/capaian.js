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
        // Tidak ada endpoint /list/capaian di backend saat ini; gunakan capaian_kelas sebagai sumber dan de-dupe id_sub_elemen
        const ckRes = await axios.get('/list/capaian_kelas')
        if (ckRes.data.success) {
          this.capaianKelasList = ckRes.data.data || []
          // Bentuk daftar pseudo-capaian minimal: { id_sub_elemen }
          const uniqueIds = [...new Set(this.capaianKelasList.map(x => x.id_sub_elemen ?? x.id_capaian))]
          // Simpan sebagai shape ringan (tanpa deskripsi)
          this.capaianList = uniqueIds.map(id => ({ id_sub_elemen: id }))
        } else {
          this.capaianKelasList = []
          this.capaianList = []
        }
      } catch (error) {
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
  const ids = [...new Set(list.map(x => x.id_sub_elemen ?? x.id_capaian))]
  this.capaianList = ids.map(id => ({ id_sub_elemen: id }))
        return this.capaianList
      } catch (error) {
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
        // Backend hanya menerima: kode_ck, nama_ck, id_kelas, id_sub_elemen, id_sekolah, indikator (opsional)
        const payload = {
          kode_ck: String(capaianData.kode_ck ?? '').trim(),
          nama_ck: String(capaianData.nama_ck ?? '').trim(),
          id_kelas: capaianData.id_kelas != null ? Number(capaianData.id_kelas) : undefined,
          id_sub_elemen: capaianData.id_sub_elemen != null
            ? Number(capaianData.id_sub_elemen)
            : (capaianData.id_capaian != null ? Number(capaianData.id_capaian) : undefined),
          id_sekolah: capaianData.id_sekolah != null ? Number(capaianData.id_sekolah) : undefined,
          indikator: capaianData.indikator != null ? String(capaianData.indikator).trim() : undefined,
        }

        Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k])

        if (!payload.kode_ck || !payload.nama_ck || !payload.id_kelas || !payload.id_sub_elemen || !payload.id_sekolah) {
          throw new Error('Field wajib belum lengkap (kode_ck, nama_ck, id_kelas, id_sub_elemen, id_sekolah)')
        }

        const response = await axios.post('/add/capaian_kelas', payload)
        
        if (response.data.success) {
          return response.data.data
        } else {
          throw new Error(response.data.message || 'Gagal menambahkan capaian kelas')
        }
      } catch (error) {
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
        // Update record capaian_kelas - kirim hanya field yang didukung backend
        const payload = {
          kode_ck: capaianData.kode_ck != null ? String(capaianData.kode_ck).trim() : undefined,
          nama_ck: capaianData.nama_ck != null ? String(capaianData.nama_ck).trim() : undefined,
          id_kelas: capaianData.id_kelas != null ? Number(capaianData.id_kelas) : undefined,
          id_sub_elemen: (capaianData.id_sub_elemen != null
            ? Number(capaianData.id_sub_elemen)
            : (capaianData.id_capaian != null ? Number(capaianData.id_capaian) : undefined)),
          id_sekolah: capaianData.id_sekolah != null ? Number(capaianData.id_sekolah) : undefined,
          indikator: capaianData.indikator != null ? String(capaianData.indikator).trim() : undefined,
        }
        Object.keys(payload).forEach((k) => payload[k] === undefined && delete payload[k])

        const response = await axios.put(`/update/capaian_kelas/${capaianData.id}`, payload)
        
        if (response.data.success) {
          return response.data.data
        } else {
          throw new Error(response.data.message || 'Gagal mengupdate capaian kelas')
        }
      } catch (error) {
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
        // Ekspektasi menerima id (primary key) dari capaian_kelas saat menghapus
        const response = await axios.delete(`/delete/capaian_kelas/${id_capaian}`)
        
        if (response.data.success) {
          return true
        } else {
          throw new Error(response.data.message || 'Gagal menghapus capaian kelas')
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat menghapus capaian kelas'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})