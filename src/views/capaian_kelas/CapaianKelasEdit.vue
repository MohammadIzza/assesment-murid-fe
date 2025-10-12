<template>
  <div :class="[
    'min-h-screen py-8 transition-colors duration-300',
    isDarkMode ? 'bg-dark-background' : 'bg-gradient-to-br from-purple-50 via-white to-indigo-50'
  ]" style="padding-top: 5rem;">
    <!-- Toast Notifications -->
    <Toast 
      :show="showToast" 
      :type="toastType" 
      :title="toastTitle" 
      :message="toastMessage" 
      @close="showToast = false" 
    />
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <button @click="goBack" :class="[
          'inline-flex items-center font-medium mb-6 px-4 py-2 rounded-lg transition-all duration-200',
          isDarkMode ? 'text-purple-400 hover:text-purple-300 hover:bg-gray-700' : 'text-purple-600 hover:text-purple-700 hover:bg-purple-50'
        ]">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          {{ isAddMode ? 'Kembali ke Daftar Capaian Kelas' : 'Kembali ke Detail Capaian Kelas' }}
        </button>
        
        <!-- Enhanced Header Card -->
        <div :class="[
          'rounded-2xl shadow-lg p-6 mb-8',
          isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
        ]">
          <div class="flex items-center space-x-4">
            <div class="flex-shrink-0">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
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
                {{ isAddMode ? 'Tambah Capaian Kelas Baru' : 'Edit Data Capaian Kelas' }}
              </h1>
              <p :class="[
                'text-gray-600',
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              ]">
                {{ isAddMode ? 'Lengkapi formulir untuk menambahkan capaian kelas baru ke sistem' : 'Perbarui informasi capaian kelas yang sudah ada' }}
              </p>
            </div>
            <div class="hidden md:flex items-center space-x-2">
              <div class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {{ isAddMode ? 'Mode Tambah' : 'Mode Edit' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="capaianKelasStore.isLoading && !form.kode_ck && !isAddMode" :class="[
        'rounded-2xl shadow-lg p-12',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h3 :class="[
            'text-lg font-semibold mb-2',
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          ]">Memuat Data Capaian Kelas</h3>
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
          isDarkMode ? 'bg-gray-700 border-dark-border' : 'bg-gradient-to-r from-gray-50 to-purple-50 border-gray-200'
        ]">
          <div class="flex items-center justify-between">
            <div>
              <h2 :class="[
                'text-lg font-semibold',
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              ]">Formulir Data Capaian Kelas</h2>
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
            <!-- Basic Information -->
            <div class="space-y-6">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 :class="[
                    'text-base font-semibold',
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">Informasi Dasar</h3>
                  <p :class="[
                    'text-sm',
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  ]">Data kode dan nama capaian kelas</p>
                </div>
              </div>
              
              <!-- Kode CK -->
              <div class="group">
                <label for="kode_ck" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                    </svg>
                    Kode CK <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <input
                  v-model="form.kode_ck"
                  type="text"
                  id="kode_ck"
                  required
                  @input="watchFormChanges"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white'
                  ]"
                  placeholder="Masukkan kode capaian kelas (contoh: 1.2)"
                />
              </div>

              <!-- Nama CK -->
              <div class="group">
                <label for="nama_ck" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    Nama CK <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <input
                  v-model="form.nama_ck"
                  type="text"
                  id="nama_ck"
                  required
                  @input="watchFormChanges"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white'
                  ]"
                  placeholder="Masukkan nama capaian kelas (contoh: tes capaian)"
                />
              </div>

              <!-- Indikator (opsional sesuai backend) -->
              <div class="group">
                <label for="indikator" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5l2 2h5a2 2 0 012 2v10a2 2 0 01-2 2z"></path>
                    </svg>
                    Indikator <span class="ml-1 text-xs text-gray-400">(opsional)</span>
                  </span>
                </label>
                <textarea
                  v-model="form.indikator"
                  id="indikator"
                  rows="3"
                  @input="watchFormChanges"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white'
                  ]"
                  placeholder="Masukkan indikator capaian (opsional)"
                ></textarea>
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
                  ]">Informasi Relasi</h3>
                  <p :class="[
                    'text-sm',
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  ]">Data sekolah dan capaian terkait</p>
                </div>
              </div>

              <!-- Sekolah (Read-only) -->
              <div class="group">
                <label for="sekolah_display" :class="[
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
                <div class="relative">
                  <input
                    :value="getSekolahName(form.id_sekolah)"
                    type="text"
                    id="sekolah_display"
                    readonly
                    :class="[
                      'block w-full px-4 py-3 border rounded-xl transition-all duration-200 cursor-not-allowed',
                      isDarkMode ? 'bg-gray-800 border-gray-600 text-gray-300' : 'bg-gray-50 border-gray-300 text-gray-700'
                    ]"
                    :placeholder="form.id_sekolah ? 'Memuat nama sekolah...' : 'Sekolah akan otomatis terisi'"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                </div>
                <p :class="[
                  'mt-2 text-xs flex items-center',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Sekolah otomatis diisi sesuai dengan akun yang login (tidak dapat diubah)
                </p>
              </div>

              <!-- Pilih Kelas -->
              <div class="group">
                <label for="id_kelas" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253"></path>
                    </svg>
                    Kelas <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <select
                  v-model="form.id_kelas"
                  id="id_kelas"
                  required
                  @change="watchFormChanges"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300 bg-white'
                  ]"
                >
                  <option value="" disabled>Pilih Kelas</option>
                  <option v-for="kls in kelasStore.getSortedKelasList" :key="kls.id_kelas" :value="kls.id_kelas">
                    {{ kls.nama_kelas }}
                  </option>
                </select>
              </div>

              <!-- Pilih Dimensi -->
              <div class="group">
                <label for="id_dimensi" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Dimensi <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <select
                  v-model="selectedDimensi"
                  id="id_dimensi"
                  required
                  @change="onDimensiChange"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300 bg-white'
                  ]"
                >
                  <option value="" disabled>Pilih Dimensi</option>
                  <option v-for="d in dimensiStore.getDimensiList" :key="d.id_dimensi" :value="d.id_dimensi">
                    {{ d.nama_dimensi }}
                  </option>
                </select>
              </div>

              <!-- Pilih Elemen -->
              <div class="group">
                <label for="id_elemen" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Elemen <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <select
                  v-model="selectedElemen"
                  id="id_elemen"
                  required
                  :disabled="!selectedDimensi"
                  @change="onElemenChange"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300 bg-white'
                  ]"
                >
                  <option value="" disabled>Pilih Elemen</option>
                  <option v-for="e in elemenStore.getElemenList" :key="e.id_elemen" :value="e.id_elemen">
                    {{ e.nama_elemen }}
                  </option>
                </select>
              </div>

              <!-- Pilih Sub Elemen -->
              <div class="group">
                <label for="id_sub_elemen" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Sub Elemen <span class="text-red-500 ml-1">*</span>
                  </span>
                </label>
                <select
                  v-model="form.id_sub_elemen"
                  id="id_sub_elemen"
                  required
                  :disabled="!selectedElemen"
                  @change="watchFormChanges"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300 bg-white'
                  ]"
                >
                  <option value="" disabled>Pilih Sub Elemen</option>
                  <option v-for="se in subElemenStore.getSubElemenList" :key="se.id_sub_elemen" :value="se.id_sub_elemen">
                    {{ se.nama_sub_elemen }}
                  </option>
                </select>
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
                    'inline-flex items-center justify-center px-6 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-sm hover:shadow-md',
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
                  class="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  <svg v-if="isSubmitting" class="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ isSubmitting ? 'Menyimpan...' : (isAddMode ? 'Tambah Capaian Kelas' : 'Simpan Perubahan') }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCapaianKelasStore } from '@/stores/capaianKelas'
import { useThemeStore } from '@/stores/theme'
import { useKelasStore } from '@/stores/kelas'
import { useDimensiStore } from '@/stores/dimensi'
import { useElemenStore } from '@/stores/elemen'
import { useSubElemenStore } from '@/stores/subElemen'
import { useAuthStore } from '@/stores/auth'
import { useSekolahScopeStore } from '@/stores/sekolahScope'
import axios from '@/plugins/axios'
import Toast from '@/components/common/Toast.vue'

export default {
  name: 'CapaianKelasEdit',
  components: { Toast },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const capaianKelasStore = useCapaianKelasStore()
    const themeStore = useThemeStore()
    const isDarkMode = computed(() => themeStore.isDarkMode)
    const authStore = useAuthStore()
    const sekolahScope = useSekolahScopeStore()

    // State
    const form = reactive({
      kode_ck: '',
      nama_ck: '',
      indikator: '',
      id_sekolah: '',
      id_kelas: '',
      // gunakan id_sub_elemen untuk pemilihan; store akan memetakan ke id_capaian bila perlu
      id_sub_elemen: ''
    })

  const isSubmitting = ref(false)
    const formValid = ref(false)
  // Toast state
  const showToast = ref(false)
  const toastType = ref('info')
  const toastTitle = ref('')
  const toastMessage = ref('')

    // Computed
    const isAddMode = computed(() => !route.params.id)

    // Stores for cascading
    const kelasStore = useKelasStore()
    const dimensiStore = useDimensiStore()
    const elemenStore = useElemenStore()
    const subElemenStore = useSubElemenStore()

    // Cascading selections
    const selectedDimensi = ref('')
    const selectedElemen = ref('')

    // Watch form changes for validation
    const checkFormValidity = () => {
      formValid.value = !!(
        form.kode_ck.trim() &&
        form.nama_ck.trim() &&
        form.id_sekolah &&
        form.id_sub_elemen &&
        form.id_kelas
      )
    }

    // Methods
    const loadCapaianKelasDetail = async () => {
      try {
        await capaianKelasStore.fetchCapaianKelasDetail(route.params.id)
        if (capaianKelasStore.getCurrentCapaianKelas) {
          const capaianKelas = capaianKelasStore.getCurrentCapaianKelas
          
          // ⭐ Multi-tenancy: Validasi akses - hanya bisa edit capaian dari sekolah sendiri
          const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
          if (userSekolahId && capaianKelas.id_sekolah != userSekolahId) {
            showToast.value = true
            toastType.value = 'error'
            toastTitle.value = 'Akses Ditolak'
            toastMessage.value = 'Anda tidak memiliki akses untuk mengedit capaian kelas dari sekolah lain'
            setTimeout(() => router.push({ name: 'capaian-kelas-list' }), 2000)
            return
          }
          
          form.kode_ck = capaianKelas.kode_ck || ''
          form.nama_ck = capaianKelas.nama_ck || ''
          form.indikator = capaianKelas.indikator || ''
          form.id_sekolah = capaianKelas.id_sekolah || ''
          form.id_kelas = capaianKelas.id_kelas || ''
          form.id_sub_elemen = capaianKelas.id_sub_elemen || capaianKelas.id_capaian || ''

          // Prefill cascading chains using backend lookups
          if (form.id_sub_elemen) {
            try {
              const { data: seRes } = await axios.get(`/view/sub_elemen/${form.id_sub_elemen}`)
              const id_elemen = seRes?.data?.id_elemen
              if (id_elemen) {
                const { data: eRes } = await axios.get(`/view/elemen/${id_elemen}`)
                const id_dimensi = eRes?.data?.id_dimensi
                if (id_dimensi) {
                  selectedDimensi.value = String(id_dimensi)
                  await elemenStore.fetchElemenByDimensi(id_dimensi)
                  selectedElemen.value = String(id_elemen)
                  await subElemenStore.fetchSubElemenByElemen(id_elemen)
                }
              }
            } catch (e) {
              console.warn('Gagal prefill chain dimensi/elemen:', e)
            }
          }
        }
      } catch (error) {
        console.error('Failed to load capaian kelas detail:', error)
        showToast.value = true
        toastType.value = 'error'
        toastTitle.value = 'Gagal'
        toastMessage.value = 'Gagal memuat data capaian kelas'
      }
    }

    const submitForm = async () => {
      if (!form.kode_ck || !form.nama_ck || !form.id_sekolah || !form.id_sub_elemen || !form.id_kelas) {
        showToast.value = true
        toastType.value = 'warning'
        toastTitle.value = 'Validasi'
        toastMessage.value = 'Mohon lengkapi semua field yang wajib diisi'
        return
      }
      
      // ⭐ Multi-tenancy: Validasi id_sekolah harus sesuai dengan user yang login
      const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
      if (userSekolahId && form.id_sekolah != userSekolahId) {
        showToast.value = true
        toastType.value = 'error'
        toastTitle.value = 'Validasi Gagal'
        toastMessage.value = 'Anda tidak dapat membuat/mengubah capaian kelas untuk sekolah lain'
        return
      }

      isSubmitting.value = true

      try {
        // Hanya kirim field yang dibutuhkan backend. id_sub_elemen akan dipetakan di store -> id_capaian
        const formData = {
          kode_ck: String(form.kode_ck).trim(),
          nama_ck: String(form.nama_ck).trim(),
          id_sekolah: parseInt(form.id_sekolah, 10),
          id_sub_elemen: parseInt(form.id_sub_elemen, 10),
          id_kelas: parseInt(form.id_kelas, 10),
          indikator: form.indikator ? String(form.indikator).trim() : undefined,
        }

        if (isAddMode.value) {
          // Add new capaian kelas
          const res = await capaianKelasStore.addCapaianKelas(formData)
          showToast.value = true
          toastType.value = 'success'
          toastTitle.value = 'Berhasil'
          toastMessage.value = res?.message || 'Capaian kelas baru berhasil ditambahkan'
          setTimeout(() => router.push({ name: 'capaian-kelas-list' }), 800)
        } else {
          // Update existing capaian kelas
          const res = await capaianKelasStore.updateCapaianKelas(route.params.id, formData)
          showToast.value = true
          toastType.value = 'success'
          toastTitle.value = 'Berhasil'
          toastMessage.value = res?.message || 'Data capaian kelas berhasil diperbarui'
          setTimeout(() => router.push({ name: 'capaian-kelas-detail', params: { id: route.params.id } }), 800)
        }

      } catch (error) {
        console.error('Failed to save capaian kelas:', error)
        showToast.value = true
        toastType.value = 'error'
        toastTitle.value = 'Gagal'
        // Ambil pesan backend jika ada
        const msg = error?.response?.data?.message || error?.message
        toastMessage.value = msg || (isAddMode.value ? 'Gagal menambahkan capaian kelas baru' : 'Gagal menyimpan data capaian kelas')
      } finally {
        isSubmitting.value = false
      }
    }

    const goBack = () => {
      if (isAddMode.value) {
        router.push({ name: 'capaian-kelas-list' })
      } else {
        router.push({ name: 'capaian-kelas-detail', params: { id: route.params.id } })
      }
    }

    // Watch form changes
    const watchFormChanges = () => {
      checkFormValidity()
    }

    // ⭐ Helper function: Get nama sekolah from ID
    const getSekolahName = (sekolahId) => {
      if (!sekolahId) return ''
      
      // Cari dari sekolahScope
      const sekolahList = sekolahScope.sekolahList || []
      const sekolah = sekolahList.find(s => s.id_sekolah == sekolahId)
      if (sekolah) return sekolah.nama_sekolah
      
      // Fallback: dari authStore
      const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
      if (sekolahId == userSekolahId) {
        return authStore.user?.schoolName || sekolahScope.activeSekolahName || `Sekolah ${sekolahId}`
      }
      
      return `Sekolah ${sekolahId}`
    }

    // Lifecycle
    const onDimensiChange = async () => {
      if (!selectedDimensi.value) return
      await elemenStore.fetchElemenByDimensi(selectedDimensi.value)
      selectedElemen.value = ''
      form.id_sub_elemen = ''
      // clear sub elemen list when dimensi changes
      subElemenStore.subElemenList = []
      watchFormChanges()
    }

    const onElemenChange = async () => {
      if (!selectedElemen.value) return
      await subElemenStore.fetchSubElemenByElemen(selectedElemen.value)
      form.id_sub_elemen = ''
      watchFormChanges()
    }

    onMounted(async () => {
      // load initial lists
      await Promise.all([
        kelasStore.fetchKelasList(),
        dimensiStore.fetchDimensiList()
      ])
      if (!isAddMode.value) {
        await loadCapaianKelasDetail()
      } else {
        // ⭐ ADD MODE: Auto-set id_sekolah dari user yang login
        const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
        if (userSekolahId) {
          form.id_sekolah = String(userSekolahId)
        }
      }
      checkFormValidity()
    })

    return {
      form,
      isSubmitting,
      formValid,
      isAddMode,
      capaianKelasStore,
      themeStore,
      isDarkMode,
      submitForm,
      goBack,
      watchFormChanges,
      getSekolahName,
      // cascading bindings
      kelasStore,
      dimensiStore,
      elemenStore,
      subElemenStore,
      selectedDimensi,
      selectedElemen,
      onDimensiChange,
      onElemenChange,
      // toast
      showToast,
      toastType,
      toastTitle,
      toastMessage
    }
  }
}
</script>
