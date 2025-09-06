<template>
  <div :class="[
    'min-h-screen py-8 transition-colors duration-300',
    isDarkMode ? 'bg-dark-background' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
  ]">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <button @click="goBack" :class="[
          'inline-flex items-center font-medium mb-6 px-4 py-2 rounded-lg transition-all duration-200',
          isDarkMode ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-700' : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
        ]">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          {{ isAddMode ? 'Kembali ke Daftar Kelas' : 'Kembali ke Detail Kelas' }}
        </button>
        
        <!-- Enhanced Header Card -->
        <div :class="[
          'rounded-2xl shadow-lg p-6 mb-8',
          isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
        ]">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" v-if="isAddMode"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" v-else></path>
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h1 :class="[
                'text-2xl font-bold mb-1',
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              ]">
                {{ isAddMode ? 'Tambah Kelas Baru' : 'Edit Data Kelas' }}
              </h1>
              <p :class="[
                'text-gray-600',
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              ]">
                {{ isAddMode ? 'Lengkapi formulir untuk menambahkan kelas baru ke sistem' : 'Perbarui informasi kelas yang sudah ada' }}
              </p>
            </div>
            <div class="hidden md:flex items-center space-x-2">
              <div class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {{ isAddMode ? 'Mode Tambah' : 'Mode Edit' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="kelasStore.isLoading && !form.nama_kelas && !isAddMode" :class="[
        'rounded-2xl shadow-lg p-12',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h3 :class="[
            'text-lg font-semibold mb-2',
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          ]">Memuat Data Kelas</h3>
          <p :class="[
            'text-gray-600',
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          ]">Mohon tunggu sebentar...</p>
        </div>
      </div>

      <!-- Form -->
      <div v-else :class="[
        'rounded-2xl shadow-lg overflow-hidden',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <!-- Form Header -->
        <div :class="[
          'px-8 py-6 border-b',
          isDarkMode ? 'bg-gray-700 border-dark-border' : 'bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200'
        ]">
          <div class="flex items-center justify-between">
            <div>
              <h2 :class="[
                'text-lg font-semibold',
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              ]">Formulir Data Kelas</h2>
              <p :class="[
                'text-sm mt-1',
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              ]">Field bertanda * wajib diisi</p>
            </div>
            <div :class="[
              'flex items-center space-x-2 text-sm',
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            ]">
              <span class="text-red-500">*</span>
              <span>Field wajib diisi</span>
            </div>
          </div>
        </div>
        
        <form @submit.prevent="submitForm" class="p-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Personal Information -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <h3 :class="[
                    'text-base font-semibold',
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">Informasi Kelas</h3>
                  <p :class="[
                    'text-sm',
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  ]">Data kelas</p>
                </div>
              </div>
              
              <!-- Nama Kelas -->
              <div class="group">
                <label for="nama_kelas" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    Nama Kelas <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <input
                  v-model="form.nama_kelas"
                  type="text"
                  id="nama_kelas"
                  required
                  @input="watchFormChanges"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white'
                  ]"
                  placeholder="Masukkan nama kelas (contoh: X IPA 1)"
                />
              </div>

      <!-- Tahun Ajaran -->
              <div class="group">
                <label for="tahun_ajaran" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Tahun Ajaran <span class="text-gray-500 ml-1">(opsional)</span>
                  </span>
                </label>
                <input
                  v-model="form.tahun_ajaran"
                  type="text"
                  id="tahun_ajaran"
                  @input="watchFormChanges"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white'
                  ]"
                  placeholder="Masukkan tahun ajaran (contoh: 2024/2025)"
                />
              </div>

              <!-- Tingkat -->
              <div class="group">
                <label for="tingkat" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                    </svg>
                    Tingkat <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <select
                  v-model="form.tingkat"
                  id="tingkat"
                  required
                  @change="watchFormChanges"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300 bg-white'
                  ]"
                >
                  <option value="" disabled>Pilih Tingkat</option>
                  <option value="1">Kelas 1</option>
                  <option value="2">Kelas 2</option>
                  <option value="3">Kelas 3</option>
                  <option value="4">Kelas 4</option>
                  <option value="5">Kelas 5</option>
                  <option value="6">Kelas 6</option>
                  <option value="7">Kelas 7</option>
                  <option value="8">Kelas 8</option>
                  <option value="9">Kelas 9</option>
                  <option value="10">Kelas 10</option>
                  <option value="11">Kelas 11</option>
                  <option value="12">Kelas 12</option>
                </select>
              </div>
            </div>

            <!-- Additional Information -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h3 :class="[
                    'text-base font-semibold',
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">Informasi Tambahan</h3>
                  <p :class="[
                    'text-sm',
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  ]">Data jurusan, sekolah dan wali kelas</p>
                </div>
              </div>

              <!-- Sekolah -->
              <div class="group">
                <label for="id_sekolah" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    Sekolah <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <select
                  v-model="form.id_sekolah"
                  id="id_sekolah"
                  required
                  @change="watchFormChanges"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300 bg-white'
                  ]"
                >
                  <option value="" disabled>Pilih Sekolah</option>
                  <option value="1">SMA Negeri 1 Semarang</option>
                  <option value="2">SMA Negeri 2 Semarang</option>
                </select>
              </div>

              <!-- ID Wali Kelas -->
              <div class="group">
                <label for="id_wali_kelas" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    ID Wali Kelas <span class="text-gray-500 ml-1">(opsional)</span>
                  </span>
                </label>
                <input
                  v-model="form.id_wali_kelas"
                  type="number"
                  id="id_wali_kelas"
                  @input="watchFormChanges"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white'
                  ]"
                  placeholder="Masukkan ID wali kelas (contoh: 1, 4)"
                />
              </div>

            </div>
          </div>

          <!-- Student Management Section -->
          <div v-if="!isAddMode" class="mt-8 pt-8 border-t border-gray-200">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <div>
                <h3 :class="[
                  'text-base font-semibold',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">Manajemen Siswa</h3>
                <p :class="[
                  'text-sm',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Kelola daftar siswa yang terdaftar di kelas ini</p>
              </div>
            </div>

            <!-- Current Students List -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-4">
                <h4 :class="[
                  'text-sm font-medium',
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                ]">Siswa Terdaftar ({{ currentStudents.length }})</h4>
                <button 
                  @click="loadCurrentStudents"
                  :disabled="kelasStore.isLoading"
                  :class="[
                    'inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200',
                    isDarkMode ? 'text-blue-300 bg-blue-900/30 border border-blue-700 hover:bg-blue-900/50' : 'text-blue-600 bg-blue-50 border border-blue-200 hover:bg-blue-100'
                  ]"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Refresh
                </button>
              </div>

              <!-- Students List -->
              <div v-if="currentStudents.length > 0" class="space-y-2 max-h-48 overflow-y-auto">
                <div 
                  v-for="siswa in currentStudents" 
                  :key="siswa.id_siswa"
                  :class="[
                    'flex items-center justify-between p-3 rounded-lg border',
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  ]"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium text-blue-600">{{ siswa.nama?.charAt(0) || '?' }}</span>
                    </div>
                    <div>
                      <p :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ siswa.nama || 'Nama tidak tersedia' }}</p>
                      <p :class="[
                        'text-xs',
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      ]">NISN: {{ siswa.nisn || 'Tidak ada' }}</p>
                    </div>
                  </div>
                  <button 
                    @click="removeStudentFromClass(siswa.id_siswa)"
                    :disabled="isManagingStudents"
                    :class="[
                      'inline-flex items-center px-2 py-1 text-xs font-medium rounded transition-all duration-200',
                      isDarkMode ? 'text-red-300 bg-red-900/30 hover:bg-red-900/50' : 'text-red-600 bg-red-50 hover:bg-red-100'
                    ]"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Hapus
                  </button>
                </div>
              </div>
              <div v-else class="text-center py-8">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                </div>
                <p :class="[
                  'text-sm',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Belum ada siswa yang terdaftar di kelas ini</p>
              </div>
            </div>

            <!-- Add Students Section -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <h4 :class="[
                  'text-sm font-medium',
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                ]">Tambah Siswa ke Kelas</h4>
                <button 
                  @click="loadAvailableStudents"
                  :disabled="kelasStore.isLoading"
                  :class="[
                    'inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200',
                    isDarkMode ? 'text-green-300 bg-green-900/30 border border-green-700 hover:bg-green-900/50' : 'text-green-600 bg-green-50 border border-green-200 hover:bg-green-100'
                  ]"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Load Siswa
                </button>
              </div>

              <!-- Available Students List -->
              <div v-if="availableStudents.length > 0" class="space-y-2 max-h-48 overflow-y-auto">
                <div 
                  v-for="siswa in availableStudents" 
                  :key="siswa.id_siswa"
                  :class="[
                    'flex items-center justify-between p-3 rounded-lg border',
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  ]"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium text-green-600">{{ siswa.nama?.charAt(0) || '?' }}</span>
                    </div>
                    <div>
                      <p :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ siswa.nama || 'Nama tidak tersedia' }}</p>
                      <p :class="[
                        'text-xs',
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      ]">NISN: {{ siswa.nisn || 'Tidak ada' }}</p>
                    </div>
                  </div>
                  <button 
                    @click="addStudentToClass(siswa.id_siswa)"
                    :disabled="isManagingStudents"
                    :class="[
                      'inline-flex items-center px-2 py-1 text-xs font-medium rounded transition-all duration-200',
                      isDarkMode ? 'text-green-300 bg-green-900/30 hover:bg-green-900/50' : 'text-green-600 bg-green-50 hover:bg-green-100'
                    ]"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Tambah
                  </button>
                </div>
              </div>
              <div v-else class="text-center py-8">
                <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                  </svg>
                </div>
                <p :class="[
                  'text-sm',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Tidak ada siswa yang tersedia untuk ditambahkan</p>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div :class="[
            'mt-10 pt-8 border-t -mx-8 px-8 py-6',
            isDarkMode ? 'bg-gray-700 border-dark-border' : 'bg-gray-50 border-gray-200'
          ]">
            <div class="flex flex-col sm:flex-row gap-4 justify-between">
              <!-- Progress/Status Indicator -->
              <div class="flex items-center space-x-2 text-sm">
                <svg v-if="formValid" class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg v-else class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span :class="formValid ? 'text-green-600' : 'text-yellow-600'">
                  {{ formValid ? 'Form siap untuk disimpan' : 'Mohon lengkapi semua field wajib' }}
                </span>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  @click="goBack"
                  :class="[
                    'inline-flex items-center justify-center px-6 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md',
                    isDarkMode ? 'border-dark-border text-gray-300 bg-dark-surface hover:bg-gray-600' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  ]"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="isSubmitting || !formValid"
                  class="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  <svg v-if="isSubmitting" class="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ isSubmitting ? 'Menyimpan...' : (isAddMode ? 'Tambah Kelas' : 'Simpan Perubahan') }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Success/Error Messages -->
      <Toast
        :show="showToast"
        :type="toastType"
        :title="toastTitle"
        :message="toastMessage"
        :duration="toastDuration"
        :show-progress="toastType === 'success'"
        @close="closeToast"
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useKelasStore } from '@/stores/kelas'
import { useSiswaStore } from '@/stores/siswa'
import { useThemeStore } from '@/stores/theme'
import Toast from '@/components/common/Toast.vue'

export default {
  name: 'KelasEdit',
  components: {
    Toast
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const kelasStore = useKelasStore()
    const siswaStore = useSiswaStore()
    const themeStore = useThemeStore()
    const isDarkMode = computed(() => themeStore.isDarkMode)

    // State
    const form = reactive({
      nama_kelas: '',
      tahun_ajaran: '',
      tingkat: '',
      id_sekolah: '',
      id_wali_kelas: ''
    })

    const isSubmitting = ref(false)
    const message = ref('')
    const messageType = ref('')
    const formValid = ref(false)
    
    // Student management state
    const currentStudents = ref([])
    const availableStudents = ref([])
    const isManagingStudents = ref(false)
    
    // Toast notification state
    const showToast = ref(false)
    const toastType = ref('info')
    const toastTitle = ref('')
    const toastMessage = ref('')
    const toastDuration = ref(4000)
    
    const showNotification = (type, title, message, duration = 1500) => {
      toastType.value = type
      toastTitle.value = title
      toastMessage.value = message
      toastDuration.value = duration
      showToast.value = true
    }
    
    const closeToast = () => {
      showToast.value = false
    }

    // Computed
    const messageClass = computed(() => {
      return messageType.value === 'success' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    })

    const isAddMode = computed(() => !route.params.id)

    // Watch form changes for validation
    const checkFormValidity = () => {
      // Backend hanya membutuhkan: nama_kelas, tingkat, id_sekolah
      formValid.value = !!(
        form.nama_kelas.trim() &&
        form.tingkat &&
        form.id_sekolah
      )
    }

    // Methods
    const loadKelasDetail = async () => {
      try {
        await kelasStore.fetchKelasDetail(route.params.id)
        if (kelasStore.getCurrentKelas) {
          const kelas = kelasStore.getCurrentKelas
          form.nama_kelas = kelas.nama_kelas || ''
          form.tahun_ajaran = kelas.tahun_ajaran || ''
          form.tingkat = kelas.tingkat || ''
          form.id_sekolah = kelas.id_sekolah || ''
          form.id_wali_kelas = kelas.id_wali_kelas || ''
        }
      } catch (error) {
        console.error('Failed to load kelas detail:', error)
        showMessage('Gagal memuat data kelas', 'error')
      }
    }

    const submitForm = async () => {
      if (!form.nama_kelas || !form.tingkat || !form.id_sekolah) {
        showMessage('Mohon lengkapi semua field yang wajib diisi', 'error')
        showNotification('error', 'Validasi Gagal', 'Mohon lengkapi semua field yang wajib diisi')
        return
      }

      isSubmitting.value = true
      closeToast()
      
      // Show loading notification
      showNotification('info', 'Menyimpan Data', 'Sedang memproses data kelas...', 0)

      try {
        // Hanya kirim field yang didukung backend
        const formData = {
          nama_kelas: form.nama_kelas,
          tingkat: form.tingkat,
          tahun_ajaran: form.tahun_ajaran,
          id_sekolah: form.id_sekolah,
          id_wali_kelas: form.id_wali_kelas || null // Pastikan null jika kosong
        }

        if (isAddMode.value) {
          // Add new kelas
          await kelasStore.addKelas(formData)
          showMessage('Kelas baru berhasil ditambahkan!', 'success')
          
          closeToast()
          setTimeout(() => {
            showNotification('success', 'Kelas Berhasil Ditambahkan!', 'Data kelas baru telah disimpan. Anda akan diarahkan ke daftar kelas', 1500)
          }, 100)
          
          setTimeout(() => {
            router.push({ name: 'kelas-list' })
          }, 1500)
        } else {
          // Update existing kelas
          await kelasStore.updateKelas(route.params.id, formData)
          showMessage('Data kelas berhasil diperbarui!', 'success')
          
          closeToast()
          setTimeout(() => {
            showNotification('success', 'Data Berhasil Diperbarui!', 'Perubahan data kelas telah disimpan. Anda akan diarahkan ke detail kelas', 1500)
          }, 100)
          
          setTimeout(() => {
            router.push({ name: 'kelas-detail', params: { id: route.params.id } })
          }, 1500)
        }

      } catch (error) {
        console.error('Failed to save kelas:', error)
        showMessage(isAddMode.value ? 'Gagal menambahkan kelas baru' : 'Gagal menyimpan data kelas', 'error')
        
        closeToast()
        setTimeout(() => {
          showNotification('error', 'Gagal Menyimpan', isAddMode.value ? 'Terjadi kesalahan saat menambahkan kelas baru' : 'Terjadi kesalahan saat menyimpan data kelas')
        }, 100)
      } finally {
        isSubmitting.value = false
      }
    }

    const goBack = () => {
      // Check if form has unsaved changes
      const hasChanges = form.nama_kelas || form.tingkat || form.tahun_ajaran || form.id_sekolah || form.id_wali_kelas
      
      if (hasChanges && !confirm('Apakah Anda yakin ingin keluar? Data yang belum disimpan akan hilang.')) {
        return
      }
      
      if (isAddMode.value) {
        router.push({ name: 'kelas-list' })
      } else {
        router.push({ name: 'kelas-detail', params: { id: route.params.id } })
      }
    }

    const showMessage = (text, type) => {
      message.value = text
      messageType.value = type
      setTimeout(() => {
        message.value = ''
      }, 3000)
    }

    // Lifecycle
    onMounted(() => {
      if (!isAddMode.value) {
        loadKelasDetail()
        // Load students when in edit mode
        loadCurrentStudents()
      }
      checkFormValidity()
    })

    // Watch form changes
    const watchFormChanges = () => {
      checkFormValidity()
    }

    // Student management methods
    const loadCurrentStudents = async () => {
      if (!route.params.id) return
      
      try {
        isManagingStudents.value = true
        await siswaStore.fetchSiswaByKelas(parseInt(route.params.id))
        currentStudents.value = siswaStore.getSiswaList
      } catch (error) {
        console.error('Failed to load current students:', error)
        showNotification('error', 'Gagal Memuat Siswa', 'Terjadi kesalahan saat memuat daftar siswa')
      } finally {
        isManagingStudents.value = false
      }
    }

    const loadAvailableStudents = async () => {
      try {
        isManagingStudents.value = true
        await siswaStore.fetchSiswaList()
        
        // Filter siswa yang belum memiliki kelas atau kelas yang berbeda
        const allStudents = siswaStore.getSiswaList
        const currentClassId = parseInt(route.params.id)
        
        availableStudents.value = allStudents.filter(siswa => 
          !siswa.id_kelas || siswa.id_kelas !== currentClassId
        )
      } catch (error) {
        console.error('Failed to load available students:', error)
        showNotification('error', 'Gagal Memuat Siswa', 'Terjadi kesalahan saat memuat daftar siswa tersedia')
      } finally {
        isManagingStudents.value = false
      }
    }

    const addStudentToClass = async (siswaId) => {
      try {
        isManagingStudents.value = true
        
        // Update siswa dengan id_kelas baru
        const siswaData = {
          id_kelas: parseInt(route.params.id)
        }
        
        await siswaStore.updateSiswa(siswaId, siswaData)
        
        // Refresh lists
        await loadCurrentStudents()
        await loadAvailableStudents()
        
        showNotification('success', 'Berhasil!', 'Siswa berhasil ditambahkan ke kelas')
      } catch (error) {
        console.error('Failed to add student to class:', error)
        showNotification('error', 'Gagal Menambah Siswa', 'Terjadi kesalahan saat menambahkan siswa ke kelas')
      } finally {
        isManagingStudents.value = false
      }
    }

    const removeStudentFromClass = async (siswaId) => {
      try {
        isManagingStudents.value = true
        
        // Update siswa dengan id_kelas null (menghapus dari kelas)
        const siswaData = {
          id_kelas: null
        }
        
        await siswaStore.updateSiswa(siswaId, siswaData)
        
        // Refresh lists
        await loadCurrentStudents()
        await loadAvailableStudents()
        
        showNotification('success', 'Berhasil!', 'Siswa berhasil dihapus dari kelas')
      } catch (error) {
        console.error('Failed to remove student from class:', error)
        showNotification('error', 'Gagal Menghapus Siswa', 'Terjadi kesalahan saat menghapus siswa dari kelas')
      } finally {
        isManagingStudents.value = false
      }
    }

    return {
      form,
      isSubmitting,
      message,
      messageClass,
      isAddMode,
      formValid,
      showToast,
      toastType,
      toastTitle,
      toastMessage,
      toastDuration,
      kelasStore,
      siswaStore,
      themeStore,
      isDarkMode,
      currentStudents,
      availableStudents,
      isManagingStudents,
      submitForm,
      goBack,
      watchFormChanges,
      closeToast,
      loadCurrentStudents,
      loadAvailableStudents,
      addStudentToClass,
      removeStudentFromClass
    }
  }
}
</script>
