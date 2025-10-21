<template>
  <div :class="[
    'min-h-screen py-8 transition-colors duration-300',
    isDarkMode ? 'bg-dark-background' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
  ]" style="padding-top: 5rem;">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <!-- ⭐ ADD MODE: Full Width Form -->
      <div v-else-if="isAddMode">
        <div :class="[
        'rounded-2xl shadow-lg overflow-hidden',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
          <!-- Enhanced Form Header -->
          <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-10">
            <div class="max-w-6xl mx-auto">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div class="flex items-center space-x-4">
                  <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-4 ring-white/30 shadow-lg">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
            <div>
                    <h2 class="text-2xl font-bold text-white mb-1">Tambah Kelas Baru</h2>
                    <p class="text-blue-100">Lengkapi formulir untuk menambahkan kelas baru ke sistem</p>
            </div>
                </div>
                <div class="flex items-center space-x-3">
            <div :class="[
                    'px-4 py-2 rounded-xl backdrop-blur-sm border',
                    isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white/20 border-white/30'
                  ]">
                    <div class="flex items-center space-x-2">
                      <span class="text-red-300 text-lg">*</span>
                      <span class="text-white text-sm font-medium">Wajib diisi</span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        
        <form @submit.prevent="submitForm" class="p-8">
            <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Left Column -->
            <div :class="[
              'rounded-2xl shadow-md border p-6',
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100'
            ]">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h3 :class="[
                    'text-lg font-bold',
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">📘 Informasi Kelas</h3>
                  <p :class="[
                    'text-sm',
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  ]">Data utama kelas</p>
                </div>
              </div>
              
              <div class="space-y-5">
              
              <!-- Nama Kelas -->
              <div>
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
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white'
                  ]"
                  placeholder="Masukkan nama kelas (contoh: X IPA 1)"
                />
              </div>

      <!-- Tahun Ajaran -->
              <div>
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
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white'
                  ]"
                  placeholder="Masukkan tahun ajaran (contoh: 2024/2025)"
                />
              </div>

              <!-- Tingkat -->
              <div>
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
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
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

              <!-- Fase -->
              <div>
                <label for="id_fase" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                    Fase <span class="text-gray-500 ml-1">(opsional)</span>
                  </span>
                </label>
                <select
                  v-model="form.id_fase"
                  id="id_fase"
                  @change="watchFormChanges"
                  :disabled="faseLoading"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300 bg-white',
                    faseLoading ? 'opacity-50 cursor-not-allowed' : ''
                  ]"
                >
                  <option value="">Pilih Fase (opsional)</option>
                  <option v-if="faseLoading" disabled>Memuat data fase...</option>
                  <option 
                    v-for="fase in faseList" 
                    :key="fase.id_fase" 
                    :value="fase.id_fase"
                  >
                    {{ fase.nama_fase }}{{ fase.keterangan ? ' - ' + fase.keterangan : '' }}
                  </option>
                </select>
              </div>
              </div>
            </div>

            <!-- Right Column -->
            <div :class="[
              'rounded-2xl shadow-md border p-6',
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100'
            ]">
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <div>
                  <h3 :class="[
                    'text-lg font-bold',
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">📗 Informasi Tambahan</h3>
                  <p :class="[
                    'text-sm',
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  ]">Data sekolah dan wali kelas</p>
                </div>
              </div>

              <div class="space-y-5">

              <!-- Sekolah (READ-ONLY) -->
              <div>
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
                <div :class="[
                  'block w-full px-4 py-3 border rounded-xl transition-all',
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'
                ]">
                  <div class="flex items-center justify-between">
                    <span>{{ getSchoolName(form.id_sekolah) }}</span>
                    <span :class="[
                      'text-xs px-2 py-1 rounded-full font-medium',
                      isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                    ]">
                      Otomatis
                    </span>
                  </div>
                </div>
                <p :class="[
                  'mt-1 text-xs',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">
                  Sekolah otomatis disesuaikan dengan akun admin yang login
                </p>
              </div>

              <!-- Wali Kelas -->
              <div>
                <label for="id_wali_kelas" :class="[
                  'block text-sm font-medium mb-2',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Wali Kelas <span class="text-gray-500 ml-1">(opsional)</span>
                  </span>
                </label>
                <select
                  v-model="form.id_wali_kelas"
                  id="id_wali_kelas"
                  @change="watchFormChanges"
                  :disabled="isPengampuLoading"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300 bg-white',
                    isPengampuLoading ? 'opacity-50 cursor-not-allowed' : ''
                  ]"
                >
                  <option value="">-- Pilih Wali Kelas (opsional) --</option>
                  <option v-if="isPengampuLoading" disabled>Memuat daftar guru...</option>
                  <option 
                    v-for="guru in availableGuru" 
                    :key="guru.id_guru" 
                    :value="guru.id_guru"
                  >
                    {{ guru.nama }} - {{ guru.nip || 'Tanpa NIP' }}
                  </option>
                </select>
                <p :class="[
                  'mt-1 text-xs',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">
                  Pilih guru yang akan menjadi wali kelas (dapat diisi nanti)
                </p>
              </div>

              <!-- Info Box -->
              <div class="mt-6">
                <div :class="[
                  'p-5 rounded-xl border-l-4 shadow-sm',
                  isDarkMode ? 'bg-blue-900/20 border-blue-500' : 'bg-blue-50 border-blue-500'
                ]">
                  <div class="flex items-start space-x-3">
                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 :class="[
                        'text-sm font-bold mb-2',
                        isDarkMode ? 'text-blue-300' : 'text-blue-900'
                      ]">💡 Informasi Penting</h4>
                      <p :class="[
                        'text-sm leading-relaxed',
                        isDarkMode ? 'text-blue-200' : 'text-blue-800'
                      ]">Setelah kelas berhasil dibuat, Anda dapat menambahkan:</p>
                      <ul :class="[
                        'text-sm mt-2 space-y-1 list-disc list-inside',
                        isDarkMode ? 'text-blue-200' : 'text-blue-800'
                      ]">
                        <li>Siswa yang terdaftar di kelas</li>
                        <li>Guru pengampu mata pelajaran</li>
                        <li>Mengatur wali kelas</li>
                      </ul>
                      <p :class="[
                        'text-xs mt-3 font-medium',
                        isDarkMode ? 'text-blue-300' : 'text-blue-700'
                      ]">📝 Tip: Simpan kelas terlebih dahulu, lalu edit untuk menambahkan detail lainnya.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
          </div>

          <!-- Form Actions -->
          <div class="max-w-6xl mx-auto">
            <div :class="[
              'mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4 justify-between items-center',
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            ]">
              <!-- Progress Indicator -->
              <div class="flex items-center space-x-2 text-sm">
                <svg v-if="formValid" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg v-else class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span :class="[
                  'font-medium',
                  formValid ? 'text-green-600' : 'text-yellow-600'
                ]">
                  {{ formValid ? '✓ Form siap untuk disimpan' : '⚠ Mohon lengkapi semua field wajib' }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  @click="goBack"
                  :class="[
                    'inline-flex items-center justify-center px-6 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm hover:shadow-md',
                    isDarkMode ? 'border-dark-border text-gray-300 bg-dark-surface hover:bg-gray-600' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  ]"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="isSubmitting || !formValid"
                  class="inline-flex items-center justify-center px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  <svg v-if="isSubmitting" class="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <svg v-else class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ isSubmitting ? 'Menyimpan...' : 'Tambah Kelas' }}
                </button>
              </div>
            </div>
          </div>
        </form>
        </div>
      </div>

      <!-- ⭐ EDIT MODE: 2 Column Layout -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- ⭐ LEFT COLUMN: Form Kelas (Sidebar) -->
        <div class="lg:col-span-1">
          <div :class="[
            'rounded-2xl shadow-lg overflow-hidden sticky top-6',
            isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
          ]">
            <!-- Sidebar Header -->
            <div :class="[
              'px-6 py-4 border-b',
              isDarkMode ? 'bg-gray-700 border-dark-border' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-gray-200'
            ]">
              <h2 :class="[
                'text-base font-semibold',
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              ]">📝 Informasi Kelas</h2>
              <p :class="[
                'text-xs mt-1',
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              ]">Data dasar kelas</p>
            </div>

            <!-- Form Sidebar -->
            <form @submit.prevent="submitForm" class="p-6 space-y-4">
              
              <!-- Nama Kelas -->
              <div>
                <label for="nama_kelas" :class="[
                  'block text-xs font-medium mb-1.5',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  Nama Kelas <span class="text-red-500 ml-1">*</span>
                </label>
                <input
                  v-model="form.nama_kelas"
                  type="text"
                  id="nama_kelas"
                  required
                  @input="watchFormChanges"
                  :class="[
                    'block w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white'
                  ]"
                  placeholder="Contoh: XI IPA 1"
                />
              </div>

              <!-- Tahun Ajaran -->
              <div>
                <label for="tahun_ajaran" :class="[
                  'block text-xs font-medium mb-1.5',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  Tahun Ajaran <span class="text-gray-500">(opsional)</span>
                </label>
                <input
                  v-model="form.tahun_ajaran"
                  type="text"
                  id="tahun_ajaran"
                  @input="watchFormChanges"
                  :class="[
                    'block w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white'
                  ]"
                  placeholder="Contoh: 2024/2025"
                />
            </div>

              <!-- Tingkat -->
              <div>
                <label for="tingkat" :class="[
                  'block text-xs font-medium mb-1.5',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  Tingkat <span class="text-red-500 ml-1">*</span>
                </label>
                <select
                  v-model="form.tingkat"
                  id="tingkat"
                  required
                  @change="watchFormChanges"
                  :class="[
                    'block w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
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

              <!-- Fase -->
              <div>
                <label for="id_fase" :class="[
                  'block text-xs font-medium mb-1.5',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  Fase <span class="text-gray-500">(opsional)</span>
                </label>
                <select
                  v-model="form.id_fase"
                  id="id_fase"
                  @change="watchFormChanges"
                  :disabled="faseLoading"
                  :class="[
                    'block w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300 bg-white',
                    faseLoading ? 'opacity-50 cursor-not-allowed' : ''
                  ]"
                >
                  <option value="">Pilih Fase</option>
                  <option v-if="faseLoading" disabled>Memuat...</option>
                  <option 
                    v-for="fase in faseList" 
                    :key="fase.id_fase" 
                    :value="fase.id_fase"
                  >
                    {{ fase.nama_fase }}{{ fase.keterangan ? ' - ' + fase.keterangan : '' }}
                  </option>
                </select>
              </div>

              <!-- Divider -->
              <div :class="['border-t pt-4', isDarkMode ? 'border-gray-700' : 'border-gray-200']"></div>

              <!-- Sekolah (READ-ONLY) -->
              <div>
                <label :class="[
                  'block text-xs font-medium mb-1.5',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  Sekolah <span class="text-red-500 ml-1">*</span>
                </label>
                <div :class="[
                  'block w-full px-3 py-2 text-sm border rounded-lg',
                  isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'
                ]">
                  <div class="flex items-center justify-between">
                    <span class="text-sm">{{ getSchoolName(form.id_sekolah) }}</span>
                    <span :class="[
                      'text-xs px-2 py-0.5 rounded-full font-medium',
                      isDarkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                    ]">
                      Auto
                    </span>
                  </div>
                </div>
              </div>

              <!-- Wali Kelas -->
              <div>
                <label for="id_wali_kelas" :class="[
                  'block text-xs font-medium mb-1.5',
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                ]">
                  Wali Kelas <span class="text-gray-500">(opsional)</span>
                </label>
                <select
                  v-model="form.id_wali_kelas"
                  id="id_wali_kelas"
                  @change="watchFormChanges"
                  :disabled="isPengampuLoading"
                  :class="[
                    'block w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all',
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100' : 'border-gray-300 bg-white',
                    isPengampuLoading ? 'opacity-50 cursor-not-allowed' : ''
                  ]"
                >
                  <option value="">-- Pilih Wali Kelas --</option>
                  <option v-if="isPengampuLoading" disabled>Memuat...</option>
                  <option 
                    v-for="guru in availableGuru" 
                    :key="guru.id_guru" 
                    :value="guru.id_guru"
                  >
                    {{ guru.nama }}
                  </option>
                </select>
              </div>

              <!-- Divider -->
              <div :class="['border-t pt-4', isDarkMode ? 'border-gray-700' : 'border-gray-200']"></div>

              <!-- Form Actions (Sidebar) -->
              <div class="space-y-2">
                <button
                  type="submit"
                  :disabled="isSubmitting || !formValid"
                  class="w-full inline-flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ isSubmitting ? 'Menyimpan...' : (isAddMode ? 'Tambah Kelas' : 'Simpan Perubahan') }}
                </button>
                
                <button
                  type="button"
                  @click="goBack"
                  :class="[
                    'w-full inline-flex items-center justify-center px-4 py-2.5 border text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all',
                    isDarkMode ? 'border-dark-border text-gray-300 bg-dark-surface hover:bg-gray-700' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  ]"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- ⭐ RIGHT COLUMN: Management Sections -->
        <div class="lg:col-span-2 space-y-6">

          <!-- Student Management Section -->
          <div v-if="!isAddMode" :class="[
            'rounded-2xl shadow-lg overflow-hidden',
            isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
          ]">
            <!-- Section Header -->
            <div :class="[
              'px-6 py-4 border-b',
              isDarkMode ? 'bg-gray-700 border-dark-border' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-gray-200'
            ]">
              <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <div>
                <h3 :class="[
                  'text-base font-semibold',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">👥 Manajemen Siswa</h3>
                <p :class="[
                    'text-xs',
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                ]">Kelola daftar siswa yang terdaftar di kelas ini</p>
                </div>
              </div>
            </div>

            <!-- Section Content -->
            <div class="p-6 space-y-6">

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
          </div>

          <!-- ⭐ Guru Pengampu Management Section (Edit Mode Only) -->
          <div v-if="!isAddMode" :class="[
            'rounded-2xl shadow-lg overflow-hidden',
            isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
          ]">
            <!-- Section Header -->
          <div :class="[
              'px-6 py-4 border-b',
              isDarkMode ? 'bg-gray-700 border-dark-border' : 'bg-gradient-to-r from-indigo-50 to-blue-50 border-gray-200'
            ]">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                </div>
                <div>
                  <h3 :class="[
                    'text-base font-semibold',
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  ]">👨‍🏫 Manajemen Guru Pengampu</h3>
                  <p :class="[
                    'text-xs',
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  ]">Kelola daftar guru yang mengajar di kelas ini</p>
                </div>
              </div>
              </div>
              
            <!-- Section Content -->
            <div class="p-6 space-y-6">

            <!-- Current Pengampu List -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-4">
                <h4 :class="[
                  'text-sm font-medium',
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                ]">Guru Pengampu ({{ currentPengampu.length }})</h4>
                <button
                  @click="loadCurrentPengampu"
                  :disabled="isPengampuLoading"
                  :class="[
                    'inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200',
                    isDarkMode ? 'text-indigo-300 bg-indigo-900/30 border border-indigo-700 hover:bg-indigo-900/50' : 'text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100'
                  ]"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Refresh
                </button>
              </div>

              <!-- Pengampu List -->
              <div v-if="currentPengampu.length > 0" class="space-y-2 max-h-48 overflow-y-auto">
                <div 
                  v-for="pengampu in currentPengampu" 
                  :key="pengampu.id_pengampu"
                  :class="[
                    'flex items-center justify-between p-3 rounded-lg border',
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  ]"
                >
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span class="text-xs font-medium text-indigo-600">{{ getGuruName(pengampu.id_guru)?.charAt(0) || '?' }}</span>
                    </div>
                    <div>
                      <p :class="[
                        'text-sm font-medium',
                        isDarkMode ? 'text-gray-100' : 'text-gray-900'
                      ]">{{ getGuruName(pengampu.id_guru) }}</p>
                      <p :class="[
                        'text-xs',
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      ]">ID Guru: {{ pengampu.id_guru }} • {{ pengampu.tahun_ajaran || 'Tahun Ajaran tidak tersedia' }}</p>
                    </div>
                  </div>
                <button
                    @click="removePengampu(pengampu.id_pengampu)"
                    :disabled="isManagingPengampu"
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <p :class="[
                  'text-sm',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Belum ada guru pengampu yang ditugaskan</p>
              </div>
            </div>

            <!-- Add Pengampu Section -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <h4 :class="[
                  'text-sm font-medium',
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                ]">Tambah Guru Pengampu</h4>
              </div>

              <!-- Guru Selection and Add Form -->
              <div :class="[
                'p-4 rounded-lg border',
                isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              ]">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Select Guru -->
                  <div>
                    <label :class="[
                      'block text-xs font-medium mb-2',
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    ]">Pilih Guru</label>
                    <select
                      v-model="newPengampu.id_guru"
                      :class="[
                        'block w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all',
                        isDarkMode ? 'bg-gray-600 border-gray-500 text-gray-100' : 'border-gray-300 bg-white'
                      ]"
                    >
                      <option value="">-- Pilih Guru --</option>
                      <option 
                        v-for="guru in availableGuru" 
                        :key="guru.id_guru" 
                        :value="guru.id_guru"
                      >
                        {{ guru.nama }} (ID: {{ guru.id_guru }})
                      </option>
                    </select>
                  </div>

                  <!-- Tahun Ajaran -->
                  <div>
                    <label :class="[
                      'block text-xs font-medium mb-2',
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    ]">Tahun Ajaran</label>
                    <input
                      v-model="newPengampu.tahun_ajaran"
                      type="text"
                      placeholder="2024/2025"
                      :class="[
                        'block w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all',
                        isDarkMode ? 'bg-gray-600 border-gray-500 text-gray-100 placeholder-gray-400' : 'border-gray-300 bg-white'
                      ]"
                    />
                  </div>
                </div>

                <!-- Add Button -->
                <button 
                  @click="addPengampu"
                  :disabled="!newPengampu.id_guru || isManagingPengampu"
                  :class="[
                    'mt-4 w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    newPengampu.id_guru && !isManagingPengampu
                      ? (isDarkMode ? 'text-white bg-indigo-600 hover:bg-indigo-700' : 'text-white bg-indigo-600 hover:bg-indigo-700')
                      : 'opacity-50 cursor-not-allowed bg-gray-400 text-gray-200'
                  ]"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  {{ isManagingPengampu ? 'Menambahkan...' : 'Tambah Guru Pengampu' }}
                </button>
              </div>
            </div>
          </div>
      </div>

          <!-- ⭐ Info Box for Add Mode -->
          <div v-if="isAddMode" :class="[
            'rounded-2xl shadow-lg overflow-hidden',
            isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
          ]">
            <div :class="[
              'p-6 rounded-xl border-l-4',
              isDarkMode ? 'bg-blue-900/20 border-blue-500' : 'bg-blue-50 border-blue-500'
            ]">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 :class="[
                    'text-sm font-semibold mb-2',
                    isDarkMode ? 'text-blue-300' : 'text-blue-900'
                  ]">💡 Informasi Penting</h3>
                  <p :class="[
                    'text-sm mb-3',
                    isDarkMode ? 'text-blue-200' : 'text-blue-800'
                  ]">Setelah kelas berhasil dibuat, Anda dapat:</p>
                  <ul :class="[
                    'text-sm space-y-2 list-disc list-inside',
                    isDarkMode ? 'text-blue-200' : 'text-blue-800'
                  ]">
                    <li><strong>Menambahkan Siswa:</strong> Edit kelas ini dan tambahkan siswa yang sudah terdaftar</li>
                    <li><strong>Menambahkan Guru Pengampu:</strong> Tugaskan guru-guru yang akan mengajar di kelas ini</li>
                    <li><strong>Mengatur Wali Kelas:</strong> Tentukan guru yang bertanggung jawab sebagai wali kelas</li>
                  </ul>
                  <div :class="[
                    'mt-4 p-3 rounded-lg',
                    isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                  ]">
                    <p :class="[
                      'text-xs',
                      isDarkMode ? 'text-blue-300' : 'text-blue-700'
                    ]">
                      <strong>Tip:</strong> Simpan kelas terlebih dahulu, lalu klik "Edit" untuk menambahkan siswa dan guru pengampu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- End Right Column -->

      </div>
      <!-- End 2 Column Grid -->

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
import { useAuthStore } from '@/stores/auth'
import { useSekolahScopeStore } from '@/stores/sekolahScope'
import axios from 'axios'
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
    const authStore = useAuthStore()
    const sekolahScope = useSekolahScopeStore()
    const isDarkMode = computed(() => themeStore.isDarkMode)

    // State
    const form = reactive({
      nama_kelas: '',
      tahun_ajaran: '',
      tingkat: '',
      id_sekolah: '',
      id_fase: '',
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
    
    // ⭐ NEW: Pengampu management state
    const currentPengampu = ref([])
    const availableGuru = ref([])
    const isManagingPengampu = ref(false)
    const isPengampuLoading = ref(false)
    const newPengampu = reactive({
      id_guru: '',
      tahun_ajaran: form.tahun_ajaran || ''
    })
    
    // Fase list state
    const faseList = ref([])
    const faseLoading = ref(false)
    
    // ✅ SEKOLAH LIST STATE
    const sekolahList = ref([])
    const sekolahLoading = ref(false)
    
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
      // Backend membutuhkan: nama_kelas, tingkat, id_sekolah, id_fase (opsional tapi recommended)
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
          
          // ⭐ VALIDASI: Pastikan kelas milik sekolah user yang login
          const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
          if (userSekolahId && kelas.id_sekolah && parseInt(kelas.id_sekolah) !== parseInt(userSekolahId)) {
            showNotification('error', 'Akses Ditolak', 'Anda tidak memiliki akses untuk mengedit kelas dari sekolah lain!', 3000)
            setTimeout(() => router.push({ name: 'kelas-list' }), 1000)
            return
          }
          
          form.nama_kelas = kelas.nama_kelas || ''
          form.tahun_ajaran = kelas.tahun_ajaran || ''
          form.tingkat = kelas.tingkat || ''
          form.id_sekolah = kelas.id_sekolah || ''
          form.id_fase = kelas.id_fase || ''
          form.id_wali_kelas = kelas.id_wali_kelas || ''
        }
      } catch (error) {
        showMessage('Gagal memuat data kelas', 'error')
      }
    }

    const submitForm = async () => {
      if (!form.nama_kelas || !form.tingkat || !form.id_sekolah) {
        showMessage('Mohon lengkapi semua field yang wajib diisi', 'error')
        showNotification('error', 'Validasi Gagal', 'Mohon lengkapi semua field yang wajib diisi')
        return
      }

      // ⭐ VALIDASI: Pastikan id_sekolah cocok dengan sekolah user yang login
      const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
      if (userSekolahId && parseInt(form.id_sekolah) !== parseInt(userSekolahId)) {
        showNotification('error', 'Validasi Gagal', 'Anda tidak dapat menambah/mengubah kelas untuk sekolah lain!', 3000)
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
          id_fase: form.id_fase || null, // Pastikan null jika kosong
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

    // Helper function untuk get school name
    const getSchoolName = (schoolId) => {
      if (!schoolId) return 'Tidak Diketahui'
      // ✅ AMBIL DARI API: Cari di sekolahList yang sudah di-fetch
      const sekolah = sekolahList.value.find(s => s.id_sekolah == schoolId)
      return sekolah?.nama_sekolah || sekolah?.nama || `Sekolah ID ${schoolId}`
    }

    // Fetch fase list from API
    const fetchFaseList = async () => {
      try {
        faseLoading.value = true
        const response = await axios.get('/list/fase')
        if (response.data && response.data.success) {
          faseList.value = response.data.data || []
        }
      } catch (error) {
        // Fallback to empty array if API fails
        faseList.value = []
      } finally {
        faseLoading.value = false
      }
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
      // Fetch fase list dan sekolah list (parallel dengan load data lain)
      await Promise.all([
        fetchFaseList(),
        fetchSekolahList()
      ])
      
      if (!isAddMode.value) {
        loadKelasDetail()
        // ⭐ AUTO-LOAD: Siswa dan Guru saat masuk Edit mode
        await Promise.all([
          loadCurrentStudents(),
          loadAvailableStudents(),
          loadCurrentPengampu(),
          loadAvailableGuru()
        ])
      } else {
        // ⭐ ADD MODE: Otomatis set id_sekolah dari user yang login
        const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
        if (userSekolahId) {
          form.id_sekolah = String(userSekolahId)
        }
        
        // ⭐ ADD MODE: Load guru list untuk dropdown wali kelas
        await loadAvailableGuru()
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
        showNotification('error', 'Gagal Menghapus Siswa', 'Terjadi kesalahan saat menghapus siswa dari kelas')
      } finally {
        isManagingStudents.value = false
      }
    }

    // ⭐ NEW: Pengampu Management Methods
    const loadCurrentPengampu = async () => {
      try {
        isPengampuLoading.value = true
        const kelasId = route.params.id
        const response = await axios.get('/list/pengampu')
        
        if (response.data && response.data.success) {
          // Filter pengampu by id_kelas
          currentPengampu.value = response.data.data.filter(p => p.id_kelas == kelasId) || []
        } else {
          currentPengampu.value = []
        }
      } catch (error) {
        currentPengampu.value = []
      } finally {
        isPengampuLoading.value = false
      }
    }

    const loadAvailableGuru = async () => {
      try {
        const response = await axios.get('/list/guru')
        
        if (response.data && response.data.success) {
          // Filter guru by sekolah yang sama
          const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
          availableGuru.value = response.data.data.filter(g => g.id_sekolah == userSekolahId) || []
        } else {
          availableGuru.value = []
        }
      } catch (error) {
        availableGuru.value = []
      }
    }

    const addPengampu = async () => {
      if (!newPengampu.id_guru) {
        showNotification('warning', 'Perhatian', 'Silakan pilih guru terlebih dahulu')
        return
      }

      try {
        isManagingPengampu.value = true
        
        const pengampuData = {
          id_guru: Number(newPengampu.id_guru),
          id_kelas: Number(route.params.id),
          tahun_ajaran: newPengampu.tahun_ajaran || form.tahun_ajaran || new Date().getFullYear() + '/' + (new Date().getFullYear() + 1)
        }
        
        const response = await axios.post('/add/pengampu', pengampuData)
        
        if (response.data && response.data.success) {
          // Reset form
          newPengampu.id_guru = ''
          newPengampu.tahun_ajaran = form.tahun_ajaran || ''
          
          // Refresh pengampu list
          await loadCurrentPengampu()
          
          showNotification('success', 'Berhasil!', 'Guru pengampu berhasil ditambahkan')
        } else {
          throw new Error(response.data?.message || 'Gagal menambahkan guru pengampu')
        }
      } catch (error) {
        showNotification('error', 'Gagal Menambah Pengampu', error.response?.data?.message || error.message || 'Terjadi kesalahan saat menambahkan guru pengampu')
      } finally {
        isManagingPengampu.value = false
      }
    }

    const removePengampu = async (pengampuId) => {
      if (!confirm('Apakah Anda yakin ingin menghapus guru pengampu ini?')) {
        return
      }

      try {
        isManagingPengampu.value = true
        
        const response = await axios.delete(`/delete/pengampu/${pengampuId}`)
        
        if (response.data && response.data.success) {
          // Refresh pengampu list
          await loadCurrentPengampu()
          
          showNotification('success', 'Berhasil!', 'Guru pengampu berhasil dihapus')
        } else {
          throw new Error(response.data?.message || 'Gagal menghapus guru pengampu')
        }
      } catch (error) {
        showNotification('error', 'Gagal Menghapus Pengampu', error.response?.data?.message || error.message || 'Terjadi kesalahan saat menghapus guru pengampu')
      } finally {
        isManagingPengampu.value = false
      }
    }

    const getGuruName = (guruId) => {
      if (!guruId) return 'Tidak Diketahui'
      const guru = availableGuru.value.find(g => g.id_guru == guruId)
      return guru ? guru.nama : `Guru ID ${guruId}`
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
      currentPengampu,
      availableGuru,
      isManagingPengampu,
      isPengampuLoading,
      newPengampu,
      faseList,
      faseLoading,
      submitForm,
      goBack,
      watchFormChanges,
      closeToast,
      loadCurrentStudents,
      loadAvailableStudents,
      addStudentToClass,
      removeStudentFromClass,
      loadCurrentPengampu,
      loadAvailableGuru,
      addPengampu,
      removePengampu,
      getGuruName,
      getSchoolName
    }
  }
}
</script>
