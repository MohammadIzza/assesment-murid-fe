<template>
  <div :class="[
    'min-h-screen py-8 transition-colors duration-300',
    isDarkMode ? 'bg-dark-background' : 'bg-gray-50'
  ]" style="padding-top: 5rem;">
    <Toast 
      :show="showToast" 
      :type="toastType" 
      :title="toastTitle" 
      :message="toastMessage" 
      @close="showToast = false" 
    />
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div :class="[
        'rounded-xl shadow-lg border p-8 mb-8 text-white',
        isDarkMode ? 'bg-gradient-to-r from-purple-800 to-purple-900 border-purple-700' : 'bg-gradient-to-r from-purple-600 to-purple-700 border-purple-600'
      ]">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div class="flex items-center space-x-6">
            <div class="relative">
              <div :class="[
                'flex items-center justify-center w-16 h-16 backdrop-blur-sm rounded-xl shadow-lg',
                isDarkMode ? 'bg-white/10' : 'bg-white/20'
              ]">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-white mb-2">Daftar Capaian Kelas</h1>
              <p :class="[
                'text-base',
                isDarkMode ? 'text-purple-200' : 'text-purple-100'
              ]">Kelola dan pantau data capaian kelas dalam sistem assessment</p>
            </div>
          </div>
          <div class="mt-6 lg:mt-0">
            <div :class="[
              'backdrop-blur-sm rounded-xl p-6 text-center border',
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white/10 border-white/20'
            ]">
              <div class="text-2xl font-bold text-white mb-1">{{ filteredCapaianKelasList.length }}</div>
              <div :class="[
                'text-sm font-medium mb-2',
                isDarkMode ? 'text-purple-200' : 'text-purple-100'
              ]">Total Capaian Kelas</div>
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
          isDarkMode ? 'bg-gradient-to-r from-gray-700 to-gray-800 border-dark-border' : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
        ]">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="flex items-center space-x-3">
              <div :class="[
                'flex items-center justify-center w-10 h-10 rounded-xl shadow-sm',
                isDarkMode ? 'bg-purple-800' : 'bg-purple-100'
              ]">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
                </svg>
              </div>
              <div>
                <h3 :class="[
                  'text-lg font-semibold',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">Filter & Pencarian Data Capaian Kelas</h3>
                <p :class="[
                  'text-sm',
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                ]">Temukan dan filter data capaian kelas berdasarkan kriteria spesifik</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div v-if="hasActiveFilters" :class="[
                'flex items-center text-sm px-4 py-2 rounded-full shadow-sm border',
                isDarkMode ? 'text-purple-300 bg-purple-900/30 border-purple-700' : 'text-purple-700 bg-purple-100 border-purple-200'
              ]">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ activeFilterCount }} Filter Aktif
              </div>
              <button 
                v-if="hasActiveFilters"
                @click="clearAllFilters" 
                :class="[
                  'text-sm px-4 py-2 rounded-full border transition-colors hover:shadow-sm',
                  isDarkMode ? 'border-red-600 text-red-400 hover:bg-red-900/20' : 'border-red-300 text-red-600 hover:bg-red-50'
                ]"
              >
                <svg class="w-4 h-4 mr-1 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        <!-- Filter Body -->
        <div class="p-6 space-y-6">
          <!-- Filter Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Kelas Filter -->
            <div class="space-y-2">
              <label :class="[
                'flex text-sm font-medium items-center',
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                <svg class="w-4 h-4 mr-1.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
                Kelas
              </label>
              <div class="relative">
                <select v-model="selectedKelas" @change="applyFilters" :class="[
                  'block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:shadow-md appearance-none text-sm',
                  isDarkMode ? 'bg-dark-surface border-dark-border text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                ]">
                  <option value="">Semua Kelas</option>
                  <option v-for="kls in kelasStore.getSortedKelasList" :key="kls.id_kelas" :value="kls.id_kelas">{{ kls.nama_kelas }}</option>
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
              <div v-if="selectedKelas" class="flex items-center text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Filter aktif
              </div>
            </div>

            <!-- Dimensi Filter -->
            <div class="space-y-2">
              <label :class="[
                'flex text-sm font-medium items-center',
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                <svg class="w-4 h-4 mr-1.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4a1 1 0 011-1h4M4 8h16M4 8v8a1 1 0 001 1h4m8-9V4a1 1 0 011-1h4M20 8v8a1 1 0 01-1 1h-4M12 8h4.5a1 1 0 011 1v6a1 1 0 01-1 1h-9a1 1 0 01-1-1V9a1 1 0 011-1H12z"></path>
                </svg>
                Dimensi
              </label>
              <div class="relative">
                <select v-model="selectedDimensi" @change="onDimensiChange" :class="[
                  'block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:shadow-md appearance-none text-sm',
                  isDarkMode ? 'bg-dark-surface border-dark-border text-gray-100' : 'bg-white border-gray-300 text-gray-900'
                ]">
                  <option value="">Semua Dimensi</option>
                  <option v-for="d in dimensiStore.getDimensiList" :key="d.id_dimensi" :value="d.id_dimensi">{{ d.nama_dimensi }}</option>
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
              <div v-if="selectedDimensi" class="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Filter aktif
              </div>
            </div>

            <!-- Elemen Filter -->
            <div class="space-y-2">
              <label :class="[
                'flex text-sm font-medium items-center',
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                <svg class="w-4 h-4 mr-1.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2zm8 0h-2a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2z"></path>
                </svg>
                Elemen
              </label>
              <div class="relative">
                <select v-model="selectedElemen" @change="onElemenChange" :disabled="!selectedDimensi" :class="[
                  'block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:shadow-md appearance-none text-sm',
                  isDarkMode ? 'bg-dark-surface border-dark-border text-gray-100' : 'bg-white border-gray-300 text-gray-900',
                  !selectedDimensi ? 'opacity-50 cursor-not-allowed' : ''
                ]">
                  <option value="">Semua Elemen</option>
                  <option v-for="e in elemenStore.getElemenList" :key="e.id_elemen" :value="e.id_elemen">{{ e.nama_elemen }}</option>
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
              <div v-if="selectedElemen" class="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Filter aktif
              </div>
            </div>

            <!-- Sub Elemen Filter -->
            <div class="space-y-2">
              <label :class="[
                'flex text-sm font-medium items-center',
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              ]">
                <svg class="w-4 h-4 mr-1.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                Sub Elemen
              </label>
              <div class="relative">
                <select v-model="selectedSubElemen" @change="applyFilters" :disabled="!selectedElemen" :class="[
                  'block w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:shadow-md appearance-none text-sm',
                  isDarkMode ? 'bg-dark-surface border-dark-border text-gray-100' : 'bg-white border-gray-300 text-gray-900',
                  !selectedElemen ? 'opacity-50 cursor-not-allowed' : ''
                ]">
                  <option value="">Semua Sub Elemen</option>
                  <option v-for="se in subElemenStore.getSubElemenList" :key="se.id_sub_elemen" :value="se.id_sub_elemen">{{ se.nama_sub_elemen }}</option>
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
              <div v-if="selectedSubElemen" class="flex items-center text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Filter aktif
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Section -->
      <div :class="[
        'rounded-xl shadow-lg border mb-6 p-6',
        isDarkMode ? 'bg-dark-surface border-dark-border' : 'bg-white border-gray-200'
      ]">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
              ]">Kelola Data Capaian Kelas</h3>
              <p :class="[
                'text-sm',
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              ]">Tambah capaian kelas baru atau kelola data yang sudah ada</p>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <button 
              @click="goToAddCapaianKelas"
              :class="[
                'inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5',
                isDarkMode ? 'bg-purple-700 hover:bg-purple-800' : 'bg-purple-600 hover:bg-purple-700'
              ]"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Tambah Capaian Kelas Baru
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="capaianKelasStore.isLoading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div class="text-center">
          <div class="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-600 font-medium">Memuat data capaian kelas...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="capaianKelasStore.getError" class="bg-white rounded-xl shadow-sm border border-red-200 p-12">
        <div class="text-center">
          <div class="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Terjadi Kesalahan</h3>
          <p class="text-gray-600 mb-4">{{ capaianKelasStore.getError }}</p>
          <button @click="loadCapaianKelasData" class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Coba Lagi
          </button>
        </div>
      </div>

      <!-- Data Table -->
      <div v-else :class="[
        'rounded-xl border overflow-hidden',
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
                ]">ID</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Kode CK</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Nama CK</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Sekolah</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Sub Elemen</th>
                <th :class="[
                  'px-6 py-4 text-left text-xs font-medium uppercase tracking-wider',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">Aksi</th>
              </tr>
            </thead>
            <tbody :class="[
              isDarkMode ? 'bg-dark-surface divide-dark-border' : 'bg-white divide-gray-200'
            ]">
              <tr v-for="capaianKelas in paginatedCapaianKelasList" :key="capaianKelas.id" :class="[
                'transition-colors',
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              ]">
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ capaianKelas.id }}</td>
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ capaianKelas.kode_ck }}</td>
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ capaianKelas.nama_ck }}</td>
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ getSekolahName(capaianKelas.id_sekolah) }}</td>
                <td :class="[
                  'px-6 py-4 whitespace-nowrap text-sm',
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                ]">{{ getSubElemenName(capaianKelas.id_sub_elemen || capaianKelas.id_capaian) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <button @click="editCapaianKelas(capaianKelas.id)" :class="[
                      'text-blue-600 hover:text-blue-900 px-2 py-1 rounded transition-colors',
                      isDarkMode ? 'bg-blue-900/30 hover:bg-blue-900/50' : 'bg-blue-50 hover:bg-blue-100'
                    ]">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </button>
                    <button @click="deleteCapaianKelas(capaianKelas.id)" :class="[
                      'text-red-600 hover:text-red-900 px-2 py-1 rounded transition-colors',
                      isDarkMode ? 'bg-red-900/30 hover:bg-red-900/50' : 'bg-red-50 hover:bg-red-100'
                    ]">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="paginatedCapaianKelasList.length === 0">
                <td colspan="6" :class="[
                  'px-6 py-12 text-center',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                ]">
                  <div>Tidak ada data capaian kelas</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination & Controls -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t" :class="isDarkMode ? 'border-dark-border' : 'border-gray-200'">
          <div :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" class="text-sm">
            Menampilkan {{ displayRangeStart }}–{{ displayRangeEnd }} dari {{ filteredCapaianKelasList.length }} data
          </div>
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <span :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" class="text-sm">Per halaman:</span>
              <select v-model.number="itemsPerPage" @change="onItemsPerPageChange" :class="['px-2 py-1 rounded-md border text-sm', isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300']">
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <button @click="prevPage" :disabled="currentPage === 1" :class="['px-3 py-1 rounded-md text-sm border', currentPage === 1 ? 'opacity-50 cursor-not-allowed' : '', isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-300 hover:bg-gray-50']">Sebelumnya</button>
              <span :class="isDarkMode ? 'text-gray-300' : 'text-gray-700'" class="text-sm">Hal {{ currentPage }} / {{ totalPages || 1 }}</span>
              <button @click="nextPage" :disabled="currentPage >= totalPages" :class="['px-3 py-1 rounded-md text-sm border', currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : '', isDarkMode ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' : 'bg-white border-gray-300 hover:bg-gray-50']">Berikutnya</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
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
  name: 'CapaianKelasList',
  components: { Toast },
  setup() {
    const router = useRouter()
    const capaianKelasStore = useCapaianKelasStore()
  const themeStore = useThemeStore()
    const isDarkMode = computed(() => themeStore.isDarkMode)
  const kelasStore = useKelasStore()
  const dimensiStore = useDimensiStore()
  const elemenStore = useElemenStore()
  const subElemenStore = useSubElemenStore()
  const authStore = useAuthStore()
  const sekolahScope = useSekolahScopeStore()
    
    // Reactive data
  const currentPage = ref(1)
    const itemsPerPage = ref(10)
  // Filters
  const selectedKelas = ref('')
  const selectedDimensi = ref('')
  const selectedElemen = ref('')
  const selectedSubElemen = ref('')
  // Toast
  const showToast = ref(false)
  const toastType = ref('info')
  const toastTitle = ref('')
  const toastMessage = ref('')

    // Computed properties
    const filteredCapaianKelasList = computed(() => {
      // ⭐ Multi-tenancy: Filter by sekolah user yang login
      const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
      
      let list = [...capaianKelasStore.getCapaianKelasList]
      
      // Filter by sekolah
      if (userSekolahId) {
        list = list.filter(capaian => capaian.id_sekolah == userSekolahId)
      }
      
      return list
    })

    const hasActiveFilters = computed(() => {
      return !!(selectedKelas.value || selectedDimensi.value || selectedElemen.value || selectedSubElemen.value)
    })

    const activeFilterCount = computed(() => {
      let count = 0
      if (selectedKelas.value) count++
      if (selectedDimensi.value) count++
      if (selectedElemen.value) count++
      if (selectedSubElemen.value) count++
      return count
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredCapaianKelasList.value.length / itemsPerPage.value)
    })

    const paginatedCapaianKelasList = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredCapaianKelasList.value.slice(start, end)
    })

    const displayRangeStart = computed(() => {
      if (filteredCapaianKelasList.value.length === 0) return 0
      return (currentPage.value - 1) * itemsPerPage.value + 1
    })

    const displayRangeEnd = computed(() => {
      return Math.min(currentPage.value * itemsPerPage.value, filteredCapaianKelasList.value.length)
    })

    // Helper functions
    const getSekolahName = (sekolahId) => {
      if (!sekolahId) return '-'
      // Cari dari sekolahScope atau authStore
      const sekolahList = sekolahScope.sekolahList || []
      const sekolah = sekolahList.find(s => s.id_sekolah == sekolahId)
      if (sekolah) return sekolah.nama_sekolah || `Sekolah ${sekolahId}`
      
      // Fallback: jika user login dari sekolah ini, ambil dari authStore
      const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
      if (sekolahId == userSekolahId) {
        return authStore.user?.schoolName || sekolahScope.activeSekolahName || `Sekolah ${sekolahId}`
      }
      
      return `Sekolah ${sekolahId}`
    }

    const getSubElemenName = (subElemenId) => {
      if (!subElemenId) return '-'
      const subElemenList = subElemenStore.getSubElemenList || []
      const subElemen = subElemenList.find(se => se.id_sub_elemen == subElemenId)
      return subElemen ? subElemen.nama_sub_elemen : `Sub Elemen ${subElemenId}`
    }

    // Methods
    const loadCapaianKelasData = async () => {
      try {
        await Promise.all([
          kelasStore.fetchKelasList(),
          dimensiStore.fetchDimensiList(),
          subElemenStore.fetchSubElemenList(), // ⭐ Load semua sub elemen untuk mapping nama
        ])
        await capaianKelasStore.fetchCapaianKelasList()
      } catch (error) {
        console.error('Failed to load capaian kelas data:', error)
      }
    }

    const refreshData = async () => {
      await loadCapaianKelasData()
    }

    const goToAddCapaianKelas = () => {
      router.push({ name: 'capaian-kelas-add' })
    }

    const editCapaianKelas = (id) => {
      router.push({ name: 'capaian-kelas-edit', params: { id } })
    }

    const deleteCapaianKelas = async (id) => {
      try {
        // ⭐ CASCADE CHECK: Cek apakah capaian_kelas punya assessment
        const assessmentResponse = await axios.get(`/filter/capaian_kelas/${id}/assessment`)
        
        if (assessmentResponse.data.success && assessmentResponse.data.data && assessmentResponse.data.data.length > 0) {
          const assessmentCount = assessmentResponse.data.data.length
          showToast.value = true
          toastType.value = 'error'
          toastTitle.value = 'Tidak Dapat Dihapus'
          toastMessage.value = `Capaian kelas ini memiliki ${assessmentCount} assessment. Hapus assessment terlebih dahulu sebelum menghapus capaian kelas.`
          return
        }
      } catch (error) {
        console.error('Failed to check assessments:', error)
        // Jika error saat check, tetap lanjutkan ke confirm delete
      }
      
      // ⭐ Multi-tenancy: Validasi akses sebelum delete
      const capaian = capaianKelasStore.getCapaianKelasList.find(c => c.id === id)
      if (capaian) {
        const userSekolahId = authStore.user?.idSekolah || sekolahScope.activeSekolahId
        if (userSekolahId && capaian.id_sekolah != userSekolahId) {
          showToast.value = true
          toastType.value = 'error'
          toastTitle.value = 'Akses Ditolak'
          toastMessage.value = 'Anda tidak memiliki akses untuk menghapus capaian kelas dari sekolah lain'
          return
        }
      }
      
      if (confirm('Apakah Anda yakin ingin menghapus data capaian kelas ini?')) {
        try {
          await capaianKelasStore.deleteCapaianKelas(id)
          showToast.value = true
          toastType.value = 'success'
          toastTitle.value = 'Berhasil'
          toastMessage.value = 'Data capaian kelas berhasil dihapus'
        } catch (error) {
          console.error('Failed to delete capaian kelas:', error)
          showToast.value = true
          toastType.value = 'error'
          toastTitle.value = 'Gagal'
          toastMessage.value = 'Gagal menghapus data capaian kelas'
        }
      }
    }

    const onDimensiChange = async () => {
      if (!selectedDimensi.value) {
        elemenStore.elemenList = []
        subElemenStore.subElemenList = []
        selectedElemen.value = ''
        selectedSubElemen.value = ''
        await applyFilters()
        return
      }
      await elemenStore.fetchElemenByDimensi(selectedDimensi.value)
      selectedElemen.value = ''
      selectedSubElemen.value = ''
      subElemenStore.subElemenList = []
      await applyFilters()
    }

    const onElemenChange = async () => {
      if (!selectedElemen.value) {
        subElemenStore.subElemenList = []
        selectedSubElemen.value = ''
        await applyFilters()
        return
      }
      await subElemenStore.fetchSubElemenByElemen(selectedElemen.value)
      selectedSubElemen.value = ''
      await applyFilters()
    }

    const applyFilters = async () => {
      await capaianKelasStore.fetchCapaianKelasFiltered({
        id_kelas: selectedKelas.value || undefined,
        id_sub_elemen: selectedSubElemen.value || undefined,
      })
      currentPage.value = 1
    }

    const clearAllFilters = async () => {
      selectedKelas.value = ''
      selectedDimensi.value = ''
      selectedElemen.value = ''
      selectedSubElemen.value = ''
      elemenStore.elemenList = []
      subElemenStore.subElemenList = []
      await applyFilters()
    }

    const onItemsPerPageChange = () => {
      currentPage.value = 1
    }

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--
    }

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++
    }

    // Import: trigger file picker
    const triggerImport = () => {
      importError.value = ''
      if (fileInputRef.value) fileInputRef.value.value = ''
      fileInputRef.value?.click()
    }

    // Import: handle file change
    const onFileChange = async (e) => {
      const file = e.target.files && e.target.files[0]
      if (!file) return
      if (!/\.xlsx?$/.test(file.name.toLowerCase())) {
        showToast.value = true
        toastType.value = 'error'
        toastTitle.value = 'Format Tidak Didukung'
        toastMessage.value = 'Gunakan file .xlsx atau .xls'
        return
      }
      try {
        isImporting.value = true
        importedCount.value = 0
        const rows = await parseExcelFile(file)
        if (!rows.length) {
          showToast.value = true
          toastType.value = 'warning'
          toastTitle.value = 'Tidak Ada Data'
          toastMessage.value = 'Tidak ada baris data yang valid di file'
          return
        }
        
        // Kirim ke backend via store menggunakan method batch
        const results = await capaianKelasStore.addMultipleCapaianKelas(rows)
        
        importedCount.value = results.success
        await loadCapaianKelasData()
        
        if (results.failed === 0) {
          showToast.value = true
          toastType.value = 'success'
          toastTitle.value = 'Impor Berhasil'
          toastMessage.value = `Berhasil menambahkan ${results.success} data capaian kelas`
        } else {
          showToast.value = true
          toastType.value = 'warning'
          toastTitle.value = 'Impor Selesai Sebagian'
          toastMessage.value = `Berhasil: ${results.success}, Gagal: ${results.failed}. Periksa format data yang gagal.`
          console.error('Import errors:', results.errors)
        }
      } catch (err) {
        console.error('Import error:', err)
        importError.value = err?.message || 'Gagal mengimpor data.'
        showToast.value = true
        toastType.value = 'error'
        toastTitle.value = 'Gagal Impor'
        toastMessage.value = importError.value
      } finally {
        isImporting.value = false
      }
    }

    // Parse Excel (.xlsx) to array of capaian kelas objects
    const normalizeHeader = (h) => String(h || '').toLowerCase().replace(/\s+/g, '_').trim()
    const toNumberOrNull = (v) => {
      if (v === null || v === undefined || v === '') return null
      const n = Number(v)
      return Number.isFinite(n) ? n : null
    }
    const toStringOrNull = (v) => {
      if (v === null || v === undefined) return null
      return String(v).trim() || null
    }

    const parseExcelFile = async (file) => {
      const arrayBuffer = await file.arrayBuffer()
      const workbook = new ExcelJS.Workbook()
      await workbook.xlsx.load(arrayBuffer)
      const worksheet = workbook.worksheets[0]
      if (!worksheet) throw new Error('Sheet pertama tidak ditemukan')

      // Ambil header row (baris 1)
      const headerRow = worksheet.getRow(1)
      const headerMap = {}
      headerRow.eachCell((cell, colNumber) => {
        const key = normalizeHeader(cell.value)
        if (key) headerMap[key] = colNumber
      })

      // Kolom yang didukung backend untuk capaian kelas
      // Minimal: kode_ck, nama_ck, id_kelas, id_sub_elemen, id_sekolah harus ada
      const supported = ['kode_ck', 'nama_ck', 'id_kelas', 'id_sub_elemen', 'id_sekolah', 'indikator']

      const data = []
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) return // skip header
        const record = {}

        // Map fields if present in headers
        for (const key of supported) {
          const col = headerMap[key]
          if (!col) continue
          const raw = row.getCell(col).value
          if (['id_kelas', 'id_sub_elemen', 'id_sekolah'].includes(key)) {
            record[key] = toNumberOrNull(raw)
          } else {
            record[key] = toStringOrNull(raw)
          }
        }

        // Consider valid if has required fields
        if (record.kode_ck && record.nama_ck && record.id_kelas && record.id_sub_elemen && record.id_sekolah) {
          data.push(record)
        }
      })

      return data
    }

    const downloadTemplate = async () => {
      const wb = new ExcelJS.Workbook()
      wb.created = new Date()

      // Sheet 1: ImportCapaianKelas (utama)
      const ws = wb.addWorksheet('ImportCapaianKelas', {
        views: [{ state: 'frozen', ySplit: 1 }]
      })
      const headers = ['kode_ck', 'nama_ck', 'id_kelas', 'id_sub_elemen', 'id_sekolah', 'indikator']
      ws.addRow(headers)

      // Style header
      const headerRow = ws.getRow(1)
      headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } }
      headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
      headerRow.height = 24
      headerRow.eachCell((cell) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF7C3AED' } }
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
        }
      })

      // Emphasize required columns
      const requiredHeaderStyle = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFF59E0B' } // amber for required fields
      }
      // Mark required fields: kode_ck, nama_ck, id_kelas, id_sub_elemen, id_sekolah
      for (let col = 1; col <= 5; col++) {
        ws.getCell(1, col).fill = requiredHeaderStyle
      }

      // Column widths
      ws.columns = [
        { key: 'kode_ck', width: 15 },
        { key: 'nama_ck', width: 40 },
        { key: 'id_kelas', width: 12 },
        { key: 'id_sub_elemen', width: 15 },
        { key: 'id_sekolah', width: 12 },
        { key: 'indikator', width: 50 }
      ]

      // Sample rows
      ws.addRow(['CK.1.1', 'Mengenal dan mensyukuri anugerah hidup sebagai ciptaan Tuhan Yang Maha Esa', 1, 1, 1, 'Siswa dapat menunjukkan rasa syukur dalam kehidupan sehari-hari'])
      ws.addRow(['CK.1.2', 'Mengenal dan menunjukkan perilaku jujur sebagai implementasi dari pemahaman iman', 1, 1, 1, 'Siswa dapat berperilaku jujur dalam berbagai situasi'])
      
      // Style sample rows
      for (let rowNum = 2; rowNum <= 3; rowNum++) {
        ws.getRow(rowNum).eachCell((cell) => {
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
            left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
            bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
            right: { style: 'thin', color: { argb: 'FFE5E7EB' } }
          }
        })
      }

      // Data validations for rows 4..204
      for (let r = 4; r <= 204; r++) {
        // kode_ck: text wajib
        ws.getCell(`A${r}`).dataValidation = {
          type: 'textLength',
          operator: 'greaterThanOrEqual',
          formulae: [1],
          allowBlank: false,
          showErrorMessage: true,
          errorTitle: 'Isian wajib',
          error: 'Kode CK harus diisi.'
        }
        // nama_ck: text wajib
        ws.getCell(`B${r}`).dataValidation = {
          type: 'textLength',
          operator: 'greaterThanOrEqual',
          formulae: [1],
          allowBlank: false,
          showErrorMessage: true,
          errorTitle: 'Isian wajib',
          error: 'Nama CK harus diisi.'
        }
        // id_kelas: angka wajib >= 1
        ws.getCell(`C${r}`).dataValidation = {
          type: 'whole',
          operator: 'greaterThanOrEqual',
          formulae: [1],
          allowBlank: false,
          showErrorMessage: true,
          errorTitle: 'Isian wajib',
          error: 'ID Kelas harus berupa angka >= 1.'
        }
        // id_sub_elemen: angka wajib >= 1
        ws.getCell(`D${r}`).dataValidation = {
          type: 'whole',
          operator: 'greaterThanOrEqual',
          formulae: [1],
          allowBlank: false,
          showErrorMessage: true,
          errorTitle: 'Isian wajib',
          error: 'ID Sub Elemen harus berupa angka >= 1.'
        }
        // id_sekolah: angka wajib >= 1
        ws.getCell(`E${r}`).dataValidation = {
          type: 'whole',
          operator: 'greaterThanOrEqual',
          formulae: [1],
          allowBlank: false,
          showErrorMessage: true,
          errorTitle: 'Isian wajib',
          error: 'ID Sekolah harus berupa angka >= 1.'
        }
        // indikator: text opsional
        ws.getCell(`F${r}`).dataValidation = {
          type: 'textLength',
          operator: 'greaterThanOrEqual',
          formulae: [0],
          allowBlank: true,
          showInputMessage: true,
          promptTitle: 'Indikator',
          prompt: 'Deskripsi indikator pencapaian (opsional).'
        }
      }

      // Sheet 2: Panduan
      const guide = wb.addWorksheet('Panduan')
      guide.getColumn(1).width = 20
      guide.getColumn(2).width = 50
      guide.getCell('A1').value = 'Kolom'
      guide.getCell('B1').value = 'Keterangan'
      
      // Style guide header
      const guideHeaderRow = guide.getRow(1)
      guideHeaderRow.font = { bold: true, color: { argb: 'FFFFFFFF' } }
      guideHeaderRow.alignment = { vertical: 'middle', horizontal: 'center' }
      guideHeaderRow.height = 20
      guideHeaderRow.eachCell((cell) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF374151' } }
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
          right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
        }
      })

      const guideData = [
        ['kode_ck*', 'Kode unik Capaian Kelas (wajib). Contoh: CK.1.1, CK.2.3'],
        ['nama_ck*', 'Nama atau deskripsi Capaian Kelas (wajib). Deskripsi lengkap capaian pembelajaran.'],
        ['id_kelas*', 'ID Kelas dalam sistem (wajib). Angka >= 1. Pastikan kelas sudah terdaftar di sistem.'],
        ['id_sub_elemen*', 'ID Sub Elemen dalam sistem (wajib). Angka >= 1. Pastikan sub elemen sudah terdaftar.'],
        ['id_sekolah*', 'ID Sekolah dalam sistem (wajib). Angka >= 1. Pastikan sekolah sudah terdaftar.'],
        ['indikator', 'Indikator pencapaian pembelajaran (opsional). Deskripsi detail cara mengukur capaian.'],
        ['', ''],
        ['CATATAN:', ''],
        ['* = Wajib diisi', 'Kolom dengan tanda * harus diisi, tidak boleh kosong.'],
        ['Format File', 'File harus berformat .xlsx atau .xls'],
        ['Baris Data', 'Mulai mengisi data dari baris ke-4 (setelah contoh)'],
        ['ID Referensi', 'Pastikan ID yang digunakan sudah ada di sistem sebelum impor.']
      ]

      guideData.forEach((row, index) => {
        const rowNum = index + 2
        guide.addRow(row)
        if (row[0] === 'CATATAN:' || row[0].includes('*')) {
          guide.getRow(rowNum).font = { bold: true, color: { argb: 'FF7C3AED' } }
        }
        guide.getRow(rowNum).eachCell((cell) => {
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
            left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
            bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
            right: { style: 'thin', color: { argb: 'FFE5E7EB' } }
          }
        })
      })

      // Download
      const buffer = await wb.xlsx.writeBuffer()
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Template_Import_Capaian_Kelas_${new Date().toISOString().slice(0, 10)}.xlsx`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)

      showToast.value = true
      toastType.value = 'success'
      toastTitle.value = 'Template Diunduh'
      toastMessage.value = 'Template Excel berhasil diunduh. Silakan isi data sesuai panduan.'
    }

    // Export data to Excel
    const exportData = async () => {
      try {
        const dataToExport = filteredCapaianKelasList.value
        
        if (!dataToExport.length) {
          showToast.value = true
          toastType.value = 'warning'
          toastTitle.value = 'Tidak Ada Data'
          toastMessage.value = 'Tidak ada data untuk diekspor'
          return
        }

        // Create workbook
        const wb = new ExcelJS.Workbook()
        wb.created = new Date()
        const ws = wb.addWorksheet('Data Capaian Kelas')

        // Headers
        const headers = [
          'ID',
          'Kode CK', 
          'Nama CK',
          'ID Sekolah',
          'ID Sub Elemen',
          'Indikator'
        ]

        ws.addRow(headers)

        // Style header
        const headerRow = ws.getRow(1)
        headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } }
        headerRow.alignment = { vertical: 'middle', horizontal: 'center' }
        headerRow.height = 20
        headerRow.eachCell((cell) => {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF7C3AED' } }
          cell.border = {
            top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
            left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
            bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
            right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
          }
        })

        // Add data rows
        dataToExport.forEach(capaian => {
          ws.addRow([
            capaian.id || '',
            capaian.kode_ck || '',
            capaian.nama_ck || '',
            capaian.id_sekolah || '',
            capaian.id_sub_elemen || capaian.id_capaian || '',
            capaian.indikator || ''
          ])
        })

        // Column widths
        ws.columns = [
          { key: 'id', width: 8 },
          { key: 'kode_ck', width: 15 },
          { key: 'nama_ck', width: 50 },
          { key: 'id_sekolah', width: 12 },
          { key: 'id_sub_elemen', width: 15 },
          { key: 'indikator', width: 50 }
        ]

        // Style data rows
        for (let rowNum = 2; rowNum <= dataToExport.length + 1; rowNum++) {
          ws.getRow(rowNum).eachCell((cell) => {
            cell.border = {
              top: { style: 'thin', color: { argb: 'FFE5E7EB' } },
              left: { style: 'thin', color: { argb: 'FFE5E7EB' } },
              bottom: { style: 'thin', color: { argb: 'FFE5E7EB' } },
              right: { style: 'thin', color: { argb: 'FFE5E7EB' } }
            }
          })
        }

        // Download
        const buffer = await wb.xlsx.writeBuffer()
        const blob = new Blob([buffer], { 
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        
        if (link.download !== undefined) {
          link.setAttribute('href', url)
          link.setAttribute('download', `data-capaian-kelas-${new Date().toISOString().split('T')[0]}.xlsx`)
          link.style.visibility = 'hidden'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          
          // Show success message
          showToast.value = true
          toastType.value = 'success'
          toastTitle.value = 'Berhasil'
          toastMessage.value = `Data berhasil diekspor (${dataToExport.length} data)`
        }
        
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error('Export error:', error)
        showToast.value = true
        toastType.value = 'error'
        toastTitle.value = 'Gagal'
        toastMessage.value = 'Terjadi kesalahan saat mengekspor data!'
      }
    }

    // Print data
    const printData = () => {
      try {
        const dataToExport = filteredCapaianKelasList.value
        
        if (!dataToExport.length) {
          showToast.value = true
          toastType.value = 'warning'
          toastTitle.value = 'Tidak Ada Data'
          toastMessage.value = 'Tidak ada data untuk dicetak'
          return
        }

        const printWindow = window.open('', '_blank')
        if (!printWindow) {
          alert('Popup diblokir! Mohon izinkan popup untuk fungsi print.')
          return
        }

        const currentDate = new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long', 
          day: 'numeric'
        })

        const currentTime = new Date().toLocaleTimeString('id-ID')

        let tableRows = ''
        dataToExport.forEach((capaian, index) => {
          tableRows += `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${index + 1}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${capaian.kode_ck || '-'}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${capaian.nama_ck || '-'}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${getSekolahName(capaian.id_sekolah)}</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${getSubElemenName(capaian.id_sub_elemen || capaian.id_capaian)}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${capaian.indikator || '-'}</td>
            </tr>
          `
        })

        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>Data Capaian Kelas</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 20px;
                font-size: 12px;
              }
              .header { 
                text-align: center; 
                margin-bottom: 30px;
                border-bottom: 2px solid #333;
                padding-bottom: 20px;
              }
              .header h1 { 
                margin: 0; 
                font-size: 24px;
                color: #333;
              }
              .header p { 
                margin: 5px 0; 
                color: #666;
                font-size: 14px;
              }
              .info-section {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                font-size: 12px;
              }
              .info-left, .info-right {
                flex: 1;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                margin: 20px 0;
                font-size: 10px;
              }
              th { 
                background-color: #7C3AED; 
                color: white; 
                border: 1px solid #ddd; 
                padding: 12px 8px;
                text-align: center;
                font-weight: bold;
              }
              td { 
                border: 1px solid #ddd; 
                padding: 8px;
                vertical-align: top;
              }
              tr:nth-child(even) { 
                background-color: #f9f9f9; 
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                text-align: center;
                font-size: 10px;
                color: #666;
              }
              @media print {
                body { margin: 0; }
                .header { break-after: avoid; }
                table { break-inside: avoid; }
                tr { break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>DATA CAPAIAN KELAS</h1>
              <p>Sistem Manajemen Assessment Murid</p>
            </div>
            
            <div class="info-section">
              <div class="info-left">
                <strong>Tanggal Cetak:</strong> ${currentDate}<br>
                <strong>Waktu Cetak:</strong> ${currentTime}
              </div>
              <div class="info-right" style="text-align: right;">
                <strong>Total Data:</strong> ${dataToExport.length} capaian kelas
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th style="width: 5%;">No</th>
                  <th style="width: 15%;">Kode CK</th>
                  <th style="width: 35%;">Nama CK</th>
                  <th style="width: 10%;">Sekolah</th>
                  <th style="width: 10%;">Sub Elemen</th>
                  <th style="width: 25%;">Indikator</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>

            <div class="footer">
              <p>Dicetak pada ${currentDate} pukul ${currentTime}</p>
              <p>Sistem Assessment Murid - Data Capaian Kelas</p>
            </div>
          </body>
          </html>
        `

        printWindow.document.write(htmlContent)
        printWindow.document.close()
        
        // Wait for content to load then print
        printWindow.onload = function() {
          printWindow.focus()
          printWindow.print()
        }

        // Fallback if onload doesn't work
        setTimeout(() => {
          printWindow.focus()
          printWindow.print()
        }, 250)

      } catch (error) {
        console.error('Print error:', error)
        showToast.value = true
        toastType.value = 'error'
        toastTitle.value = 'Gagal'
        toastMessage.value = 'Terjadi kesalahan saat mencetak data!'
      }
    }

    // Lifecycle
    onMounted(() => {
      loadCapaianKelasData()
    })

    return {
      capaianKelasStore,
      themeStore,
      isDarkMode,
      currentPage,
      itemsPerPage,
      filteredCapaianKelasList,
      hasActiveFilters,
      activeFilterCount,
      totalPages,
      paginatedCapaianKelasList,
  displayRangeStart,
  displayRangeEnd,
      loadCapaianKelasData,
      refreshData,
      goToAddCapaianKelas,
      editCapaianKelas,
      deleteCapaianKelas,
      getSekolahName,
      getSubElemenName,
      // filters
      kelasStore,
      dimensiStore,
      elemenStore,
      subElemenStore,
      selectedKelas,
      selectedDimensi,
      selectedElemen,
      selectedSubElemen,
      onDimensiChange,
      onElemenChange,
      applyFilters,
      clearAllFilters,
  onItemsPerPageChange,
  prevPage,
  nextPage,
      // toast
      Toast,
      showToast,
      toastType,
      toastTitle,
      toastMessage,
      // print
      printData
    }
  }
}
</script>
