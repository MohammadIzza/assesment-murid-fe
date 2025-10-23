<template>
  <div :class="[
    'min-h-screen py-8 transition-colors duration-300',
    isDarkMode ? 'bg-dark-background' : 'bg-gray-50'
  ]" style="padding-top: 5rem;">
    <!-- Toast Notification -->
    <Toast
      :show="showToast"
      :type="toastType"
      :title="toastTitle"
      :message="toastMessage"
      :duration="toastDuration"
      :show-progress="toastType === 'success'"
      @close="closeToast"
    />
    
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div :class="[
        'rounded-xl shadow-lg border p-8 mb-8 text-white',
        isDarkMode ? 'bg-gradient-to-r from-green-800 to-green-900 border-green-700' : 'bg-gradient-to-r from-green-600 to-green-700 border-green-600'
      ]">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="flex items-center space-x-6">
            <div class="relative">
              <div class="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </div>
              <div class="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white mb-2">Daftar Siswa</h1>
              <p :class="[
                'text-base',
                isDarkMode ? 'text-green-200' : 'text-green-100'
              ]">Kelola dan pantau data siswa dalam sistem assessment</p>
              <div class="flex items-center mt-3 space-x-4">
                <div class="flex items-center text-green-100">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-sm font-medium">Sistem Aktif</span>
                </div>
                <div class="flex items-center text-green-100">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-sm font-medium">Update Real-time</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 lg:mt-0">
            <div :class="[
              'backdrop-blur-sm rounded-xl p-6 text-center border',
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20'
            ]">
              <div class="text-2xl font-bold text-white mb-1">{{ totalSiswaSekolah }}</div>
              <div :class="[
                'text-sm font-medium mb-2',
                isDarkMode ? 'text-green-200' : 'text-green-100'
              ]">Total Siswa</div>
              <div class="flex items-center justify-center space-x-2">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span :class="[
                  'text-xs',
                  isDarkMode ? 'text-green-200' : 'text-green-100'
                ]">Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filter Section -->
      <div :class="[
        'rounded-xl shadow-lg mb-8 overflow-hidden',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <!-- Filter Header -->
        <div :class="[
          'px-6 py-4 border-b',
          isDarkMode ? 'bg-gray-700 border-dark-border' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
        ]">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="flex items-center space-x-3">
              <div class="flex items-center justify-center w-10 h-10 bg-green-100 rounded-xl shadow-sm">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
                </svg>
              </div>
              <div>
                <h3 :class="[
                  'text-lg font-semibold',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">Filter & Pencarian Data Siswa</h3>
                <p :class="[
                  'text-sm',
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                ]">Temukan dan filter data siswa berdasarkan kriteria spesifik</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div v-if="hasActiveFilters" class="flex items-center text-sm text-green-700 bg-green-100 px-4 py-2 rounded-full shadow-sm border border-green-200">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ activeFilterCount }} Filter Aktif
              </div>
              <button 
                @click="clearAllFilters" 
                v-if="hasActiveFilters" 
                class="inline-flex items-center text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-all duration-200 border border-red-200 hover:border-red-300 shadow-sm"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Reset Semua
              </button>
            </div>
          </div>
        </div>

        <!-- Filter Content -->
        <div class="p-6 space-y-4">
          <!-- Filter Toggle Section -->
          <div class="flex items-center justify-between mb-6">
            <label :class="[
              'text-sm font-semibold flex items-center',
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            ]">
              <svg class="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
              </svg>
              Filter 
            </label>
            <button 
              @click="toggleAdvancedFilter" 
              :class="[
                'inline-flex items-center text-sm px-3 py-1.5 rounded-lg transition-all duration-200 border',
                isDarkMode ? 'text-indigo-300 bg-indigo-900/30 border-indigo-700 hover:bg-indigo-900/50' : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border-indigo-200'
              ]"
            >
              <svg v-if="!showAdvancedFilter" class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
              <svg v-else class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
              </svg>
              {{ showAdvancedFilter ? 'Sembunyikan' : 'Tampilkan' }}
            </button>
          </div>

          <!-- Basic Filters (Always Visible) -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            <!-- Kelas Filter -->
            <div class="space-y-2">
              <label :class="[
                'flex text-sm font-medium items-center',
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                <svg class="w-4 h-4 mr-1.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Kelas
              </label>
              <div class="relative">
                <select 
                  v-model="selectedKelas" 
                  :disabled="kelasLoading"
                  :class="[
                    'block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:shadow-md appearance-none text-sm',
                    isDarkMode ? 'bg-dark-surface border-dark-border text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                  ]"
                >
                  <option value="">{{ kelasLoading ? 'Memuat...' : 'Semua Kelas' }}</option>
                  <option 
                    v-for="kelas in filteredKelasList" 
                    :key="kelas.id_kelas" 
                    :value="kelas.id_kelas"
                  >
                    {{ kelas.nama_kelas || kelas.kelas || `Kelas ${kelas.id_kelas}` }}
                  </option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <div v-if="kelasLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                  <svg v-else :class="[
                    'h-4 w-4',
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              <div v-if="selectedKelas" class="flex items-center text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Filter aktif
              </div>
            </div>

            <!-- Jenis Kelamin Filter -->
            <div class="space-y-2">
              <label :class="[
                'flex text-sm font-medium items-center',
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                <svg class="w-4 h-4 mr-1.5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Jenis Kelamin
              </label>
              <div class="relative">
                <select v-model="selectedJenisKelamin" :class="[
                  'block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:shadow-md appearance-none text-sm',
                  isDarkMode ? 'bg-dark-surface border-dark-border text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                ]">
                  <option value="">Semua</option>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg :class="[
                    'h-4 w-4',
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              <div v-if="selectedJenisKelamin" class="flex items-center text-xs text-pink-600 bg-pink-50 px-2 py-1 rounded-md">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Filter aktif
              </div>
            </div>

            <!-- Status Filter -->
            <div class="space-y-2">
              <label :class="[
                'flex text-sm font-medium items-center',
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                <svg class="w-4 h-4 mr-1.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Status
              </label>
              <div class="relative">
                <select v-model="selectedStatus" :class="[
                  'block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:shadow-md appearance-none text-sm',
                  isDarkMode ? 'bg-dark-surface border-dark-border text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                ]">
                  <option value="">Semua Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="tidak_aktif">Tidak Aktif</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg :class="[
                    'h-4 w-4',
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              <div v-if="selectedStatus" class="flex items-center text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Filter aktif
              </div>
            </div>

            <!-- Search -->
            <div class="space-y-2">
              <label :class="[
                'flex text-sm font-medium items-center',
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                <svg class="w-4 h-4 mr-1.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Pencarian
              </label>
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari nama, NISN..."
                  :class="[
                    'block w-full px-4 py-3 pl-10 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:shadow-md text-sm',
                    isDarkMode ? 'bg-dark-surface border-dark-border text-gray-100 placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                  ]"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg :class="[
                    'h-4 w-4',
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
              <div v-if="searchQuery" class="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Pencarian aktif: "{{ searchQuery }}"
              </div>
            </div>
          </div>

          <!-- Advanced Filter Section (Collapsible) -->
          <div v-show="showAdvancedFilter" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
            <!-- Tahun Lahir Filter -->
            <div class="space-y-2">
              <label :class="[
                'flex text-sm font-medium items-center',
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                <svg class="w-4 h-4 mr-1.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Tahun Lahir
              </label>
              <div class="relative">
                <select v-model="selectedTahunLahir" :class="[
                  'block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:shadow-md appearance-none text-sm',
                  isDarkMode ? 'bg-dark-surface border-dark-border text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                ]">
                  <option value="">Semua Tahun</option>
                  <option v-for="tahun in availableYears" :key="tahun" :value="tahun">{{ tahun }}</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg :class="[
                    'h-4 w-4',
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              <div v-if="selectedTahunLahir" class="flex items-center text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Filter aktif
              </div>
            </div>

            <!-- Rentang Umur Filter -->
            <div class="space-y-2">
              <label :class="[
                'flex text-sm font-medium items-center',
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                <svg class="w-4 h-4 mr-1.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Rentang Umur
              </label>
              <div class="relative">
                <select v-model="selectedRentangUmur" :class="[
                  'block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:shadow-md appearance-none text-sm',
                  isDarkMode ? 'bg-dark-surface border-dark-border text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                ]">
                  <option value="">Semua Umur</option>
                  <option value="6-8">6-8 Tahun</option>
                  <option value="9-11">9-11 Tahun</option>
                  <option value="12-14">12-14 Tahun</option>
                  <option value="15-17">15-17 Tahun</option>
                  <option value="18+">18+ Tahun</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg :class="[
                    'h-4 w-4',
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              <div v-if="selectedRentangUmur" class="flex items-center text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Filter aktif
              </div>
            </div>

            <!-- Sorting Options -->
            <div class="space-y-2">
              <label :class="[
                'flex text-sm font-medium items-center',
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                <svg class="w-4 h-4 mr-1.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                </svg>
                Urutkan Berdasarkan
              </label>
              <div class="flex gap-2">
                <select v-model="sortBy" :class="[
                  'flex-1 px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:shadow-md appearance-none text-sm',
                  isDarkMode ? 'bg-dark-surface border-dark-border text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                ]">
                  <option value="nama">Nama</option>
                  <option value="nisn">NISN</option>
                  <option value="tanggal_lahir">Tanggal Lahir</option>
                  <option value="jenis_kelamin">Jenis Kelamin</option>
                </select>
                <button 
                  @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
                  :class="[
                    'px-3 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:shadow-md',
                    isDarkMode ? 'bg-dark-surface border-dark-border text-gray-100 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                  ]"
                  :title="sortOrder === 'asc' ? 'Urutkan Descending' : 'Urutkan Ascending'"
                >
                  <svg v-if="sortOrder === 'asc'" class="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
                  </svg>
                  <svg v-else class="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l-5 5m0 0l-5-5m5 5V6"></path>
                  </svg>
                </button>
              </div>
              <div :class="[
                'text-xs',
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]">
                Urutan: {{ sortOrder === 'asc' ? 'A → Z' : 'Z → A' }}
              </div>
            </div>
          </div>

          <!-- Active Filter Tags -->
          <div v-if="hasActiveFilters" class="pt-6 border-t border-gray-200">
            <div class="flex flex-wrap items-center gap-3">
              <span :class="[
                'text-sm font-semibold flex items-center',
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              ]">
                <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                Filter Aktif:
              </span>
              
              <div v-if="searchQuery" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Pencarian: "{{ searchQuery }}"
                <button @click="searchQuery = ''" class="ml-1.5 text-green-600 hover:text-green-800 transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div v-if="selectedKelas" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Kelas: {{ getKelasName(selectedKelas) }}
                <button @click="selectedKelas = ''" class="ml-1.5 text-purple-600 hover:text-purple-800 transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div v-if="selectedJenisKelamin" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 border border-pink-200">
                <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Jenis Kelamin: {{ getJenisKelamin(selectedJenisKelamin) }}
                <button @click="selectedJenisKelamin = ''" class="ml-1.5 text-pink-600 hover:text-pink-800 transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div v-if="selectedStatus" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Status: {{ getStatusText(selectedStatus) }}
                <button @click="selectedStatus = ''" class="ml-1.5 text-orange-600 hover:text-orange-800 transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div v-if="selectedTahunLahir" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Tahun Lahir: {{ selectedTahunLahir }}
                <button @click="selectedTahunLahir = ''" class="ml-1.5 text-orange-600 hover:text-orange-800 transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div v-if="selectedRentangUmur" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Rentang Umur: {{ selectedRentangUmur }} Tahun
                <button @click="selectedRentangUmur = ''" class="ml-1.5 text-indigo-600 hover:text-indigo-800 transition-colors">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Aksi & Tools Section -->
      <div :class="[
        'rounded-xl shadow-lg border mb-6 p-6',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <div class="flex-1">
            <label :class="[
              'flex text-sm font-semibold mb-3 items-center',
              isDarkMode ? 'text-gray-200' : 'text-gray-800'
            ]">
              <svg class="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              Aksi & Tools
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <button 
                @click="refreshData" 
                :disabled="siswaStore.isLoading"
                :class="[
                  'inline-flex items-center justify-center px-4 py-3 border rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed',
                  isDarkMode ? 'border-blue-600 text-blue-300 bg-blue-900/30 hover:bg-blue-900/50' : 'border-blue-300 text-blue-700 bg-blue-50 hover:bg-blue-100'
                ]"
              >
                <svg v-if="!siswaStore.isLoading" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <div v-else class="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mr-2"></div>
                {{ siswaStore.isLoading ? 'Memuat...' : 'Refresh Data' }}
              </button>
              <button 
                @click="triggerImport" 
                :disabled="siswaStore.isLoading"
                :class="[
                  'inline-flex items-center justify-center px-4 py-3 border rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed',
                  isDarkMode ? 'border-amber-600 text-amber-300 bg-amber-900/30 hover:bg-amber-900/50' : 'border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100'
                ]"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 8l-3-3m3 3l3-3"></path>
                </svg>
                Import Excel
              </button>
              <button 
                @click="downloadTemplate" 
                :disabled="siswaStore.isLoading"
                :class="[
                  'inline-flex items-center justify-center px-4 py-3 border rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed',
                  isDarkMode ? 'border-teal-600 text-teal-300 bg-teal-900/30 hover:bg-teal-900/50' : 'border-teal-300 text-teal-700 bg-teal-50 hover:bg-teal-100'
                ]"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                </svg>
                Template Excel
              </button>
              <button 
                @click="exportToExcel" 
                :disabled="filteredSiswaList.length === 0"
                :class="[
                  'inline-flex items-center justify-center px-4 py-3 border rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed',
                  isDarkMode ? 'border-green-600 text-green-300 bg-green-900/30 hover:bg-green-900/50' : 'border-green-300 text-green-700 bg-green-50 hover:bg-green-100'
                ]"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Export Excel
              </button>
              <button 
                @click="printData" 
                :disabled="filteredSiswaList.length === 0"
                :class="[
                  'inline-flex items-center justify-center px-4 py-3 border rounded-xl text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed',
                  isDarkMode ? 'border-purple-600 text-purple-300 bg-purple-900/30 hover:bg-purple-900/50' : 'border-purple-300 text-purple-700 bg-purple-50 hover:bg-purple-100'
                ]"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                </svg>
                Print Data
              </button>
            </div>
          </div>
        </div>

        <!-- Action Section -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-200">
          <div class="flex items-center space-x-3">
            <div class="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div>
              <h3 :class="[
                'text-base font-semibold',
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              ]">Kelola Data Siswa</h3>
              <p :class="[
                'text-sm',
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]">Tambah siswa baru atau kelola data yang sudah ada</p>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <button 
              @click="goToAdd"
              :class="[
                'inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
                isDarkMode ? 'bg-green-700 hover:bg-green-800' : 'bg-green-600 hover:bg-green-700'
              ]"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Tambah Siswa Baru
            </button>
          </div>
        </div>
      </div>

      <!-- Hidden file input for import -->
      <input
        ref="fileInputRef"
        type="file"
        accept=".xlsx,.xls"
        style="display: none;"
        @change="onFileChange"
      />

      <!-- Data Table -->
      <div :class="[
        'rounded-xl shadow-lg border overflow-hidden',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead :class="[
              isDarkMode ? 'bg-dark-surface' : 'bg-gray-50'
            ]">
              <tr>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">No</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Nama</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">NISN</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Tanggal Lahir</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Jenis Kelamin</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Kelas</th>
                <!-- ⭐ ID Sekolah dihide karena sudah otomatis filter by sekolah admin -->
                <!-- <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">ID Sekolah</th> -->
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Aksi</th>
              </tr>
            </thead>
            <tbody :class="[
              isDarkMode ? 'bg-dark-surface divide-dark-border' : 'bg-white divide-gray-200'
            ]">
              <tr v-for="(siswa, index) in paginatedSiswaList" :key="siswa.id_siswa" :class="[
                'transition-colors',
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              ]">
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm font-medium',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ siswa.nama }}</td>
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ siswa.nisn }}</td>
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ formatDate(siswa.tanggal_lahir) }}</td>
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ getJenisKelamin(siswa.jenis_kelamin) }}</td>
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm font-medium',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    isDarkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800'
                  ]">
                    {{ getKelasName(siswa.id_kelas) }}
                  </span>
                </td>
                <!-- ⭐ ID Sekolah dihide karena sudah otomatis filter by sekolah admin -->
                <!-- <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ siswa.id_sekolah }}</td> -->
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="goToDetail(siswa.id_siswa)" :class="[
                    'px-3 py-1 rounded-lg transition-colors',
                    isDarkMode ? 'text-green-400 bg-green-900/30 hover:bg-green-900/50' : 'text-green-600 bg-green-50 hover:bg-green-100'
                  ]">Detail</button>
                </td>
              </tr>
              <tr v-if="paginatedSiswaList.length === 0">
                <td colspan="7" :class="[
                  'px-6 py-12 text-center',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">
                  <div class="flex flex-col items-center">
                    <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p :class="[
                      'text-lg font-medium mb-2',
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    ]">Tidak ada data siswa</p>
                    <p :class="[
                      'text-gray-500',
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    ]">Coba ubah filter atau tambah siswa baru</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" :class="[
          'px-4 py-3 flex items-center justify-between border-t sm:px-6',
          isDarkMode ? 'border-dark-border bg-dark-surface' : 'border-gray-200 bg-gray-50'
        ]">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p :class="[
                'text-sm',
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                Menampilkan
                <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                sampai
                <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredSiswaList.length) }}</span>
                dari
                <span class="font-medium">{{ filteredSiswaList.length }}</span>
                hasil
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="[
                    page === currentPage
                      ? 'z-10 bg-green-50 border-green-500 text-green-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  ]"
                >
                  {{ page }}
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSiswaStore } from '@/stores/siswa'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { useSekolahScopeStore } from '@/stores/sekolahScope'
import Toast from '@/components/common/Toast.vue'
import axios from 'axios'
import ExcelJS from 'exceljs'

const router = useRouter()
const siswaStore = useSiswaStore()
const themeStore = useThemeStore()
const authStore = useAuthStore()
const sekolahScope = useSekolahScopeStore()
const isDarkMode = computed(() => themeStore.isDarkMode)

// ⭐ Toast notification state
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

// Reactive data  
const searchQuery = ref('')
const selectedSchool = ref('')
const selectedKelas = ref('')
const selectedStatus = ref('')
const showAdvancedFilter = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Filter Variables
const selectedJenisKelamin = ref('')
const selectedTahunLahir = ref('')
const selectedRentangUmur = ref('')
const selectedBulanLahir = ref('')
const sortBy = ref('nama')
const sortOrder = ref('asc')

// Import state
const fileInputRef = ref(null)
const isImporting = ref(false)
const importError = ref('')
const importedCount = ref(0)

// ⭐ Kelas data dari API
const kelasList = ref([])
const kelasLoading = ref(false)

// ✅ SEKOLAH LIST STATE
const sekolahList = ref([])
const sekolahLoading = ref(false)

// Computed properties
// ⭐ Filter kelas berdasarkan sekolah user yang login
const filteredKelasList = computed(() => {
  const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
  if (!userSekolahId) return kelasList.value
  
  return kelasList.value.filter(kelas => kelas.id_sekolah == userSekolahId)
})

// ⭐ Total siswa hanya di sekolah admin yang login (bukan total keseluruhan)
const totalSiswaSekolah = computed(() => {
  const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
  if (!userSekolahId) return siswaStore.getSiswaList.length
  
  return siswaStore.getSiswaList.filter(siswa => siswa.id_sekolah == userSekolahId).length
})

const filteredSiswaList = computed(() => {
  let filtered = siswaStore.getSiswaList

  // ⭐ OTOMATIS FILTER BY SEKOLAH USER YANG LOGIN
  const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
  if (userSekolahId) {
    filtered = filtered.filter(siswa => siswa.id_sekolah == userSekolahId)
  }

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(siswa => 
      siswa.nama?.toLowerCase().includes(query) ||
      siswa.nisn?.toLowerCase().includes(query) ||
      siswa.email?.toLowerCase().includes(query)
    )
  }

  // Kelas filter
  if (selectedKelas.value) {
    filtered = filtered.filter(siswa => siswa.id_kelas === selectedKelas.value)
  }

  // ✅ NEW FILTERS - Jenis Kelamin
  if (selectedJenisKelamin.value) {
    filtered = filtered.filter(siswa => siswa.jenis_kelamin === selectedJenisKelamin.value)
  }

  // ✅ NEW FILTERS - Tahun Lahir
  if (selectedTahunLahir.value) {
    filtered = filtered.filter(siswa => {
      if (!siswa.tanggal_lahir) return false
      const tahunLahir = new Date(siswa.tanggal_lahir).getFullYear()
      return tahunLahir.toString() === selectedTahunLahir.value
    })
  }

  // ✅ NEW FILTERS - Rentang Umur
  if (selectedRentangUmur.value) {
    filtered = filtered.filter(siswa => {
      if (!siswa.tanggal_lahir) return false
      const umur = calculateAge(siswa.tanggal_lahir)
      
      switch (selectedRentangUmur.value) {
        case '6-8': return umur >= 6 && umur <= 8
        case '9-11': return umur >= 9 && umur <= 11
        case '12-14': return umur >= 12 && umur <= 14
        case '15-17': return umur >= 15 && umur <= 17
        case '18+': return umur >= 18
        default: return true
      }
    })
  }

  // ✅ NEW FILTERS - Bulan Lahir
  if (selectedBulanLahir.value) {
    filtered = filtered.filter(siswa => {
      if (!siswa.tanggal_lahir) return false
      const bulanLahir = new Date(siswa.tanggal_lahir).getMonth() + 1
      return bulanLahir.toString() === selectedBulanLahir.value
    })
  }

  // ✅ SORTING IMPLEMENTATION
  if (sortBy.value) {
    filtered.sort((a, b) => {
      let aValue = a[sortBy.value]
      let bValue = b[sortBy.value]

      // Handle null/undefined values
      if (!aValue && !bValue) return 0
      if (!aValue) return sortOrder.value === 'asc' ? 1 : -1
      if (!bValue) return sortOrder.value === 'asc' ? -1 : 1

      // Handle different data types
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1
      if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1
      return 0
    })
  }

  return filtered
})

const paginatedSiswaList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredSiswaList.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredSiswaList.value.length / itemsPerPage.value)
})

// ✅ NEW COMPUTED PROPERTIES FOR FILTER OPTIONS
const availableYears = computed(() => {
  const years = new Set()
  siswaStore.getSiswaList.forEach(siswa => {
    if (siswa.tanggal_lahir) {
      years.add(new Date(siswa.tanggal_lahir).getFullYear())
    }
  })
  return Array.from(years).sort((a, b) => b - a) // Sort descending (newest first)
})

const hasActiveFilters = computed(() => {
  return searchQuery.value || 
         selectedKelas.value || 
         selectedJenisKelamin.value || 
         selectedTahunLahir.value || 
         selectedRentangUmur.value || 
         selectedBulanLahir.value
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})



const activeFilterCount = computed(() => {
  let count = 0
  if (searchQuery.value) count++
  if (selectedKelas.value) count++
  if (selectedJenisKelamin.value) count++
  if (selectedTahunLahir.value) count++
  if (selectedRentangUmur.value) count++
  if (selectedBulanLahir.value) count++
  return count
})

// ✅ HELPER FUNCTIONS FOR NEW FILTERS
const calculateAge = (birthDate) => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}

const getRentangUmurText = (rentang) => {
  const texts = {
    '6-8': '6-8 Tahun (SD Kelas 1-2)',
    '9-11': '9-11 Tahun (SD Kelas 3-5)', 
    '12-14': '12-14 Tahun (SD-SMP)',
    '15-17': '15-17 Tahun (SMA)',
    '18+': '18+ Tahun'
  }
  return texts[rentang] || rentang
}

const getBulanName = (bulan) => {
  const bulanNames = [
    '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]
  return bulanNames[parseInt(bulan)] || bulan
}

const toggleAdvancedFilter = () => {
  showAdvancedFilter.value = !showAdvancedFilter.value
}

const resetAllFilters = () => {
  searchQuery.value = ''
  selectedKelas.value = ''
  selectedJenisKelamin.value = ''
  selectedTahunLahir.value = ''
  selectedRentangUmur.value = ''
  selectedBulanLahir.value = ''
  sortBy.value = 'nama'
  sortOrder.value = 'asc'
  currentPage.value = 1
}

// Methods
const fetchData = async () => {
  try {
    await siswaStore.fetchSiswaList()
  } catch (error) {
    console.error('Error fetching siswa data:', error)
  }
}

const refreshData = async () => {
  await fetchData()
}

const goToAdd = () => {
  router.push({ name: 'SiswaAdd' })
}

const goToDetail = (id_siswa) => {
  router.push({ name: 'SiswaDetail', params: { id: id_siswa } })
}

const clearAllFilters = () => {
  searchQuery.value = ''
  // ⭐ selectedSchool tidak direset karena sudah otomatis filter by sekolah user
  // selectedSchool.value = ''
  selectedKelas.value = ''
  // ⭐ selectedStatus tidak direset karena filter status dihide
  // selectedStatus.value = ''
  currentPage.value = 1
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

const getStatusClass = (status) => {
  switch (status) {
    case 'aktif':
      return 'bg-green-100 text-green-800'
    case 'tidak_aktif':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'aktif':
      return 'Aktif'
    case 'tidak_aktif':
      return 'Tidak Aktif'
    default:
      return 'Unknown'
  }
}

const getSiswaEmail = (siswa) => {
  // Cek beberapa kemungkinan field email
  if (siswa.email) return siswa.email
  if (siswa.user && siswa.user.email) return siswa.user.email
  // Debug log jika email tidak ditemukan
  console.warn('Email siswa tidak ditemukan:', siswa)
  return '-'
}

// ⭐ Fetch kelas dari API
const fetchKelasList = async () => {
  kelasLoading.value = true
  try {
    const response = await axios.get('/list/kelas')
    kelasList.value = response.data.data || []
  } catch (error) {
    kelasList.value = []
  } finally {
    kelasLoading.value = false
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

// ⭐ Helper function untuk mendapatkan nama kelas dari id_kelas
const getKelasName = (id_kelas) => {
  if (!id_kelas) return '-'
  const kelas = kelasList.value.find(k => k.id_kelas == id_kelas)
  return kelas ? (kelas.nama_kelas || kelas.kelas || `Kelas ${id_kelas}`) : id_kelas
}

// ⭐ Helper function untuk format tanggal (hanya tahun-bulan-hari)
const formatDate = (dateString) => {
  if (!dateString) return '-'
  try {
    // Jika sudah format YYYY-MM-DD, return langsung
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString
    }
    // Jika ada timestamp/jam, ambil hanya tanggalnya
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString // Invalid date, return as is
    
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  } catch (error) {
    return dateString
  }
}

// ⭐ Helper function untuk jenis kelamin lengkap
const getJenisKelamin = (jk) => {
  if (!jk) return '-'
  return jk === 'L' ? 'Laki-laki' : jk === 'P' ? 'Perempuan' : jk
}

// Import/Export Methods
const triggerImport = () => {
  fileInputRef.value?.click()
}

const onFileChange = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  isImporting.value = true
  importError.value = ''
  importedCount.value = 0

  // ⭐ Get user's school ID for auto-assignment
  const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId

  if (!userSekolahId) {
    importError.value = 'ID Sekolah tidak ditemukan. Silakan login ulang.'
    isImporting.value = false
    return
  }

  try {
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(file)
    const worksheet = workbook.getWorksheet(1)
    
    if (!worksheet) {
      throw new Error('Worksheet tidak ditemukan')
    }

    const siswaData = []
    let rowCount = 0
    const errors = []

    // Start from row 2 (skip header)
    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
      const row = worksheet.getRow(rowNumber)
      
      // Skip empty rows
      if (!row.values || row.values.length <= 1) continue

      const nama = row.getCell(1).text?.trim()
      const nisn = row.getCell(2).text?.trim()
      const tanggal_lahir = row.getCell(3).text?.trim()
      let jenis_kelamin = row.getCell(4).text?.trim()
      const id_kelas = row.getCell(5).text?.trim()

      // ⭐ Validasi jenis kelamin: convert dari "Laki-laki"/"Perempuan" ke "L"/"P"
      if (jenis_kelamin) {
        if (jenis_kelamin.toLowerCase() === 'laki-laki' || jenis_kelamin.toLowerCase() === 'l') {
          jenis_kelamin = 'L'
        } else if (jenis_kelamin.toLowerCase() === 'perempuan' || jenis_kelamin.toLowerCase() === 'p') {
          jenis_kelamin = 'P'
        } else {
          errors.push(`Baris ${rowNumber}: Jenis kelamin tidak valid (harus L/P atau Laki-laki/Perempuan)`)
          continue
        }
      }

      // ⭐ Validasi kelas harus ada di sekolah yang sama
      const kelasId = id_kelas ? parseInt(id_kelas) : null
      if (kelasId) {
        const kelasValid = filteredKelasList.value.find(k => k.id_kelas === kelasId)
        if (!kelasValid) {
          errors.push(`Baris ${rowNumber}: ID Kelas ${kelasId} tidak tersedia di sekolah Anda`)
          continue
        }
      }

      if (nama && nisn) {
        siswaData.push({
          nama,
          nisn,
          tanggal_lahir: tanggal_lahir || null,
          jenis_kelamin: jenis_kelamin || null,
          id_kelas: kelasId,
          id_sekolah: userSekolahId // ⭐ Auto-set dari admin yang login
        })
        rowCount++
      }
    }

    if (errors.length > 0) {
      throw new Error(`Ditemukan ${errors.length} error:\n${errors.slice(0, 5).join('\n')}${errors.length > 5 ? '\n...' : ''}`)
    }

    if (rowCount === 0) {
      throw new Error('Tidak ada data valid yang ditemukan dalam file Excel')
    }

    // ⭐ Kirim data ke API backend
    console.log('Data siswa yang akan diimport:', siswaData)
    const response = await axios.post('/add/siswa', siswaData)
    
    if (response.data.success) {
      importedCount.value = response.data.insertedCount || rowCount
      
      // Show success notification
      showNotification('success', 'Import Berhasil!', `${importedCount.value} data siswa berhasil diimport`, 2000)

    // Clear file input
    event.target.value = ''
    
    // Refresh data after successful import
    await fetchData()
    } else {
      throw new Error(response.data.message || 'Gagal mengimport data')
    }
    
  } catch (error) {
    console.error('Import error:', error)
    importError.value = error.response?.data?.message || error.message || 'Terjadi kesalahan saat mengimport data'
    
    // Show error notification
    showNotification('error', 'Import Gagal', importError.value, 4000)
  } finally {
    isImporting.value = false
  }
}

const downloadTemplate = async () => {
  try {
    const workbook = new ExcelJS.Workbook()
    
    // ============================================
    // SHEET 1: Template Siswa (Data Entry)
    // ============================================
    const worksheet = workbook.addWorksheet('Template Siswa')
    
    // ⭐ Add headers (tanpa ID Sekolah karena auto-set)
    worksheet.addRow(['Nama', 'NISN', 'Tanggal Lahir', 'Jenis Kelamin', 'ID Kelas'])
    
    // ⭐ Add sample data dengan format yang benar (L/P, bukan Laki-laki/Perempuan)
    // Tambahkan contoh kelas yang tersedia di sekolah admin
    const contohKelasId = filteredKelasList.value.length > 0 ? filteredKelasList.value[0].id_kelas : '1'
    worksheet.addRow(['Budi Santoso', '1234567890', '2010-01-15', 'L', contohKelasId])
    worksheet.addRow(['Siti Nurhaliza', '0987654321', '2010-03-20', 'P', contohKelasId])
    
    // Style the header
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4CAF50' }
      }
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
    })
    
    // Style sample data rows
    for (let i = 2; i <= 3; i++) {
      worksheet.getRow(i).eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF0F0F0' }
        }
      })
    }
    
    // Auto-size columns for Template sheet
    worksheet.columns = [
      { width: 25 },
      { width: 15 },
      { width: 18 },
      { width: 18 },
      { width: 12 }
    ]
    
    // ============================================
    // SHEET 2: Petunjuk Pengisian
    // ============================================
    const instructionSheet = workbook.addWorksheet('Petunjuk')
    
    // Header Petunjuk
    instructionSheet.addRow(['PETUNJUK PENGISIAN TEMPLATE SISWA'])
    instructionSheet.mergeCells('A1:C1')
    instructionSheet.getRow(1).getCell(1).font = { 
      bold: true, 
      size: 16, 
      color: { argb: 'FFFFFFFF' } 
    }
    instructionSheet.getRow(1).getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4CAF50' }
    }
    instructionSheet.getRow(1).getCell(1).alignment = { 
      vertical: 'middle', 
      horizontal: 'center' 
    }
    instructionSheet.getRow(1).height = 35
    
    // Add empty row
    instructionSheet.addRow([])
    
    // Add instructions header
    instructionSheet.addRow(['No', 'Kolom', 'Keterangan'])
    instructionSheet.getRow(3).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF2E7D32' }
      }
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    })
    instructionSheet.getRow(3).height = 25
    
    // Instruction details dengan border
    const instructions = [
      ['1', 'Nama', 'Isi dengan nama lengkap siswa'],
      ['2', 'NISN', 'Nomor Induk Siswa Nasional (10 digit)'],
      ['3', 'Tanggal Lahir', 'Format YYYY-MM-DD (contoh: 2010-01-15)'],
      ['4', 'Jenis Kelamin', 'Isi dengan L (Laki-laki) atau P (Perempuan)']
    ]
    
    instructions.forEach(([no, kolom, keterangan]) => {
      instructionSheet.addRow([no, kolom, keterangan])
    })
    
    // ⭐ Point 5: Daftar kelas DINAMIS dari database
    const kelasOptions = filteredKelasList.value.length > 0 
      ? filteredKelasList.value.map(k => `${k.id_kelas}=${k.nama_kelas || k.kelas || 'Kelas ' + k.id_kelas}`).join(', ')
      : 'Belum ada kelas tersedia'
    instructionSheet.addRow(['5', 'ID Kelas', `Pilih dari kelas yang tersedia di sekolah Anda: ${kelasOptions}`])
    
    // Style instruction rows dengan border dan alternating colors
    for (let i = 4; i <= 8; i++) {
      instructionSheet.getRow(i).eachCell((cell, colNumber) => {
        cell.alignment = { 
          vertical: 'middle', 
          horizontal: colNumber === 1 ? 'center' : 'left', 
          wrapText: true 
        }
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: i % 2 === 0 ? 'FFFFFFFF' : 'FFF1F8E9' }
        }
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFD0D0D0' } },
          left: { style: 'thin', color: { argb: 'FFD0D0D0' } },
          bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } },
          right: { style: 'thin', color: { argb: 'FFD0D0D0' } }
        }
      })
      instructionSheet.getRow(i).height = i === 8 ? 35 : 25
    }
    
    // Add empty rows
    instructionSheet.addRow([])
    instructionSheet.addRow([])
    
    // Add important notes header
    instructionSheet.addRow(['CATATAN PENTING:'])
    instructionSheet.mergeCells('A11:C11')
    instructionSheet.getRow(11).getCell(1).font = { 
      bold: true, 
      color: { argb: 'FFFF5722' }, 
      size: 13 
    }
    instructionSheet.getRow(11).getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFE0B2' }
    }
    instructionSheet.getRow(11).getCell(1).alignment = { 
      vertical: 'middle', 
      horizontal: 'left' 
    }
    instructionSheet.getRow(11).height = 30
    
    // Add notes
    const notes = [
      '• ID Sekolah akan otomatis disesuaikan dengan akun admin yang login',
      '• Pastikan format tanggal sesuai (YYYY-MM-DD)',
      '• Jenis kelamin hanya L atau P',
      '• ID Kelas harus sesuai dengan kelas yang tersedia di sekolah Anda',
      '• Hapus baris contoh (Budi Santoso dan Siti Nurhaliza) sebelum mengisi data siswa'
    ]
    
    notes.forEach(note => {
      instructionSheet.addRow([note])
      const currentRow = instructionSheet.lastRow
      instructionSheet.mergeCells(`A${currentRow.number}:C${currentRow.number}`)
      currentRow.getCell(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFF9C4' }
      }
      currentRow.getCell(1).alignment = { 
        vertical: 'middle', 
        horizontal: 'left',
        wrapText: true 
      }
      currentRow.getCell(1).font = { size: 10 }
      currentRow.height = 22
    })
    
    // Auto-size columns untuk Petunjuk sheet
    instructionSheet.columns = [
      { width: 6 },     // No
      { width: 18 },    // Kolom
      { width: 80 }     // Keterangan (lebih lebar)
    ]
    
    // Generate buffer and download
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    })
    
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'template_siswa.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    // Show notification
    showNotification('success', 'Template Berhasil Diunduh', 'Silakan isi template dan upload kembali untuk import data siswa', 2000)
    
  } catch (error) {
    console.error('Download template error:', error)
    showNotification('error', 'Gagal Mengunduh Template', error.message || 'Terjadi kesalahan', 3000)
  }
}

const exportToExcel = async () => {
  try {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Data Siswa')
    
    // Add headers
    worksheet.addRow(['No', 'Nama', 'NISN', 'Tanggal Lahir', 'Jenis Kelamin', 'Kelas'])
    
    // Add data
    filteredSiswaList.value.forEach((siswa, index) => {
      worksheet.addRow([
        index + 1,
        siswa.nama,
        siswa.nisn,
        formatDate(siswa.tanggal_lahir),
        getJenisKelamin(siswa.jenis_kelamin),
        getKelasName(siswa.id_kelas)
      ])
    })
    
    // Style the header
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true }
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      }
    })
    
    // Auto-size columns
    worksheet.columns.forEach((column) => {
      column.width = 15
    })
    
    // Generate buffer and download
    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    })
    
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `data_siswa_${new Date().toISOString().split('T')[0]}.xlsx`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
  } catch (error) {
    console.error('Export error:', error)
  }
}

const printData = () => {
  const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Data Siswa</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h1 { text-align: center; color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .no-data { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <h1>Data Siswa</h1>
      <p>Dicetak pada: ${new Date().toLocaleDateString('id-ID')}</p>
      <p>Total data: ${filteredSiswaList.value.length} siswa</p>
      
      ${filteredSiswaList.value.length > 0 ? `
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>NISN</th>
              <th>Tanggal Lahir</th>
              <th>Jenis Kelamin</th>
              <th>Kelas</th>
            </tr>
          </thead>
          <tbody>
            ${filteredSiswaList.value.map((siswa, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${siswa.nama}</td>
                <td>${siswa.nisn}</td>
                <td>${formatDate(siswa.tanggal_lahir)}</td>
                <td>${getJenisKelamin(siswa.jenis_kelamin)}</td>
                <td>${getKelasName(siswa.id_kelas)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : '<div class="no-data">Tidak ada data siswa untuk dicetak</div>'}
    </body>
    </html>
  `
  
  const printWindow = window.open('', '_blank')
  printWindow.document.write(printContent)
  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
  printWindow.close()
}

// Watchers
// ⭐ selectedSchool dan selectedStatus tidak di-watch
watch([searchQuery, selectedKelas], () => {
  currentPage.value = 1
})

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchKelasList(),
    fetchSekolahList(),
    fetchData()
  ])
})
</script>

<style scoped>
.siswa-list {
  max-width: 800px;
  margin: 0 auto;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.btn {
  margin-right: 4px;
}
</style> 