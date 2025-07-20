/**
 * File: stores/assessmentResults.js
 * Deskripsi: Store Pinia untuk mengelola hasil assessment
 * Fungsi: Menyimpan state dan actions untuk operasi assessment results
 */

import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useAssessmentResultsStore = defineStore('assessmentResults', {
  state: () => ({
    // State untuk menyimpan hasil assessment
    results: [],
    // State untuk session tracking
    currentSession: null,
    // State untuk loading
    loading: false,
    // State untuk error
    error: null,
    // State untuk progress
    progress: {
      current: 0,
      max: 6
    }
  }),

  getters: {
    // Getter untuk mendapatkan daftar results
    getResults: (state) => state.results,
    // Getter untuk mendapatkan current session
    getCurrentSession: (state) => state.currentSession,
    // Getter untuk status loading
    isLoading: (state) => state.loading,
    // Getter untuk error
    getError: (state) => state.error,
    // Getter untuk progress
    getProgress: (state) => state.progress,
    // Getter untuk modus calculation
    getModus: (state) => {
      if (state.results.length === 0) return null
      
      const nilaiCounts = {
        'MB': 0,
        'SB': 0, 
        'BSH': 0,
        'SAB': 0
      }
      
      state.results.forEach(result => {
        nilaiCounts[result.nilai]++
      })
      
      // Find the most frequent nilai
      let modus = null
      let maxCount = 0
      
      Object.entries(nilaiCounts).forEach(([nilai, count]) => {
        if (count > maxCount) {
          maxCount = count
          modus = nilai
        }
      })
      
      return {
        nilai: modus,
        count: maxCount,
        total: state.results.length
      }
    }
  },

  actions: {
    /**
     * Membuat atau mendapatkan assessment ID berdasarkan kombinasi filter
     * @param {object} filters - Object berisi filter (kelas, dimensi, elemen, sub_elemen, capaian)
     */
    async getOrCreateAssessmentId(filters) {
      try {
        // Cek apakah sudah ada assessment untuk kombinasi ini
        const existingAssessment = await this.findAssessmentByFilters(filters)
        
        if (existingAssessment) {
          return existingAssessment.id_assessment
        } else {
          // Buat assessment baru
          const assessmentData = {
            id_capaian: filters.id_capaian,
            nama_assessment: `${filters.nama_kelas} - ${filters.nama_dimensi} - ${filters.nama_elemen} - ${filters.nama_sub_elemen}`,
            deskripsi: `Assessment untuk ${filters.nama_kelas} pada ${filters.nama_dimensi}`,
            bobot: 1
          }
          
          const response = await axios.post('/add/assessment', assessmentData)
          
          if (response.data.success) {
            return response.data.id
          } else {
            throw new Error('Gagal membuat assessment')
          }
        }
      } catch (error) {
        console.error('Error getting or creating assessment ID:', error)
        throw error
      }
    },

    /**
     * Mencari assessment berdasarkan filter
     * @param {object} filters - Object berisi filter
     */
    async findAssessmentByFilters(filters) {
      try {
        const response = await axios.get('/list/assessment')
        
        if (response.data.success) {
          const assessments = response.data.data
          
          // Cari assessment yang sesuai dengan filter
          return assessments.find(assessment => 
            assessment.id_capaian == filters.id_capaian &&
            assessment.nama_assessment.includes(filters.nama_kelas) &&
            assessment.nama_assessment.includes(filters.nama_dimensi)
          )
        }
        
        return null
      } catch (error) {
        console.error('Error finding assessment by filters:', error)
        return null
      }
    },

    /**
     * Menyimpan hasil assessment
     * @param {object} data - Data assessment yang akan disimpan
     */
    async saveAssessmentResult(data) {
      this.loading = true
      this.error = null
      
      try {
        const { siswaList, nilaiSiswa, filters } = data
        
        // Dapatkan assessment ID
        const assessmentId = await this.getOrCreateAssessmentId(filters)
        
        // Ambil id_pengampu dari user yang login (sesuaikan dengan auth store)
        const id_pengampu = 1 // TODO: Ambil dari auth store
        
        // Simpan nilai untuk setiap siswa
        const promises = siswaList.map(siswa => {
          const nilai = nilaiSiswa[siswa.id_siswa]
          
          if (nilai) {
            const nilaiData = {
              id_siswa: siswa.id_siswa,
              id_pengampu: id_pengampu,
              id_assessment: assessmentId,
              nilai: nilai,
              tanggal_input: new Date().toISOString()
            }
            
            return axios.post('/add/nilai', nilaiData)
          }
        }).filter(Boolean)
        
        const responses = await Promise.all(promises)
        
        // Update progress
        this.progress.current++
        
        // Reload results
        await this.loadAssessmentResults(filters)
        
        return {
          success: true,
          message: 'Assessment berhasil disimpan',
          assessmentId: assessmentId,
          savedCount: responses.length
        }
      } catch (error) {
        console.error('Error saving assessment result:', error)
        this.error = error.message || 'Terjadi kesalahan saat menyimpan assessment'
        throw error
      } finally {
        this.loading = false
      }
    },

    /**
     * Memuat hasil assessment berdasarkan filter
     * @param {object} filters - Object berisi filter
     */
    async loadAssessmentResults(filters) {
      this.loading = true
      this.error = null
      
      try {
        // Dapatkan assessment ID
        const assessmentId = await this.getOrCreateAssessmentId(filters)
        
        // Ambil semua nilai untuk assessment ini
        const response = await axios.get(`/list/nilai?id_assessment=${assessmentId}`)
        
        if (response.data.success) {
          this.results = response.data.data
          this.progress.current = this.results.length
        } else {
          this.results = []
          this.progress.current = 0
        }
      } catch (error) {
        console.error('Error loading assessment results:', error)
        this.error = error.message || 'Terjadi kesalahan saat memuat hasil assessment'
        this.results = []
        this.progress.current = 0
      } finally {
        this.loading = false
      }
    },

    /**
     * Reset progress dan results
     */
    resetProgress() {
      this.results = []
      this.progress.current = 0
      this.currentSession = null
      this.error = null
    },

    /**
     * Cek apakah sudah mencapai maksimal session
     */
    canAddMore() {
      return this.progress.current < this.progress.max
    },

    /**
     * Membersihkan error
     */
    clearError() {
      this.error = null
    }
  }
}) 