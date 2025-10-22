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
          return response.data.data
        } else {
          throw new Error('Gagal mengambil detail kelas')
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat mengambil detail kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Menambahkan kelas baru
     * @param {Object} kelasData - Data kelas yang akan ditambahkan
     */
    async createKelas(kelasData) {
      this.loading = true;
      this.error = null;
      
      try {
        // Pastikan id_fase terkirim ke backend
        const sanitizedData = {
          id_sekolah: kelasData.id_sekolah || null,
          id_fase: kelasData.id_fase || null,
          nama_kelas: kelasData.nama_kelas || '',
          tingkat: kelasData.tingkat || null,
          tahun_ajaran: kelasData.tahun_ajaran || null,
          id_wali_kelas: kelasData.id_wali_kelas || null
        };
        
        const response = await axios.post('/add/kelas', sanitizedData);
        
        if (response.data.success) {
          // Refresh data kelas setelah berhasil menambahkan
          await this.fetchKelasList();
          return response.data.data;
        } else {
          throw new Error(response.data.message || 'Gagal menambahkan kelas');
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat menambahkan kelas';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Alias untuk createKelas (untuk kompatibilitas)
     * @param {Object|Array} kelasData - Data kelas yang akan ditambahkan
     */
    async addKelas(kelasData) {
      this.loading = true;
      this.error = null;
      
      try {
        // Handle array data (untuk import)
        if (Array.isArray(kelasData)) {
          const sanitizedData = kelasData.map(kelas => ({
            id_sekolah: kelas.id_sekolah || null,
            id_fase: kelas.id_fase || null,
            nama_kelas: kelas.nama_kelas || '',
            tingkat: kelas.tingkat || null,
            tahun_ajaran: kelas.tahun_ajaran || null,
            id_wali_kelas: kelas.id_wali_kelas || null
          })).filter(kelas => kelas.nama_kelas); // Hanya data yang memiliki nama_kelas
          
          const response = await axios.post('/add/kelas', sanitizedData);
          
          if (response.data.success) {
            await this.fetchKelasList();
            return { insertedCount: response.data.insertedCount || sanitizedData.length };
          } else {
            throw new Error(response.data.message || 'Gagal menambahkan kelas');
          }
        } else {
          // Handle single data
          return this.createKelas(kelasData);
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat menambahkan kelas';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    /**
     * Mengupdate data kelas
     * @param {string|number} id - ID kelas yang akan diupdate
     * @param {Object} kelasData - Data kelas yang akan diupdate
     */
    async updateKelas(id, kelasData) {
      this.loading = true;
      this.error = null;
      
      try {
        // Hanya kirim field yang didukung backend
        const sanitizedData = {
          nama_kelas: kelasData.nama_kelas,
          tingkat: kelasData.tingkat,
          tahun_ajaran: kelasData.tahun_ajaran,
          id_sekolah: kelasData.id_sekolah,
          id_fase: kelasData.id_fase || null,
          id_wali_kelas: kelasData.id_wali_kelas
        };
        
  // Backend uses /update/kelas/:id
  const response = await axios.put(`/update/kelas/${id}`, sanitizedData);
        
        if (response.data.success) {
          // Refresh data kelas setelah berhasil mengupdate
          await this.fetchKelasList();
          return response.data.data;
        } else {
          throw new Error(response.data.message || 'Gagal mengupdate kelas');
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat mengupdate kelas';
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    /**
     * Menghapus kelas
     * @param {number} id - ID kelas yang akan dihapus
     */
    async deleteKelas(id) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.delete(`/delete/kelas/${id}`);
        
        if (response.data.success) {
          // Refresh data kelas setelah berhasil menghapus
          await this.fetchKelasList();
          return true;
        } else {
          throw new Error(response.data.message || 'Gagal menghapus kelas');
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat menghapus kelas';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Mengambil jumlah siswa per kelas
     * @param {number} id_kelas - ID kelas
     */
    async fetchSiswaCountByKelas(id_kelas) {
      try {
        const response = await axios.get(`/list/siswa`)
        
        if (response.data.success) {
          // Filter siswa berdasarkan id_kelas
          const siswaInKelas = response.data.data.filter(siswa => siswa.id_kelas === id_kelas)
          return siswaInKelas.length
        } else {
          return 0
        }
      } catch (error) {
        return 0
      }
    },

    /**
     * Mengambil daftar kelas dengan jumlah siswa
     */
    async fetchKelasListWithSiswaCount() {
      this.loading = true
      this.error = null
      
      try {
        // Ambil daftar kelas
        const kelasResponse = await axios.get('/list/kelas')
        
        if (kelasResponse.data.success) {
          const kelasList = kelasResponse.data.data
          
          // Untuk setiap kelas, hitung jumlah siswa
          const kelasWithCount = await Promise.all(
            kelasList.map(async (kelas) => {
              const siswaCount = await this.fetchSiswaCountByKelas(kelas.id_kelas)
              return {
                ...kelas,
                jumlah_siswa: siswaCount
              }
            })
          )
          
          this.kelasList = kelasWithCount
        } else {
          throw new Error('Gagal mengambil data kelas')
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat mengambil data kelas'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Membersihkan data currentKelas
     */
    clearCurrentKelas() {
      this.currentKelas = null;
    }
  }
})