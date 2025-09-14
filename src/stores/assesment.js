/**
 * File: stores/assesment.js
 * Deskripsi: Store Pinia untuk mengelola data assessment
 * Fungsi: Menyimpan state dan actions untuk operasi CRUD assessment
 */

import { defineStore } from "pinia";
import axios from "@/plugins/axios";

export const useAssesmentStore = defineStore("assesment", {
  state: () => ({
    // State untuk menyimpan daftar assessment
    assessmentList: [],
    // State untuk menyimpan daftar assessment
    assessmentHistoryList: [],
    // State untuk menyimpan detail assessment yang sedang dilihat
    currentAssessment: null,
    // State untuk loading
    loading: false,
    // State untuk error
    error: null,
  }),

  getters: {
    // Getter untuk mendapatkan daftar assessment
    getAssessmentList: (state) => state.assessmentList,
    getAssessmentHistoryList: (state) => state.assessmentHistoryList,
    // Getter untuk mendapatkan detail assessment
    getCurrentAssessment: (state) => state.currentAssessment,
    // Getter untuk status loading
    isLoading: (state) => state.loading,
    // Getter untuk error
    getError: (state) => state.error,
  },

  actions: {
    /**
     * Mengambil daftar assessment dengan filter dari API
     * @param {object} filters - Object berisi filter yang akan diterapkan
     */
    async fetchAssessmentListWithFilters(filters = {}) {
      this.loading = true;
      this.error = null;

      try {
        // Buat query parameters dari filters
        const params = new URLSearchParams();

        if (filters.search) params.append("search", filters.search);
        if (filters.id_kelas) params.append("id_kelas", filters.id_kelas);
        if (filters.id_skl) params.append("id_skl", filters.id_skl);
        if (filters.status) params.append("status", filters.status);
        if (filters.sort_by) params.append("sort_by", filters.sort_by);
        if (filters.sort_order) params.append("sort_order", filters.sort_order);

        const queryString = params.toString();
        const url = queryString
          ? `/list/assessment?${queryString}`
          : "/list/assessment";

        const response = await axios.get(url);

        if (response.data.success) {
          this.assessmentList = this.processAssessmentData(response.data.data);
        } else {
          throw new Error("Gagal mengambil data assessment dengan filter");
        }
      } catch (error) {
        console.error("Error fetching filtered assessment list:", error);

        // Jika endpoint tidak mendukung filter, fallback ke method biasa
        if (error.response?.status === 404 || error.response?.status === 500) {
          console.log(
            "API tidak mendukung filter, menggunakan filter frontend..."
          );
          await this.fetchAssessmentList();
        } else {
          this.error =
            error.message || "Terjadi kesalahan saat mengambil data assessment";
          throw error;
        }
      } finally {
        this.loading = false;
      }
    },

    /**
     * Mengambil daftar semua assessment dari API
     */
    async fetchAssessmentList() {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get("/list/assessment");

        if (response.data.success) {
          this.assessmentList = this.processAssessmentData(response.data.data);
        } else {
          throw new Error("Gagal mengambil data assessment");
        }
      } catch (error) {
        console.error("Error fetching assessment list:", error);
        this.error =
          error.message || "Terjadi kesalahan saat mengambil data assessment";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchAssessmentHistory(id_guru) {
      this.loading = true;
      this.error = null;

      try {
        // Backend returns array directly (no { success } wrapper)
        const response = await axios.get(`/filter/history/${id_guru}`);
        if (response.status === 200) {
          this.assessmentHistoryList = Array.isArray(response.data)
            ? response.data
            : [];
        } else {
          throw new Error("Gagal mengambil data history assessment");
        }
      } catch (error) {
        console.error("Error fetching assessment history:", error);
        this.error =
          error.message ||
          "Terjadi kesalahan saat mengambil data history assessment";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Process assessment data and add calculated fields
     * @param {array} assessmentData - Raw assessment data from API
     * @returns {array} - Processed assessment data with additional fields
     */
    processAssessmentData(assessmentData) {
      return assessmentData.map((assessment) => {
        const totalNilai = Object.keys(assessment.nilai || {}).length;
        const totalSiswa = assessment.total_siswa || totalNilai;

        // Calculate progress percentage
        const progress =
          totalSiswa > 0 ? Math.round((totalNilai / totalSiswa) * 100) : 0;

        // Determine status based on progress
        const status = progress === 100 ? "completed" : "in_progress";

        return {
          ...assessment,
          progress,
          status,
          total_siswa: totalSiswa,
        };
      });
    },

    /**
     * Mengambil detail assessment berdasarkan ID
     * @param {number} id - ID assessment yang akan diambil detailnya
     */
    async fetchAssessmentDetail(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.get(`/view/assessment/${id}`);

        if (response.data.success) {
          // Add any additional processing needed for the new fields
          this.currentAssessment = response.data.data;
        } else {
          throw new Error("Gagal mengambil detail assessment");
        }
      } catch (error) {
        console.error("Error fetching assessment detail:", error);
        this.error =
          error.message || "Terjadi kesalahan saat mengambil detail assessment";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Membersihkan error
     */
    clearError() {
      this.error = null;
    },

    /**
     * Membersihkan data assessment yang sedang dilihat
     */
    clearCurrentAssessment() {
      this.currentAssessment = null;
    },

    /**
     * Membuat assessment baru
     * @param {object} assessmentData - Data assessment yang akan ditambahkan
     */
    async createAssessment(assessmentData) {
      this.loading = true;
      this.error = null;

      try {
        // Validate required field mapping to backend contract
        const { id_capaian_kelas, deskripsi, bobot } = assessmentData || {};
        if (!id_capaian_kelas) {
          throw new Error("id_capaian_kelas wajib diisi untuk membuat assessment");
        }

        // Ensure payload matches backend fields exactly
        const payload = {
          id_capaian_kelas: Number(id_capaian_kelas),
          nama_assessment:
            assessmentData.nama_assessment || `Assessment ${Date.now()}`,
          deskripsi: deskripsi || "",
          bobot: typeof bobot === "number" ? bobot : parseInt(bobot || 0) || 0,
        };

        const response = await axios.post("/add/assessment", payload);

        if (response.data.success) {
          // Reload assessment list to get latest data
          await this.fetchAssessmentList();

          return response.data;
        } else {
          throw new Error(
            response.data.message || "Gagal menambahkan assessment"
          );
        }
      } catch (error) {
        console.error("Error adding assessment:", error);

        this.error =
          error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan saat menambahkan assessment";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Update data assessment
     * @param {number} id - ID assessment yang akan diupdate
     * @param {object} assessmentData - Data assessment yang akan diupdate
     */
    async updateAssessment(id, assessmentData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.put(
          `/update/assessment/${id}`,
          assessmentData
        );

        if (response.data.success) {
          // Update assessment in list
          const index = this.assessmentList.findIndex(
            (assessment) => assessment.id_assessment === id
          );
          if (index !== -1) {
            this.assessmentList[index] = {
              ...this.assessmentList[index],
              ...assessmentData,
            };
          }

          // Update current assessment jika sedang dilihat
          if (
            this.currentAssessment &&
            this.currentAssessment.id_assessment === id
          ) {
            this.currentAssessment = {
              ...this.currentAssessment,
              ...assessmentData,
            };
          }

          // Reload assessment list untuk mendapatkan data terbaru
          await this.fetchAssessmentList();

          return response.data;
        } else {
          throw new Error(
            response.data.message || "Gagal mengupdate assessment"
          );
        }
      } catch (error) {
        console.error("Error updating assessment:", error);

        this.error =
          error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan saat mengupdate assessment";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Hapus assessment
     * @param {number} id - ID assessment yang akan dihapus
     */
    async deleteAssessment(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.delete(`/delete/assessment/${id}`);

        if (response.data.success) {
          // Remove assessment from list
          this.assessmentList = this.assessmentList.filter(
            (assessment) => assessment.id_assessment !== id
          );

          // Clear current assessment if it's the one being deleted
          if (
            this.currentAssessment &&
            this.currentAssessment.id_assessment === id
          ) {
            this.currentAssessment = null;
          }

          return response.data;
        } else {
          throw new Error(
            response.data.message || "Gagal menghapus assessment"
          );
        }
      } catch (error) {
        console.error("Error deleting assessment:", error);

        this.error =
          error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan saat menghapus assessment";
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
