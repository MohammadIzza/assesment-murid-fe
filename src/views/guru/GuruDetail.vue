<template>
  <div :class="[
    'min-h-screen py-6 transition-colors duration-300',
    isDarkMode ? 'bg-dark-background' : 'bg-gray-50'
  ]" style="padding-top: 5rem;">
    <!-- Toast Component -->
    <Toast 
      :show="showToast" 
      :type="toastType" 
      :title="toastTitle" 
      :message="toastMessage" 
      @close="showToast = false" 
    />

    <!-- Delete Confirmation Modal -->
  <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40" aria-hidden="true" @click="showDeleteModal = false"></div>
        
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div :class="[
          'relative inline-block align-bottom rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full z-50',
          isDarkMode ? 'bg-dark-surface' : 'bg-white'
        ]">
          <div :class="[
            'bg-white px-6 pt-6 pb-4 sm:p-6 sm:pb-4',
            isDarkMode ? 'bg-dark-surface' : 'bg-white'
          ]">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full bg-red-100 sm:mx-0 sm:h-12 sm:w-12">
                <svg class="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 :class="[
                  'text-lg leading-6 font-semibold',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]" id="modal-title">
                  Konfirmasi Hapus Guru
                </h3>
                <div class="mt-3">
                  <p class="text-sm text-gray-600">
                    Apakah Anda yakin ingin menghapus guru <span class="font-semibold text-gray-900">"{{ guruStore.getCurrentGuru?.nama || 'ini' }}"</span>?
                  </p>
                  <p class="text-sm text-red-600 mt-2 font-medium">
                    Tindakan ini tidak dapat dibatalkan dan akan menghapus semua data terkait.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div :class="[
            'bg-gray-50 px-6 py-4 sm:px-6 sm:flex sm:flex-row-reverse',
            isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-gray-50'
          ]">
            <button
              @click="confirmDeleteGuru"
              :disabled="isDeleting"
              class="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2.5 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!isDeleting" class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Ya, Hapus
              </span>
              <span v-else class="flex items-center">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Menghapus...
              </span>
            </button>
            <button
              @click="showDeleteModal = false"
              :disabled="isDeleting"
              :class="[
                'mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2.5 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
                isDarkMode ? 'bg-dark-surface border-dark-border text-gray-300 hover:bg-gray-700' : 'bg-white text-gray-700 hover:bg-gray-50'
              ]"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <button @click="goBack" :class="[
              'inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4 transition-colors',
              isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-800'
            ]">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Daftar Guru
            </button>
            <div class="flex items-center space-x-3">
              <h1 :class="[
                'text-2xl font-bold',
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              ]">Detail Guru</h1>
              <div class="flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full">
                <div class="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                <span class="text-sm font-medium">Live Data</span>
              </div>
            </div>
            <p :class="[
              'text-gray-600 mt-1',
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            ]">Informasi lengkap dan riwayat aktivitas guru</p>
          </div>
          
          <!-- Quick Actions -->
          <div class="hidden md:flex items-center space-x-3">
            <button @click="loadGuruDetail" :class="[
              'inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all',
              isDarkMode ? 'text-gray-300 bg-dark-surface border-dark-border hover:bg-gray-700' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
            ]">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </button>
            <button :class="[
              'inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all',
              isDarkMode ? 'text-gray-300 bg-dark-surface border-dark-border hover:bg-gray-700' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
            ]">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="guruStore.isLoading" :class="[
        'rounded-xl shadow-sm border p-12',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h3 :class="[
            'text-lg font-semibold mb-2',
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          ]">Memuat Detail Guru</h3>
          <p :class="[
            'text-gray-600',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">Mohon tunggu sebentar...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="guruStore.getError" :class="[
        'rounded-xl shadow-sm border p-12',
        isDarkMode ? 'bg-dark-surface border-red-700' : 'bg-white border-red-200'
      ]">
        <div class="text-center">
          <div class="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 :class="[
            'text-lg font-semibold mb-3',
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          ]">Terjadi Kesalahan</h3>
          <p :class="[
            'text-gray-600 mb-6',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">{{ guruStore.getError }}</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button @click="loadGuruDetail" :class="[
              'inline-flex items-center px-4 py-2 rounded-lg transition-all',
              isDarkMode ? 'bg-red-700 hover:bg-red-800 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
            ]">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Coba Lagi
            </button>
            <button @click="goBack" :class="[
              'inline-flex items-center px-4 py-2 rounded-lg transition-all',
              isDarkMode ? 'border-dark-border text-gray-300 bg-dark-surface hover:bg-gray-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            ]">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali
            </button>
          </div>
        </div>
      </div>

      <!-- Guru Detail Content -->
      <div v-else-if="guruStore.getCurrentGuru" class="space-y-8">
        <!-- Profile Card -->
        <div :class="[
          'rounded-xl shadow-sm border overflow-hidden',
          isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
        ]">
          <div class="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-8 py-10">
            <div class="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <div class="flex-shrink-0">
                <div class="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-4 ring-white/30">
                  <span class="text-3xl font-bold text-white">
                    {{ getInitials(guruStore.getCurrentGuru.nama) }}
                  </span>
                </div>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-white mb-2">{{ guruStore.getCurrentGuru.nama || 'Nama Tidak Tersedia' }}</h2>
                <p class="text-blue-100 text-base mb-3">{{ guruStore.getCurrentGuru.email || 'Email Tidak Tersedia' }}</p>
                <div class="flex flex-wrap gap-2">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="getStatusClass(guruStore.getCurrentGuru)">
                    <div class="w-2 h-2 rounded-full mr-2" :class="guruStore.getCurrentGuru?.email ? 'bg-green-400' : 'bg-red-400'"></div>
                    {{ getStatusText(guruStore.getCurrentGuru) }}
                  </span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" :class="getRoleClass(guruStore.getCurrentGuru.id_role)">
                    {{ getRoleName(guruStore.getCurrentGuru.id_role) }}
                  </span>
                </div>
              </div>
              <!-- Action Buttons - Move to header for better UX -->
              <div class="flex flex-col space-y-2 md:space-y-0 md:space-x-3 md:flex-row">
                <button @click="editGuru" class="inline-flex items-center justify-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 transform hover:scale-105">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit Guru
                </button>
                <button @click="showDeleteModal = true" class="inline-flex items-center justify-center px-4 py-2 bg-red-500/90 backdrop-blur-sm text-white rounded-lg hover:bg-red-600/90 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Hapus Guru
                </button>
              </div>
            </div>
          </div>

          <!-- Details Section -->
          <div :class="[
            'px-8 py-8',
            isDarkMode ? 'bg-dark-surface' : 'bg-white'
          ]">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Personal Information -->
              <div class="space-y-6">
                <div :class="[
                  'rounded-lg p-4',
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                ]">
                  <h3 :class="[
                    'text-base font-semibold mb-4',
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">Informasi Personal</h3>
                  <div class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">ID Guru</span>
                      <span :class="[
                        'text-sm font-semibold',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ guruStore.getCurrentGuru.id_guru }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">NIP</span>
                      <span :class="[
                        'text-sm',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ guruStore.getCurrentGuru.nip || 'Tidak Tersedia' }}</span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Email</span>
                      <a :href="`mailto:${guruStore.getCurrentGuru.email}`" :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                      ]">
                        {{ guruStore.getCurrentGuru.email || 'Tidak Tersedia' }}
                      </a>
                    </div>
                    <div class="flex justify-between items-center py-2">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Tanggal Bergabung</span>
                      <span :class="[
                        'text-sm',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ formatDate(guruStore.getCurrentGuru.created_at) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Institution Information -->
              <div class="space-y-6">
                <div :class="[
                  'rounded-lg p-4',
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                ]">
                  <h3 :class="[
                    'text-base font-semibold mb-4',
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">Informasi Institusi</h3>
                  <div class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Sekolah</span>
                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="getSchoolClass(guruStore.getCurrentGuru.id_sekolah)">
                        {{ getSchoolName(guruStore.getCurrentGuru.id_sekolah) }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Role</span>
                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="getRoleClass(guruStore.getCurrentGuru.id_role)">
                        {{ getRoleName(guruStore.getCurrentGuru.id_role) }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Status Akun</span>
                      <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium" :class="getStatusClass(guruStore.getCurrentGuru)">
                        <div class="w-2 h-2 rounded-full mr-1.5" :class="guruStore.getCurrentGuru?.email ? 'bg-green-500' : 'bg-red-500'"></div>
                        {{ getStatusText(guruStore.getCurrentGuru) }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center py-2">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Terakhir Update</span>
                      <span :class="[
                        'text-sm',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ formatDate(guruStore.getCurrentGuru.updated_at) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Not Found State -->
      <div v-else :class="[
        'rounded-xl shadow-sm border p-12',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <div class="text-center">
          <div class="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mx-auto mb-6">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <h3 :class="[
            'text-lg font-semibold mb-3',
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          ]">Guru Tidak Ditemukan</h3>
          <p :class="[
            'text-gray-600 mb-6',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">Guru dengan ID <span class="font-medium">{{ $route.params.id }}</span> tidak ditemukan dalam sistem.</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button @click="goBack" :class="[
              'inline-flex items-center px-4 py-2 rounded-lg transition-all',
              isDarkMode ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            ]">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Daftar Guru
            </button>
            <button @click="loadGuruDetail" :class="[
              'inline-flex items-center px-4 py-2 rounded-lg transition-all',
              isDarkMode ? 'border-dark-border text-gray-300 bg-dark-surface hover:bg-gray-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
            ]">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGuruStore } from '@/stores/guru'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { useSekolahScopeStore } from '@/stores/sekolahScope'
import axios from '@/plugins/axios'
import Toast from '@/components/common/Toast.vue'

export default {
  name: 'GuruDetail',
  components: {
    Toast
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const guruStore = useGuruStore()
    const themeStore = useThemeStore()
    const authStore = useAuthStore()
    const sekolahScope = useSekolahScopeStore()
    const isDarkMode = computed(() => themeStore.isDarkMode)

    // Toast state
    const showToast = ref(false)
    const toastType = ref('success')
    const toastTitle = ref('')
    const toastMessage = ref('')

    // Delete modal state
    const showDeleteModal = ref(false)
    const isDeleting = ref(false)
    
    // ✅ SEKOLAH LIST STATE
    const sekolahList = ref([])
    const sekolahLoading = ref(false)

    // Toast helper
    const showToastMessage = (type, title, message) => {
      toastType.value = type
      toastTitle.value = title
      toastMessage.value = message
      showToast.value = true
    }

    // Methods
    const loadGuruDetail = async () => {
      try {
        await guruStore.fetchGuruDetail(route.params.id)
        
        // ⭐ VALIDASI: Guru harus dari sekolah yang sama dengan user yang login
        const guru = guruStore.getCurrentGuru
        const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
        
        if (guru && userSekolahId && guru.id_sekolah != userSekolahId) {
          showToastMessage('error', 'Akses Ditolak', 'Anda tidak memiliki akses untuk melihat guru dari sekolah lain')
          setTimeout(() => {
            router.push({ name: 'guru-list' })
          }, 2000)
        }
      } catch (error) {
        // Error handling
      }
    }

    const goBack = () => {
      router.push({ name: 'guru-list' })
    }

    const editGuru = () => {
      router.push({ name: 'guru-edit', params: { id: route.params.id } })
    }

    const confirmDeleteGuru = async () => {
      const guru = guruStore.getCurrentGuru
      
      // ⭐ VALIDASI: Hanya bisa delete guru dari sekolah yang sama
      const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
      if (userSekolahId && guru?.id_sekolah != userSekolahId) {
        showDeleteModal.value = false
        showToastMessage('error', 'Akses Ditolak', 'Anda hanya bisa menghapus guru dari sekolah Anda sendiri')
        return
      }
      
      try {
        isDeleting.value = true
        
        // Deleting guru
        
        await guruStore.deleteGuru(route.params.id)
        
        // Close modal
        showDeleteModal.value = false
        isDeleting.value = false
        
        // Show success toast
        showToastMessage(
          'success',
          'Berhasil!',
          `Guru "${guru?.nama || 'tersebut'}" berhasil dihapus dari sistem.`
        )
        
        // Redirect after toast duration
        setTimeout(() => {
          router.push({ name: 'guru-list' })
        }, 1500)
        
      } catch (error) {
        isDeleting.value = false
        showDeleteModal.value = false
        
        // Error handling
        
        // Show error message yang lebih detail
        let errorMessage = 'Terjadi kesalahan saat menghapus guru'
        
        if (error.response?.status === 500) {
          errorMessage = 'Server error: Kemungkinan ada masalah di backend atau endpoint tidak sesuai'
        } else if (error.response?.status === 404) {
          errorMessage = 'Data guru tidak ditemukan atau sudah dihapus sebelumnya'
        } else if (error.response?.status === 405) {
          errorMessage = 'Method tidak diizinkan: Endpoint mungkin tidak mendukung operasi hapus'
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        } else if (error.message) {
          errorMessage = error.message
        }
        
        showToastMessage(
          'error',
          'Gagal Menghapus',
          errorMessage
        )
      }
    }

    const getInitials = (name) => {
      if (!name) return '?'
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'Tidak Tersedia'
      try {
        const date = new Date(dateString)
        return date.toLocaleDateString('id-ID', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch (error) {
        return 'Format Tanggal Tidak Valid'
      }
    }

    const getSchoolName = (schoolId) => {
      if (!schoolId) return 'Tidak Diketahui'
      // ✅ AMBIL DARI API: Cari di sekolahList yang sudah di-fetch
      const sekolah = sekolahList.value.find(s => s.id_sekolah == schoolId)
      return sekolah?.nama_sekolah || sekolah?.nama || 'Sekolah Lain'
    }

    const getSchoolClass = (schoolId) => {
      if (!schoolId) return 'bg-gray-100 text-gray-800'
      const classes = {
        1: 'bg-green-100 text-green-800',
        2: 'bg-blue-100 text-blue-800'
      }
      return classes[schoolId] || 'bg-gray-100 text-gray-800'
    }

    const getRoleName = (roleId) => {
      if (!roleId) return 'Tidak Diketahui'
      const roles = {
        2: 'Guru',
        3: 'Kepala Sekolah'
      }
      return roles[roleId] || 'Role Lain'
    }

    const getRoleClass = (roleId) => {
      if (!roleId) return 'bg-gray-100 text-gray-800'
      const classes = {
        2: 'bg-blue-100 text-blue-800',
        3: 'bg-purple-100 text-purple-800'
      }
      return classes[roleId] || 'bg-gray-100 text-gray-800'
    }

    const getStatusText = (guru) => {
      // Anggap aktif jika guru sudah memiliki email tertaut (verifikasi akun selesai)
      return guru?.email ? 'Aktif' : 'Belum Aktif'
    }

    const getStatusClass = (guru) => {
      return guru?.email ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }

    // ✅ FETCH SEKOLAH LIST DARI API
    const fetchSekolahList = async () => {
      sekolahLoading.value = true
      try {
        const response = await axios.get('/list/sekolah')
        if (response.data && response.data.success) {
          sekolahList.value = response.data.data || []
        } else {
          sekolahList.value = []
        }
      } catch (error) {
        sekolahList.value = []
      } finally {
        sekolahLoading.value = false
      }
    }

    // Lifecycle
    onMounted(async () => {
      // Fetch sekolah list dan guru detail paralel
      await Promise.all([
        fetchSekolahList(),
        loadGuruDetail()
      ])
    })

    onUnmounted(() => {
      guruStore.clearCurrentGuru()
    })

    return {
      guruStore,
      themeStore,
      authStore,
      sekolahScope,
      isDarkMode,
      showToast,
      toastType,
      toastTitle,
      toastMessage,
      showDeleteModal,
      isDeleting,
      loadGuruDetail,
      goBack,
      editGuru,
      confirmDeleteGuru,
      getInitials,
      formatDate,
      getSchoolName,
      getSchoolClass,
      getRoleName,
      getRoleClass,
      getStatusText,
      getStatusClass
    }
  }
}
</script> 