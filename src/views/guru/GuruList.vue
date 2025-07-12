<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg border border-blue-600 p-8 mb-8 text-white">
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
              <h1 class="text-2xl font-bold text-white mb-2">Daftar Guru</h1>
              <p class="text-blue-100 text-base">Kelola dan pantau data guru dalam sistem assessment</p>
              <div class="flex items-center mt-3 space-x-4">
                <div class="flex items-center text-blue-100">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-sm font-medium">Sistem Aktif</span>
                </div>
                <div class="flex items-center text-blue-100">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-sm font-medium">Update Real-time</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 lg:mt-0">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div class="text-2xl font-bold text-white mb-1">{{ filteredGuruList.length }}</div>
              <div class="text-sm text-blue-100 font-medium mb-2">Total Guru</div>
              <div class="flex items-center justify-center space-x-2">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-xs text-blue-100">Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filter Section -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 mb-8 overflow-hidden">
        <!-- Filter Header -->
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="flex items-center space-x-3">
              <div class="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-xl shadow-sm">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Filter & Pencarian Data Guru</h3>
                <p class="text-sm text-gray-600">Temukan dan filter data guru berdasarkan kriteria spesifik</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div v-if="hasActiveFilters" class="flex items-center text-sm text-blue-700 bg-blue-100 px-4 py-2 rounded-full shadow-sm border border-blue-200">
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
          <!-- Advanced Filters Section -->
            <div class="flex items-center justify-between mb-6">
              <label class="text-sm font-semibold text-gray-800 flex items-center">
                <svg class="w-4 h-4 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
                </svg>
                Filter 
              </label>
              <button 
                @click="toggleAdvancedFilter" 
                class="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all duration-200 border border-indigo-200"
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

            <!-- Basic Filters -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
              <!-- School Filter -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center">
                  <svg class="w-4 h-4 mr-1.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  Sekolah
                </label>
                <div class="relative">
                  <select v-model="selectedSchool" class="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:shadow-md appearance-none text-sm">
                    <option value="">Semua Sekolah</option>
                    <option value="1">SMA Negeri 1 Semarang</option>
                    <option value="2">SMA Negeri 2 Semarang</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                <div v-if="selectedSchool" class="flex items-center text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Filter aktif
                </div>
              </div>
              
              <!-- Role Filter -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center">
                  <svg class="w-4 h-4 mr-1.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Role/Jabatan
                </label>
                <div class="relative">
                  <select v-model="selectedRole" class="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:shadow-md appearance-none text-sm">
                    <option value="">Semua Role</option>
                    <option value="2">Guru</option>
                    <option value="3">Kepala Sekolah</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                <div v-if="selectedRole" class="flex items-center text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-md">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Filter aktif
                </div>
              </div>
              
              <!-- Status Filter -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center">
                  <svg class="w-4 h-4 mr-1.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Status Akun
                </label>
                <div class="relative">
                  <select v-model="selectedStatus" class="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:shadow-md appearance-none text-sm">
                    <option value="">Semua Status</option>
                    <option value="aktif">Aktif</option>
                    <option value="belum_aktif">Belum Aktif</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

              <!-- Date Filter -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center">
                  <svg class="w-4 h-4 mr-1.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Filter Tanggal
                </label>
                <div class="relative">
                  <select v-model="dateFilter" class="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:shadow-md appearance-none text-sm">
                    <option value="">Semua Periode</option>
                    <option value="today">Hari Ini</option>
                    <option value="week">Minggu Ini</option>
                    <option value="month">Bulan Ini</option>
                    <option value="year">Tahun Ini</option>
                  </select>
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                <div v-if="dateFilter" class="flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  Filter aktif
                </div>
              </div>
            </div>

            <!-- Advanced Filter Section (Collapsible) -->
            <div v-show="showAdvancedFilter" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center">
                  <svg class="w-4 h-4 mr-1.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                  </svg>
                  Filter Berdasarkan NIP
                </label>
                <input
                  v-model="nipFilter"
                  type="text"
                  placeholder="Masukkan NIP guru (contoh: 19850601)"
                  class="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:shadow-md text-sm"
                />
                <div v-if="nipFilter" class="text-xs text-gray-500">
                  Mencari NIP yang mengandung "{{ nipFilter }}"
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center">
                  <svg class="w-4 h-4 mr-1.5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                  Filter Berdasarkan Email
                </label>
                <input
                  v-model="emailFilter"
                  type="text"
                  placeholder="Masukkan domain email (contoh: @gmail.com)"
                  class="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:shadow-md text-sm"
                />
                <div v-if="emailFilter" class="text-xs text-gray-500">
                  Mencari email yang mengandung "{{ emailFilter }}"
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700 flex items-center">
                  <svg class="w-4 h-4 mr-1.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                  </svg>
                  Urutkan Berdasarkan
                </label>
                <div class="flex gap-2">
                  <select v-model="sortBy" class="flex-1 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:shadow-md appearance-none text-sm">
                    <option value="nama">Nama</option>
                    <option value="email">Email</option>
                    <option value="nip">NIP</option>
                    <option value="id_sekolah">Sekolah</option>
                    <option value="id_role">Role</option>
                  </select>
                  <button 
                    @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'"
                    class="px-3 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:shadow-md hover:bg-gray-50"
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
                <div class="text-xs text-gray-500">
                  Urutan: {{ sortOrder === 'asc' ? 'A → Z' : 'Z → A' }}
                </div>
              </div>
            </div>
          

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <div class="flex-1">
                <label class="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                  Aksi & Tools
                </label>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button 
                    @click="loadGuruData" 
                    :disabled="guruStore.isLoading"
                    class="inline-flex items-center justify-center px-4 py-3 border border-blue-300 rounded-xl text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg v-if="!guruStore.isLoading" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    <div v-else class="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mr-2"></div>
                    {{ guruStore.isLoading ? 'Memuat...' : 'Refresh Data' }}
                  </button>
                  <button 
                    @click="exportData" 
                    :disabled="filteredGuruList.length === 0"
                    class="inline-flex items-center justify-center px-4 py-3 border border-green-300 rounded-xl text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Export Excel
                  </button>
                  <button 
                    @click="printData" 
                    :disabled="filteredGuruList.length === 0"
                    class="inline-flex items-center justify-center px-4 py-3 border border-purple-300 rounded-xl text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                    </svg>
                    Print Data
                  </button>
                </div>
              </div>
            </div>

            <!-- Active Filter Tags -->
            <div v-if="hasActiveFilters" class="pt-6 border-t border-gray-200">
              <div class="flex flex-wrap items-center gap-3">
                <span class="text-sm font-semibold text-gray-800 flex items-center">
                  <svg class="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                  </svg>
                  Filter Aktif:
                </span>
                
                <div v-if="searchQuery" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  Pencarian: "{{ searchQuery }}"
                  <button @click="searchQuery = ''" class="ml-1.5 text-blue-600 hover:text-blue-800 transition-colors">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div v-if="selectedSchool" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                  <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  Sekolah: {{ getSchoolName(selectedSchool) }}
                  <button @click="selectedSchool = ''" class="ml-1.5 text-green-600 hover:text-green-800 transition-colors">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div v-if="selectedRole" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                  <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Role: {{ getRoleName(selectedRole) }}
                  <button @click="selectedRole = ''" class="ml-1.5 text-purple-600 hover:text-purple-800 transition-colors">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div v-if="selectedStatus" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200">
                  <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Status: {{ getStatusFilterText(selectedStatus) }}
                  <button @click="selectedStatus = ''" class="ml-1.5 text-orange-600 hover:text-orange-800 transition-colors">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div v-if="dateFilter" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                  <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  Periode: {{ getDateFilterText(dateFilter) }}
                  <button @click="dateFilter = ''" class="ml-1.5 text-blue-600 hover:text-blue-800 transition-colors">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div v-if="nipFilter" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                  <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                  </svg>
                  NIP: "{{ nipFilter }}"
                  <button @click="nipFilter = ''" class="ml-1.5 text-indigo-600 hover:text-indigo-800 transition-colors">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div v-if="emailFilter" class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800 border border-pink-200">
                  <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                  Email: "{{ emailFilter }}"
                  <button @click="emailFilter = ''" class="ml-1.5 text-pink-600 hover:text-pink-800 transition-colors">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      <!-- Action Section -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 mb-6 p-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="flex items-center space-x-3">
            <div class="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-gray-900">Kelola Data Guru</h3>
              <p class="text-sm text-gray-500">Tambah guru baru atau kelola data yang sudah ada</p>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="goToAddGuru"
              class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Tambah Guru Baru
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="guruStore.isLoading" class="bg-white rounded-xl shadow-sm border border-gray-200 p-12">
        <div class="text-center">
          <div class="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-gray-600 font-medium">Memuat data guru...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="guruStore.getError" class="bg-white rounded-xl shadow-sm border border-red-200 p-12">
        <div class="text-center">
          <div class="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Terjadi Kesalahan</h3>
          <p class="text-gray-600 mb-4">{{ guruStore.getError }}</p>
          <button @click="loadGuruData" class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Coba Lagi
          </button>
        </div>
      </div>

      <!-- Data Table -->
      <div v-else class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Table Header -->
        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-gray-700">
              Menampilkan {{ paginatedGuruList.length }} dari {{ filteredGuruList.length }} guru
            </p>
          </div>
        </div>

        <!-- Table - Responsive Grid Layout -->
        <div class="divide-y divide-gray-200">
          <!-- Desktop Table Header -->
          <div class="hidden lg:grid lg:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div class="col-span-1">No</div>
            <div class="col-span-3">Guru</div>
            <div class="col-span-2">Kontak</div>
            <div class="col-span-2">Sekolah</div>
            <div class="col-span-2">Role & Status</div>
            <div class="col-span-2 text-center">Aksi</div>
          </div>

          <!-- Table Rows -->
          <div v-for="(guru, index) in paginatedGuruList" :key="guru.id_guru" class="hover:bg-gray-50 transition-colors duration-150">
            <!-- Desktop Layout -->
            <div class="hidden lg:grid lg:grid-cols-12 gap-4 px-6 py-4 items-center">
              <div class="col-span-1 text-sm text-gray-900 font-medium">
                {{ (currentPage - 1) * itemsPerPage + index + 1 }}
              </div>
              
              <div class="col-span-3">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span class="text-sm font-medium text-blue-600">{{ getInitials(guru.nama) }}</span>
                    </div>
                  </div>
                  <div class="ml-3 min-w-0 flex-1">
                    <div class="text-sm font-medium text-gray-900 truncate">{{ guru.nama || 'N/A' }}</div>
                    <div class="text-xs text-gray-500">NIP: {{ guru.nip || 'N/A' }}</div>
                  </div>
                </div>
              </div>
              
              <div class="col-span-2">
                <a :href="`mailto:${guru.email}`" class="text-sm text-blue-600 hover:text-blue-900 truncate block">
                  {{ guru.email || 'N/A' }}
                </a>
              </div>
              
              <div class="col-span-2">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" :class="getSchoolClass(guru.id_sekolah)">
                  {{ getSchoolName(guru.id_sekolah) }}
                </span>
              </div>
              
              <div class="col-span-2 space-y-1">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" :class="getRoleClass(guru.id_role)">
                  {{ getRoleName(guru.id_role) }}
                </span>
                <br>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" :class="getStatusClass(guru)">
                  {{ getStatusText(guru) }}
                </span>
              </div>
              
              <div class="col-span-2 text-center">
                <button 
                  @click="viewGuruDetail(guru.id_guru)"
                  class="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded-lg text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  title="Lihat Detail"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  Detail
                </button>
              </div>
            </div>

            <!-- Mobile/Tablet Layout -->
            <div class="lg:hidden px-6 py-4 space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span class="text-sm font-medium text-blue-600">{{ getInitials(guru.nama) }}</span>
                    </div>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">{{ guru.nama || 'N/A' }}</div>
                    <div class="text-xs text-gray-500">{{ guru.email || 'N/A' }}</div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-xs text-gray-500 mb-1">No. {{ (currentPage - 1) * itemsPerPage + index + 1 }}</div>
                  <button 
                    @click="viewGuruDetail(guru.id_guru)"
                    class="inline-flex items-center px-2 py-1 border border-blue-300 rounded text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Detail
                  </button>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span class="text-gray-500">NIP:</span>
                  <div class="font-medium text-gray-900">{{ guru.nip || 'N/A' }}</div>
                </div>
                <div>
                  <span class="text-gray-500">Sekolah:</span>
                  <div>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" :class="getSchoolClass(guru.id_sekolah)">
                      {{ getSchoolName(guru.id_sekolah) }}
                    </span>
                  </div>
                </div>
                <div>
                  <span class="text-gray-500">Role:</span>
                  <div>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" :class="getRoleClass(guru.id_role)">
                      {{ getRoleName(guru.id_role) }}
                    </span>
                  </div>
                </div>
                <div>
                  <span class="text-gray-500">Status:</span>
                  <div>
                    <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" :class="getStatusClass(guru)">
                      {{ getStatusText(guru) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredGuruList.length === 0 && !guruStore.isLoading" class="text-center py-12">
          <div class="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak Ada Data Guru</h3>
          <p class="text-gray-600 mb-4">Tidak ada guru yang ditemukan dengan kriteria pencarian saat ini.</p>
          <button @click="loadGuruData" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Muat Ulang Data
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div class="flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button 
                @click="currentPage--" 
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sebelumnya
              </button>
              <button 
                @click="currentPage++" 
                :disabled="currentPage === totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Menampilkan halaman <span class="font-medium">{{ currentPage }}</span> dari <span class="font-medium">{{ totalPages }}</span>
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button 
                    @click="currentPage--" 
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  
                  <button 
                    v-for="page in visiblePages" 
                    :key="page"
                    @click="currentPage = page"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                      currentPage === page 
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' 
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                  
                  <button 
                    @click="currentPage++" 
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGuruStore } from '@/stores/guru'

export default {
  name: 'GuruList',
  setup() {
    const router = useRouter()
    const guruStore = useGuruStore()
    
    // Reactive data
    const searchQuery = ref('')
    const selectedSchool = ref('')
    const selectedRole = ref('')
    const selectedStatus = ref('')
    const nipFilter = ref('')
    const emailFilter = ref('')
    const dateFilter = ref('')
    const quickFilterActive = ref('')
    const sortBy = ref('nama')
    const sortOrder = ref('asc')
    const showAdvancedFilter = ref(false)
    const currentPage = ref(1)
    const itemsPerPage = ref(10)

    // Computed properties
    const filteredGuruList = computed(() => {
      let filtered = [...guruStore.getGuruList]

      // Filter by search query (nama, email, NIP)
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(guru => 
          (guru.nama && guru.nama.toLowerCase().includes(query)) ||
          (guru.email && guru.email.toLowerCase().includes(query)) ||
          (guru.nip && guru.nip.toLowerCase().includes(query))
        )
      }

      // Filter by school
      if (selectedSchool.value) {
        filtered = filtered.filter(guru => guru.id_sekolah == selectedSchool.value)
      }

      // Filter by role
      if (selectedRole.value) {
        filtered = filtered.filter(guru => guru.id_role == selectedRole.value)
      }

      // Filter by status
      if (selectedStatus.value) {
        filtered = filtered.filter(guru => {
          const isActive = !!guru.password_hash
          if (selectedStatus.value === 'aktif') {
            return isActive
          } else if (selectedStatus.value === 'belum_aktif') {
            return !isActive
          }
          return true
        })
      }

      // Filter by date
      if (dateFilter.value) {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        
        filtered = filtered.filter(guru => {
          if (!guru.created_at) return false
          
          const guruDate = new Date(guru.created_at)
          const guruDateOnly = new Date(guruDate.getFullYear(), guruDate.getMonth(), guruDate.getDate())
          
          switch (dateFilter.value) {
            case 'today':
              return guruDateOnly.getTime() === today.getTime()
            case 'week':
              const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
              return guruDateOnly >= weekAgo
            case 'month':
              const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
              return guruDate >= monthAgo
            case 'year':
              const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
              return guruDate >= yearAgo
            default:
              return true
          }
        })
      }

      // Filter by NIP
      if (nipFilter.value) {
        const nipQuery = nipFilter.value.toLowerCase()
        filtered = filtered.filter(guru => 
          guru.nip && guru.nip.toLowerCase().includes(nipQuery)
        )
      }

      // Filter by email domain
      if (emailFilter.value) {
        const emailQuery = emailFilter.value.toLowerCase()
        filtered = filtered.filter(guru => 
          guru.email && guru.email.toLowerCase().includes(emailQuery)
        )
      }

      // Sort the results
      filtered.sort((a, b) => {
        let aValue = a[sortBy.value] || ''
        let bValue = b[sortBy.value] || ''

        // Convert to string for comparison
        aValue = String(aValue).toLowerCase()
        bValue = String(bValue).toLowerCase()

        if (sortOrder.value === 'asc') {
          return aValue.localeCompare(bValue)
        } else {
          return bValue.localeCompare(aValue)
        }
      })

      return filtered
    })

    const hasActiveFilters = computed(() => {
      return !!(searchQuery.value || selectedSchool.value || selectedRole.value || 
               selectedStatus.value || nipFilter.value || emailFilter.value || dateFilter.value)
    })

    const activeFilterCount = computed(() => {
      let count = 0
      if (searchQuery.value) count++
      if (selectedSchool.value) count++
      if (selectedRole.value) count++
      if (selectedStatus.value) count++
      if (nipFilter.value) count++
      if (emailFilter.value) count++
      if (dateFilter.value) count++
      return count
    })

    const totalPages = computed(() => {
      return Math.ceil(filteredGuruList.value.length / itemsPerPage.value)
    })

    const paginatedGuruList = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      const end = start + itemsPerPage.value
      return filteredGuruList.value.slice(start, end)
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

    // Methods
    const loadGuruData = async () => {
      try {
        await guruStore.fetchGuruList()
      } catch (error) {
        console.error('Failed to load guru data:', error)
      }
    }

    const applyFilters = async () => {
      try {
        // Siapkan object filters untuk API
        const apiFilters = {}
        
        if (searchQuery.value) apiFilters.search = searchQuery.value
        if (selectedSchool.value) apiFilters.sekolah = selectedSchool.value
        if (selectedRole.value) apiFilters.role = selectedRole.value
        if (selectedStatus.value) apiFilters.status = selectedStatus.value
        if (nipFilter.value) apiFilters.nip = nipFilter.value
        if (emailFilter.value) apiFilters.email = emailFilter.value
        if (sortBy.value) apiFilters.sort_by = sortBy.value
        if (sortOrder.value) apiFilters.sort_order = sortOrder.value

        // Coba gunakan API filter terlebih dahulu
        if (Object.keys(apiFilters).length > 0) {
          try {
            await guruStore.fetchGuruListWithFilters(apiFilters)
            console.log('Filter diterapkan melalui API')
            return
          } catch (error) {
            console.log('API filter tidak tersedia, menggunakan filter frontend')
          }
        }
        
        // Fallback ke loading data biasa dan filter di frontend
        await loadGuruData()
      } catch (error) {
        console.error('Failed to apply filters:', error)
      }
    }

    const viewGuruDetail = (id) => {
      router.push({ name: 'guru-detail', params: { id } })
    }

    const goToAddGuru = () => {
      router.push({ name: 'guru-add' })
    }

    const refreshData = async () => {
      await loadGuruData()
    }

    const clearAllFilters = () => {
      searchQuery.value = ''
      selectedSchool.value = ''
      selectedRole.value = ''
      selectedStatus.value = ''
      nipFilter.value = ''
      emailFilter.value = ''
      dateFilter.value = ''
      quickFilterActive.value = ''
      sortBy.value = 'nama'
      sortOrder.value = 'asc'
      currentPage.value = 1
    }

    const applyQuickFilter = (filterType) => {
      // Reset all filters first
      clearAllFilters()
      
      // Apply specific quick filter
      quickFilterActive.value = filterType
      
      switch (filterType) {
        case 'all':
          // No additional filters needed
          break
        case 'active':
          selectedStatus.value = 'aktif'
          break
        case 'inactive':
          selectedStatus.value = 'belum_aktif'
          break
        case 'teacher':
          selectedRole.value = '2'
          break
        case 'principal':
          selectedRole.value = '3'
          break
      }
    }

    const getDateFilterText = (filter) => {
      const filterMap = {
        'today': 'Hari Ini',
        'week': 'Minggu Ini', 
        'month': 'Bulan Ini',
        'year': 'Tahun Ini'
      }
      return filterMap[filter] || filter
    }

    const printData = () => {
      try {
        const dataToExport = filteredGuruList.value
        
        if (dataToExport.length === 0) {
          alert('Tidak ada data untuk dicetak!')
          return
        }

        // Create print content
        const printContent = `
          <html>
            <head>
              <title>Daftar Guru - ${new Date().toLocaleDateString('id-ID')}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .header h1 { color: #2563eb; margin-bottom: 5px; }
                .header p { color: #666; margin: 0; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #f8f9fa; font-weight: bold; }
                .no-col { width: 50px; text-align: center; }
                .footer { margin-top: 30px; text-align: right; font-size: 12px; color: #666; }
                @media print { body { margin: 0; } }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Daftar Data Guru</h1>
                <p>Dicetak pada: ${new Date().toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p>Total Data: ${dataToExport.length} guru</p>
              </div>
              <table>
                <thead>
                  <tr>
                    <th class="no-col">No</th>
                    <th>Nama Guru</th>
                    <th>Email</th>
                    <th>NIP</th>
                    <th>Sekolah</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${dataToExport.map((guru, index) => `
                    <tr>
                      <td class="no-col">${index + 1}</td>
                      <td>${guru.nama || 'N/A'}</td>
                      <td>${guru.email || 'N/A'}</td>
                      <td>${guru.nip || 'N/A'}</td>
                      <td>${getSchoolName(guru.id_sekolah)}</td>
                      <td>${getRoleName(guru.id_role)}</td>
                      <td>${getStatusText(guru)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              <div class="footer">
                Sistem Manajemen Assessment Murid - Generated by System
              </div>
            </body>
          </html>
        `

        // Open print window
        const printWindow = window.open('', '_blank')
        if (printWindow) {
          printWindow.document.write(printContent)
          printWindow.document.close()
          printWindow.print()
        }
      } catch (error) {
        console.error('Print error:', error)
        alert('Terjadi kesalahan saat mencetak data!')
      }
    }

    const toggleAdvancedFilter = () => {
      showAdvancedFilter.value = !showAdvancedFilter.value
    }

    const getStatusFilterText = (status) => {
      const statusMap = {
        'aktif': 'Aktif',
        'belum_aktif': 'Belum Aktif'
      }
      return statusMap[status] || status
    }

    const exportData = () => {
      try {
        const dataToExport = filteredGuruList.value
        
        if (dataToExport.length === 0) {
          alert('Tidak ada data untuk diekspor!')
          return
        }

        // Prepare CSV headers
        const headers = [
          'ID Guru',
          'Nama',
          'Email', 
          'NIP',
          'Sekolah',
          'Role',
          'Status'
        ]

        // Convert data to CSV format
        const csvContent = [
          headers.join(','),
          ...dataToExport.map(guru => [
            guru.id_guru || '',
            `"${guru.nama || ''}"`,
            guru.email || '',
            guru.nip || '',
            `"${getSchoolName(guru.id_sekolah)}"`,
            `"${getRoleName(guru.id_role)}"`,
            `"${getStatusText(guru)}"`
          ].join(','))
        ].join('\n')

        // Create and download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob)
          link.setAttribute('href', url)
          link.setAttribute('download', `data-guru-${new Date().toISOString().split('T')[0]}.csv`)
          link.style.visibility = 'hidden'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          
          // Show success message
          console.log('Data exported successfully')
        }
      } catch (error) {
        console.error('Export error:', error)
        alert('Terjadi kesalahan saat mengekspor data!')
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
      if (!guru.password_hash) return 'Belum Aktif'
      return 'Aktif'
    }

    const getStatusClass = (guru) => {
      if (!guru.password_hash) return 'bg-red-100 text-red-800'
      return 'bg-green-100 text-green-800'
    }

    const getInitials = (name) => {
      if (!name) return '?'
      return name.split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    // Lifecycle
    onMounted(() => {
      loadGuruData()
    })

    // Watch filters untuk auto-apply (dengan debounce)
    let filterTimeout = null
    const watchFilters = () => {
      if (filterTimeout) clearTimeout(filterTimeout)
      filterTimeout = setTimeout(() => {
        if (hasActiveFilters.value) {
          applyFilters()
        }
      }, 300) // Debounce 300ms
    }

    // Watch individual filters
    watch([searchQuery, selectedSchool, selectedRole, selectedStatus, nipFilter, emailFilter, dateFilter, sortBy, sortOrder], watchFilters)

    return {
      guruStore,
      searchQuery,
      selectedSchool,
      selectedRole,
      selectedStatus,
      nipFilter,
      emailFilter,
      dateFilter,
      quickFilterActive,
      sortBy,
      sortOrder,
      showAdvancedFilter,
      currentPage,
      itemsPerPage,
      filteredGuruList,
      hasActiveFilters,
      activeFilterCount,
      totalPages,
      paginatedGuruList,
      visiblePages,
      loadGuruData,
      applyFilters,
      viewGuruDetail,
      goToAddGuru,
      refreshData,
      clearAllFilters,
      applyQuickFilter,
      toggleAdvancedFilter,
      getStatusFilterText,
      getDateFilterText,
      exportData,
      printData,
      getSchoolName,
      getSchoolClass,
      getRoleName,
      getRoleClass,
      getStatusText,
      getStatusClass,
      getInitials
    }
  }
}
</script>