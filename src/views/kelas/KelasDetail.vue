<template>
  <div :class="[
    'min-h-screen py-8 transition-colors duration-300',
    isDarkMode ? 'bg-dark-background' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
  ]"style="padding-top: 5rem;">
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
                  Konfirmasi Hapus Kelas
                </h3>
                <div class="mt-3">
                  <p class="text-sm text-gray-600">
                    Apakah Anda yakin ingin menghapus kelas <span class="font-semibold text-gray-900">"{{ kelasStore.getCurrentKelas?.nama_kelas || 'ini' }}"</span>?
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
              @click="confirmDeleteKelas"
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

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="mb-8">
        <button @click="goBack" :class="[
          'inline-flex items-center font-medium mb-6 px-4 py-2 rounded-lg transition-all duration-200',
          isDarkMode ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-700' : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
        ]">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Kembali ke Daftar Kelas
        </button>
        
        <!-- Enhanced Header Card -->
        <div :class="[
          'rounded-2xl shadow-lg p-6',
          isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
        ]">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-3">
                  <h1 :class="[
                    'text-2xl font-bold',
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">Detail Kelas</h1>
                  <div class="flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full">
                    <div class="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    <span class="text-sm font-medium">Live Data</span>
                  </div>
                </div>
                <p :class="[
                  'text-gray-600 mt-1',
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                ]">Informasi lengkap dan riwayat aktivitas kelas</p>
              </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="flex items-center space-x-3">
              <button @click="loadKelasDetail" :class="[
                'inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all shadow-sm hover:shadow-md',
                isDarkMode ? 'text-gray-300 bg-dark-surface border-dark-border hover:bg-gray-700' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
              ]">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Refresh
              </button>
              <button :class="[
                'inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all shadow-sm hover:shadow-md',
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
      </div>

      <!-- Loading State -->
      <div v-if="kelasStore.isLoading" :class="[
        'rounded-2xl shadow-lg p-12',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <div class="text-center">
          <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h3 :class="[
            'text-lg font-semibold mb-2',
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          ]">Memuat Detail Kelas</h3>
          <p :class="[
            'text-gray-600',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">Mohon tunggu sebentar...</p>
        </div>
      </div>
            
      <!-- Error State -->
      <div v-else-if="kelasStore.getError" :class="[
        'rounded-2xl shadow-lg border p-12',
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
          ]">{{ kelasStore.getError }}</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button @click="loadKelasDetail" :class="[
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

      <!-- Kelas Detail Content -->
      <div v-else-if="kelasStore.getCurrentKelas" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- ⭐ LEFT COLUMN: Informasi Kelas (Sidebar) -->
        <div class="lg:col-span-1">
          <div :class="[
            'rounded-2xl shadow-lg overflow-hidden sticky top-6',
            isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
          ]">
            <!-- Profile Header -->
            <div class="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-6 py-8">
              <div class="text-center">
                <div class="inline-flex h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm items-center justify-center ring-4 ring-white/30 mb-4">
                  <span class="text-2xl font-bold text-white">
                    {{ getInitials(kelasStore.getCurrentKelas.nama_kelas) }}
                  </span>
                </div>
                <h2 class="text-xl font-bold text-white mb-2">{{ kelasStore.getCurrentKelas.nama_kelas || 'Nama Kelas Tidak Tersedia' }}</h2>
                <p class="text-blue-100 text-sm mb-3">{{ kelasStore.getCurrentKelas.tahun_ajaran || 'Tahun Ajaran Tidak Tersedia' }}</p>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" :class="getStatusClass(kelasStore.getCurrentKelas)">
                    <div class="w-2 h-2 rounded-full mr-2" :class="kelasStore.getCurrentKelas?.wali_kelas ? 'bg-green-400' : 'bg-red-400'"></div>
                    {{ getStatusText(kelasStore.getCurrentKelas) }}
                  </span>
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" :class="getTingkatClass(kelasStore.getCurrentKelas.tingkat)">
                    {{ getTingkatName(kelasStore.getCurrentKelas.tingkat) }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Details Section -->
            <div :class="[
              'px-6 py-6',
              isDarkMode ? 'bg-dark-surface' : 'bg-white'
            ]">
              <div class="space-y-6">
              <!-- Personal Information -->
              <div class="space-y-6">
                <div :class="[
                  'rounded-lg p-4',
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                ]">
                  <h3 :class="[
                    'text-base font-semibold mb-4',
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">Informasi Kelas</h3>
                  <div class="space-y-4">
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">ID Kelas</span>
                      <span :class="[
                        'text-sm font-semibold',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ kelasStore.getCurrentKelas.id_kelas }}</span>
              </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Tahun Ajaran</span>
                      <span :class="[
                        'text-sm',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ kelasStore.getCurrentKelas.tahun_ajaran || 'Tidak Tersedia' }}</span>
                </div>
                    <div class="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Tingkat</span>
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">
                        {{ getTingkatName(kelasStore.getCurrentKelas.tingkat) || 'Tidak Tersedia' }}
                      </span>
                    </div>
                    <div class="py-2 border-b border-gray-200 last:border-b-0">
                      <div class="flex justify-between items-start">
                        <span :class="[
                          'text-sm font-medium',
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        ]">Fase</span>
                        <div class="text-right">
                          <span v-if="faseLoading" :class="[
                            'text-sm',
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          ]">Memuat...</span>
                          <template v-else>
                            <div :class="[
                              'text-sm font-medium',
                              isDarkMode ? 'text-gray-100' : 'text-gray-900'
                            ]">
                              {{ getFaseInfo(kelasStore.getCurrentKelas.id_fase).nama }}
                            </div>
                            <div 
                              v-if="getFaseInfo(kelasStore.getCurrentKelas.id_fase).keterangan" 
                              :class="[
                                'text-xs mt-0.5',
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              ]"
                            >
                              {{ getFaseInfo(kelasStore.getCurrentKelas.id_fase).keterangan }}
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-between items-center py-2">
                      <span :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Tanggal Dibuat</span>
                      <span :class="[
                        'text-sm',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ formatDate(kelasStore.getCurrentKelas.created_at) }}</span>
                    </div>
        </div>
      </div>
    </div>

              <!-- Informasi Tambahan -->
              <div>
                <h3 :class="[
                  'text-sm font-semibold mb-3',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">📋 Informasi Tambahan</h3>
                <div :class="[
                  'rounded-lg p-4',
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                ]">
                  <div class="space-y-3">
                    <div class="flex justify-between items-center py-2 border-b last:border-b-0" :class="isDarkMode ? 'border-gray-600' : 'border-gray-200'">
                      <span :class="[
                        'text-xs font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Sekolah</span>
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getSchoolClass(kelasStore.getCurrentKelas.id_sekolah)">
                        {{ getSchoolName(kelasStore.getCurrentKelas.id_sekolah) }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b last:border-b-0" :class="isDarkMode ? 'border-gray-600' : 'border-gray-200'">
                      <span :class="[
                        'text-xs font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">ID Wali Kelas</span>
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getWaliKelasClass(kelasStore.getCurrentKelas.id_wali_kelas)">
                        {{ kelasStore.getCurrentKelas.id_wali_kelas || 'Belum Ditentukan' }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center py-2 border-b last:border-b-0" :class="isDarkMode ? 'border-gray-600' : 'border-gray-200'">
                      <span :class="[
                        'text-xs font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Wali Kelas</span>
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getWaliKelasClass(kelasStore.getCurrentKelas.id_wali_kelas)">
                        {{ getWaliKelasName(kelasStore.getCurrentKelas.id_wali_kelas) }}
                      </span>
                    </div>
                    <div class="flex justify-between items-center py-2">
                      <span :class="[
                        'text-xs font-medium',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">Terakhir Update</span>
                      <span :class="[
                        'text-xs',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ formatDate(kelasStore.getCurrentKelas.updated_at) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Divider -->
              <div :class="['border-t', isDarkMode ? 'border-gray-700' : 'border-gray-200']"></div>

              <!-- Action Buttons -->
              <div class="space-y-2">
                <button @click="editKelas" :class="[
                  'w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg'
                ]">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                  Edit Kelas
                </button>
                <button @click="showDeleteModal = true" :class="[
                  'w-full inline-flex items-center justify-center px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all',
                  isDarkMode ? 'border-red-700 text-red-400 bg-red-900/20 hover:bg-red-900/30' : 'border-red-300 text-red-600 bg-red-50 hover:bg-red-100'
                ]">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Hapus Kelas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Left Column -->

      <!-- ⭐ RIGHT COLUMN: Content -->
      <div class="lg:col-span-2 space-y-6">

        <!-- ⭐ Statistik Kelas -->
        <div :class="[
          'rounded-2xl shadow-lg border overflow-hidden',
          isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
        ]">
          <div :class="[
            'px-8 py-5 border-b',
            isDarkMode ? 'bg-gray-800 border-dark-border' : 'bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200'
          ]">
            <h3 :class="[
              'text-lg font-semibold',
              isDarkMode ? 'text-gray-100' : 'text-gray-900'
            ]">📊 Statistik Kelas</h3>
          </div>
          <div :class="[
            'px-8 py-6',
            isDarkMode ? 'bg-dark-surface' : 'bg-white'
          ]">
            <div v-if="siswaLoading || pengampuLoading" class="text-center py-8">
              <div class="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <p :class="[
                'mt-3 text-sm',
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]">Memuat statistik...</p>
            </div>
            <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <!-- Total Siswa -->
              <div :class="[
                'p-4 rounded-lg border',
                isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-blue-50 border-blue-200'
              ]">
                <div class="flex items-center justify-between">
                  <div>
                    <p :class="[
                      'text-sm font-medium',
                      isDarkMode ? 'text-gray-300' : 'text-blue-600'
                    ]">Total Siswa</p>
                    <p :class="[
                      'text-2xl font-bold mt-1',
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    ]">{{ siswaList.length }}</p>
                  </div>
                  <div :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                  ]">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Siswa Laki-laki -->
              <div :class="[
                'p-4 rounded-lg border',
                isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-green-50 border-green-200'
              ]">
                <div class="flex items-center justify-between">
                  <div>
                    <p :class="[
                      'text-sm font-medium',
                      isDarkMode ? 'text-gray-300' : 'text-green-600'
                    ]">Laki-laki</p>
                    <p :class="[
                      'text-2xl font-bold mt-1',
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    ]">{{ statistikSiswa.lakiLaki }}</p>
                  </div>
                  <div :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    isDarkMode ? 'bg-green-900/30' : 'bg-green-100'
                  ]">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Siswa Perempuan -->
              <div :class="[
                'p-4 rounded-lg border',
                isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-pink-50 border-pink-200'
              ]">
                <div class="flex items-center justify-between">
                  <div>
                    <p :class="[
                      'text-sm font-medium',
                      isDarkMode ? 'text-gray-300' : 'text-pink-600'
                    ]">Perempuan</p>
                    <p :class="[
                      'text-2xl font-bold mt-1',
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    ]">{{ statistikSiswa.perempuan }}</p>
                  </div>
                  <div :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    isDarkMode ? 'bg-pink-900/30' : 'bg-pink-100'
                  ]">
                    <svg class="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Guru Pengampu -->
              <div :class="[
                'p-4 rounded-lg border',
                isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-purple-50 border-purple-200'
              ]">
                <div class="flex items-center justify-between">
                  <div>
                    <p :class="[
                      'text-sm font-medium',
                      isDarkMode ? 'text-gray-300' : 'text-purple-600'
                    ]">Guru Pengampu</p>
                    <p :class="[
                      'text-2xl font-bold mt-1',
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    ]">{{ pengampuList.length }}</p>
                  </div>
                  <div :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'
                  ]">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ⭐ Daftar Guru Pengampu -->
        <div :class="[
          'rounded-2xl shadow-lg border overflow-hidden',
          isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
        ]">
          <div :class="[
            'px-8 py-5 border-b',
            isDarkMode ? 'bg-gray-800 border-dark-border' : 'bg-gradient-to-r from-indigo-50 to-blue-50 border-gray-200'
          ]">
            <div class="flex items-center justify-between">
              <h3 :class="[
                'text-lg font-semibold',
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              ]">👨‍🏫 Daftar Guru Pengampu</h3>
              <span :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                isDarkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800'
              ]">{{ pengampuList.length }} Guru</span>
            </div>
          </div>
          <div :class="[
            'px-8 py-6',
            isDarkMode ? 'bg-dark-surface' : 'bg-white'
          ]">
            <!-- Loading State -->
            <div v-if="pengampuLoading" class="text-center py-8">
              <div class="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
              <p :class="[
                'mt-3 text-sm',
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]">Memuat daftar guru pengampu...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="pengampuList.length === 0" class="text-center py-12">
              <div :class="[
                'w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center',
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              ]">
                <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 :class="[
                'text-lg font-medium mb-2',
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              ]">Belum Ada Guru Pengampu</h3>
              <p :class="[
                'text-sm',
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]">Belum ada guru yang ditugaskan mengajar di kelas ini.</p>
            </div>

            <!-- Guru Pengampu List -->
            <div v-else class="space-y-3">
              <div
                v-for="(pengampu, index) in pengampuList"
                :key="pengampu.id_pengampu"
                :class="[
                  'p-4 rounded-lg border transition-all',
                  isDarkMode ? 'bg-gray-700 border-gray-600 hover:border-purple-500' : 'bg-gray-50 border-gray-200 hover:border-purple-400 hover:shadow-md'
                ]"
              >
                <div class="flex items-start justify-between">
                  <div class="flex items-start space-x-4 flex-1">
                    <!-- Number Badge -->
                    <div :class="[
                      'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold',
                      isDarkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
                    ]">
                      {{ index + 1 }}
                    </div>
                    
                    <!-- Guru Info -->
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center space-x-2 mb-1">
                        <h4 :class="[
                          'font-semibold text-base',
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        ]">{{ getGuruName(pengampu.id_guru) }}</h4>
                        <!-- Badge if wali kelas -->
                        <span
                          v-if="pengampu.id_guru == kelasStore.getCurrentKelas.id_wali_kelas"
                          class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                        >
                          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                          Wali Kelas
                        </span>
                      </div>
                      <p :class="[
                        'text-sm',
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      ]">ID Guru: {{ pengampu.id_guru }}</p>
                      <p :class="[
                        'text-sm mt-1',
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      ]">
                        <span class="font-medium">Tahun Ajaran:</span> {{ pengampu.tahun_ajaran || 'Tidak Tersedia' }}
                      </p>
                    </div>
                  </div>

                  <!-- Action Button -->
                  <button
                    @click="viewGuruDetail(pengampu.id_guru)"
                    :class="[
                      'ml-4 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                      isDarkMode ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    ]"
                  >
                    <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ⭐ Daftar Siswa -->
        <div :class="[
          'rounded-2xl shadow-lg border overflow-hidden',
          isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
        ]">
          <div :class="[
            'px-8 py-5 border-b',
            isDarkMode ? 'bg-gray-800 border-dark-border' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-gray-200'
          ]">
            <div class="flex items-center justify-between">
              <h3 :class="[
                'text-lg font-semibold',
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              ]">👥 Daftar Siswa</h3>
              <span :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-800'
              ]">{{ siswaList.length }} Siswa</span>
            </div>
          </div>
          <div :class="[
            'px-8 py-6',
            isDarkMode ? 'bg-dark-surface' : 'bg-white'
          ]">
            <!-- Loading State -->
            <div v-if="siswaLoading" class="text-center py-8">
              <div class="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <p :class="[
                'mt-3 text-sm',
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]">Memuat daftar siswa...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="siswaList.length === 0" class="text-center py-12">
              <div :class="[
                'w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center',
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              ]">
                <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 :class="[
                'text-lg font-medium mb-2',
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              ]">Belum Ada Siswa</h3>
              <p :class="[
                'text-sm',
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]">Belum ada siswa yang terdaftar di kelas ini.</p>
            </div>

            <!-- Siswa List -->
            <div v-else class="space-y-3">
              <div
                v-for="(siswa, index) in siswaList"
                :key="siswa.id_siswa"
                :class="[
                  'p-4 rounded-lg border transition-all cursor-pointer',
                  isDarkMode ? 'bg-gray-700 border-gray-600 hover:border-blue-500' : 'bg-gray-50 border-gray-200 hover:border-blue-400 hover:shadow-md'
                ]"
                @click="viewSiswaDetail(siswa.id_siswa)"
              >
                <div class="flex items-start justify-between">
                  <div class="flex items-start space-x-4 flex-1">
                    <!-- Number Badge -->
                    <div :class="[
                      'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold',
                      isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                    ]">
                      {{ index + 1 }}
                    </div>
                    
                    <!-- Siswa Info -->
                    <div class="flex-1 min-w-0">
                      <h4 :class="[
                        'font-semibold text-base mb-1',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ siswa.nama }}</h4>
                      <div class="flex flex-wrap gap-2 text-sm">
                        <span :class="[
                          'inline-flex items-center',
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        ]">
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                          </svg>
                          NISN: {{ siswa.nisn || '-' }}
                        </span>
                        <span :class="[
                          'px-2 py-0.5 rounded-full text-xs font-medium',
                          siswa.jenis_kelamin === 'L' 
                            ? (isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800')
                            : (isDarkMode ? 'bg-pink-900/30 text-pink-300' : 'bg-pink-100 text-pink-800')
                        ]">
                          {{ getJenisKelamin(siswa.jenis_kelamin) }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Action Button -->
                  <button
                    @click.stop="viewSiswaDetail(siswa.id_siswa)"
                    :class="[
                      'ml-4 px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                      isDarkMode ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    ]"
                  >
                    <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!-- End Right Column -->

    </div>
    <!-- End 2 Column Grid -->

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
          ]">Kelas Tidak Ditemukan</h3>
          <p :class="[
            'text-gray-600 mb-6',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">Kelas dengan ID <span class="font-medium">{{ $route.params.id }}</span> tidak ditemukan dalam sistem.</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button @click="goBack" :class="[
              'inline-flex items-center px-4 py-2 rounded-lg transition-all',
              isDarkMode ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            ]">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Kembali ke Daftar Kelas
            </button>
            <button @click="loadKelasDetail" :class="[
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
import { useKelasStore } from '@/stores/kelas'
import { useGuruStore } from '@/stores/guru'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { useSekolahScopeStore } from '@/stores/sekolahScope'
import axios from 'axios'
import Toast from '@/components/common/Toast.vue'

export default {
  name: 'KelasDetail',
  components: {
    Toast
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const kelasStore = useKelasStore()
    const guruStore = useGuruStore()
    const authStore = useAuthStore()
    const sekolahScope = useSekolahScopeStore()
    // Load guru list for mapping wali kelas
    const loadGuruList = async () => {
      try {
        await guruStore.fetchGuruList()
      } catch (error) {
        console.error('Failed to load guru list:', error)
      }
    }

    // Helper to get wali kelas name by id
    const getWaliKelasName = (waliKelasId) => {
      if (!waliKelasId) return 'Belum Ditentukan'
      const guru = guruStore.getGuruList.find(g => g.id_guru == waliKelasId)
      return guru ? guru.nama : `Guru ID ${waliKelasId}`
    }
    const themeStore = useThemeStore()
    const isDarkMode = computed(() => themeStore.isDarkMode)

    // Toast state
    const showToast = ref(false)
    const toastType = ref('success')
    const toastTitle = ref('')
    const toastMessage = ref('')

    // Delete modal state
    const showDeleteModal = ref(false)
    const isDeleting = ref(false)
    
    // Fase list state
    const faseList = ref([])
    const faseLoading = ref(false)

    // ⭐ NEW: Siswa list state
    const siswaList = ref([])
    const siswaLoading = ref(false)

    // ⭐ NEW: Pengampu list state
    const pengampuList = ref([])
    const pengampuLoading = ref(false)

    // ⭐ NEW: Computed statistik siswa
    const statistikSiswa = computed(() => {
      const lakiLaki = siswaList.value.filter(s => s.jenis_kelamin === 'L').length
      const perempuan = siswaList.value.filter(s => s.jenis_kelamin === 'P').length
      return {
        lakiLaki,
        perempuan
      }
    })

    // Toast helper
    const showToastMessage = (type, title, message) => {
      toastType.value = type
      toastTitle.value = title
      toastMessage.value = message
      showToast.value = true
    }

    // Methods
    const loadKelasDetail = async () => {
      try {
        await kelasStore.fetchKelasDetail(route.params.id)
        
        // ⭐ VALIDASI: Pastikan kelas milik sekolah user yang login
        const kelas = kelasStore.getCurrentKelas
        const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
        if (userSekolahId && kelas?.id_sekolah && parseInt(kelas.id_sekolah) !== parseInt(userSekolahId)) {
          showToastMessage('error', 'Akses Ditolak', 'Anda tidak memiliki akses untuk melihat kelas dari sekolah lain!')
          setTimeout(() => router.push({ name: 'kelas-list' }), 1000)
          return
        }
      } catch (error) {
        console.error('Failed to load kelas detail:', error)
      }
    }

    const goBack = () => {
      router.push({ name: 'kelas-list' })
    }

    const editKelas = () => {
      router.push({ name: 'kelas-edit', params: { id: route.params.id } })
    }

    const confirmDeleteKelas = async () => {
      const kelas = kelasStore.getCurrentKelas
      
      // ⭐ VALIDASI: Pastikan kelas milik sekolah user yang login sebelum hapus
      const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
      if (userSekolahId && kelas?.id_sekolah && parseInt(kelas.id_sekolah) !== parseInt(userSekolahId)) {
        showDeleteModal.value = false
        showToastMessage('error', 'Akses Ditolak', 'Anda tidak dapat menghapus kelas dari sekolah lain!')
        return
      }
      
      try {
        isDeleting.value = true
        
        console.log('Deleting kelas with route params:', route.params)
        console.log('Kelas ID from route:', route.params.id)
        console.log('Current kelas data:', kelas)
        
        await kelasStore.deleteKelas(route.params.id)
        
        // Close modal
        showDeleteModal.value = false
        isDeleting.value = false
        
        // Show success toast
        showToastMessage(
          'success',
          'Berhasil!',
          `Kelas "${kelas?.nama_kelas || 'tersebut'}" berhasil dihapus dari sistem.`
        )
        
        // Redirect after toast duration
        setTimeout(() => {
          router.push({ name: 'kelas-list' })
        }, 1500)
        
      } catch (error) {
        isDeleting.value = false
        showDeleteModal.value = false
        
        console.error('Failed to delete kelas:', error)
        console.error('Error details:', error.response?.data)
        
        // Show error message yang lebih detail
        let errorMessage = 'Terjadi kesalahan saat menghapus kelas'
        
        if (error.response?.status === 500) {
          errorMessage = 'Server error: Kemungkinan ada masalah di backend atau endpoint tidak sesuai'
        } else if (error.response?.status === 404) {
          errorMessage = 'Data kelas tidak ditemukan atau sudah dihapus sebelumnya'
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
      const schools = {
        1: 'SMA Negeri 1 Semarang',
        2: 'SMA Negeri 2 Semarang'
      }
      return schools[schoolId] || 'Sekolah Lain'
    }

    const getSchoolClass = (schoolId) => {
      if (!schoolId) return 'bg-gray-100 text-gray-800'
      const classes = {
        1: 'bg-green-100 text-green-800',
        2: 'bg-blue-100 text-blue-800'
      }
      return classes[schoolId] || 'bg-gray-100 text-gray-800'
    }

    const getTingkatName = (tingkat) => {
      if (!tingkat) return 'Tidak Diketahui'
      const tingkatMap = {
        'X': 'Kelas X',
        'XI': 'Kelas XI',
        'XII': 'Kelas XII'
      }
      return tingkatMap[tingkat] || tingkat
    }

    const getTingkatClass = (tingkat) => {
      if (!tingkat) return 'bg-gray-100 text-gray-800'
      const classes = {
        'X': 'bg-green-100 text-green-800',
        'XI': 'bg-blue-100 text-blue-800',
        'XII': 'bg-purple-100 text-purple-800'
      }
      return classes[tingkat] || 'bg-gray-100 text-gray-800'
    }

    const getStatusText = (kelas) => {
      // Anggap aktif jika kelas memiliki wali kelas
      return kelas?.wali_kelas ? 'Aktif' : 'Belum Aktif'
    }

    const getStatusClass = (kelas) => {
      return kelas?.wali_kelas ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }


    const getWaliKelasClass = (waliKelas) => {
      return waliKelas ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
    }

    // Fetch fase list from API
    const fetchFaseList = async () => {
      try {
        faseLoading.value = true
        const response = await axios.get('/view/fase')
        if (response.data && response.data.success) {
          faseList.value = response.data.data || []
        }
      } catch (error) {
        console.error('Failed to fetch fase list:', error)
        // Try alternative endpoint
        try {
          const altResponse = await axios.get('/list/fase')
          if (altResponse.data && altResponse.data.success) {
            faseList.value = altResponse.data.data || []
          }
        } catch (altError) {
          console.error('Alternative endpoint also failed:', altError)
          faseList.value = []
        }
      } finally {
        faseLoading.value = false
      }
    }

    // Helper to get fase info by id (returns object with nama and keterangan)
    const getFaseInfo = (faseId) => {
      if (!faseId) return { nama: 'Tidak Tersedia', keterangan: null }
      const fase = faseList.value.find(f => f.id_fase == faseId)
      if (fase) {
        return {
          nama: fase.nama_fase,
          keterangan: fase.keterangan
        }
      }
      return { nama: `Fase ID ${faseId}`, keterangan: null }
    }

    // Helper to get fase name by id (for backward compatibility)
    const getFaseName = (faseId) => {
      const info = getFaseInfo(faseId)
      return info.keterangan ? `${info.nama} - ${info.keterangan}` : info.nama
    }

    // ⭐ NEW: Fetch siswa by kelas
    const fetchSiswaByKelas = async () => {
      try {
        siswaLoading.value = true
        const kelasId = route.params.id
        const response = await axios.get('/list/siswa')
        
        if (response.data && response.data.success) {
          // Filter siswa by id_kelas
          siswaList.value = response.data.data.filter(siswa => siswa.id_kelas == kelasId) || []
          console.log(`Loaded ${siswaList.value.length} siswa for kelas ${kelasId}`)
        } else {
          siswaList.value = []
        }
      } catch (error) {
        console.error('Failed to fetch siswa list:', error)
        siswaList.value = []
      } finally {
        siswaLoading.value = false
      }
    }

    // ⭐ NEW: Fetch pengampu by kelas
    const fetchPengampuByKelas = async () => {
      try {
        pengampuLoading.value = true
        const kelasId = route.params.id
        const response = await axios.get('/list/pengampu')
        
        if (response.data && response.data.success) {
          // Filter pengampu by id_kelas
          pengampuList.value = response.data.data.filter(pengampu => pengampu.id_kelas == kelasId) || []
          console.log(`Loaded ${pengampuList.value.length} pengampu for kelas ${kelasId}`)
        } else {
          pengampuList.value = []
        }
      } catch (error) {
        console.error('Failed to fetch pengampu list:', error)
        pengampuList.value = []
      } finally {
        pengampuLoading.value = false
      }
    }

    // ⭐ NEW: Helper to get guru name by id
    const getGuruName = (guruId) => {
      if (!guruId) return 'Tidak Diketahui'
      const guru = guruStore.getGuruList.find(g => g.id_guru == guruId)
      return guru ? guru.nama : `Guru ID ${guruId}`
    }

    // ⭐ NEW: Helper to get jenis kelamin text
    const getJenisKelamin = (jk) => {
      if (!jk) return '-'
      return jk === 'L' ? 'Laki-laki' : jk === 'P' ? 'Perempuan' : jk
    }

    // ⭐ NEW: Navigation to guru detail
    const viewGuruDetail = (guruId) => {
      router.push({ name: 'guru-detail', params: { id: guruId } })
    }

    // ⭐ NEW: Navigation to siswa detail
    const viewSiswaDetail = (siswaId) => {
      router.push({ name: 'SiswaDetail', params: { id: siswaId } })
    }

    // Lifecycle
    onMounted(async () => {
      await loadKelasDetail()
      await Promise.all([
        loadGuruList(),
        fetchFaseList(),
        fetchSiswaByKelas(),
        fetchPengampuByKelas()
      ])
    })

    onUnmounted(() => {
      kelasStore.clearCurrentKelas()
    })

    return {
      kelasStore,
      guruStore,
      themeStore,
      isDarkMode,
      showToast,
      toastType,
      toastTitle,
      toastMessage,
      showDeleteModal,
      isDeleting,
      faseList,
      faseLoading,
      siswaList,
      siswaLoading,
      pengampuList,
      pengampuLoading,
      statistikSiswa,
      loadKelasDetail,
      goBack,
      editKelas,
      confirmDeleteKelas,
      getInitials,
      formatDate,
      getSchoolName,
      getSchoolClass,
      getTingkatName,
      getTingkatClass,
      getWaliKelasClass,
      getStatusText,
      getStatusClass,
      getWaliKelasName,
      getFaseName,
      getFaseInfo,
      getGuruName,
      getJenisKelamin,
      viewGuruDetail,
      viewSiswaDetail
    }
  }
}
</script>
