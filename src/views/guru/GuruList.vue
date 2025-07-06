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
              <h1 class="text-3xl font-bold text-white mb-2">Daftar Guru</h1>
              <p class="text-blue-100 text-lg">Kelola dan pantau data guru dalam sistem assessment</p>
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
              <div class="text-3xl font-bold text-white mb-1">{{ filteredGuruList.length }}</div>
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
        <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Filter & Pencarian</h3>
                <p class="text-sm text-gray-500">Temukan guru berdasarkan kriteria yang Anda inginkan</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <div v-if="searchQuery || selectedSchool || selectedRole" class="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
                </svg>
                Filter Aktif
              </div>
              <button @click="clearAllFilters" v-if="searchQuery || selectedSchool || selectedRole" class="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors">
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        <!-- Filter Content -->
        <div class="p-6 space-y-6">
          <!-- Search Bar -->
          <div class="relative group">
            <label class="block text-sm font-medium text-gray-700 mb-2">Pencarian Cepat</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Ketik nama guru, email, atau NIP untuk mencari..."
                class="block w-full pl-12 pr-12 py-4 border border-gray-300 rounded-xl text-sm leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                @focus="searchFocused = true"
                @blur="searchFocused = false"
              />
              <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-4 flex items-center">
                <button @click="searchQuery = ''" class="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div v-if="searchQuery" class="mt-2 text-xs text-gray-500">
              Ditemukan {{ filteredGuruList.length }} guru dari {{ guruStore.getGuruList.length }} total guru
            </div>
          </div>
          
          <!-- Advanced Filters -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- School Filter -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Sekolah</label>
              <div class="relative">
                <select v-model="selectedSchool" class="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:shadow-md appearance-none">
                  <option value="">Semua Sekolah</option>
                  <option value="1">SMA Negeri 1 Semarang</option>
                  <option value="2">SMA Negeri 2 Semarang</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              <div v-if="selectedSchool" class="flex items-center text-xs text-blue-600">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Filter diterapkan
              </div>
            </div>
            
            <!-- Role Filter -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Role/Jabatan</label>
              <div class="relative">
                <select v-model="selectedRole" class="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:shadow-md appearance-none">
                  <option value="">Semua Role</option>
                  <option value="2">Guru</option>
                  <option value="3">Kepala Sekolah</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
              <div v-if="selectedRole" class="flex items-center text-xs text-blue-600">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                Filter diterapkan
              </div>
            </div>
            
            <!-- Action Buttons -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Aksi</label>
              <div class="flex space-x-3">
                <button @click="loadGuruData" class="flex-1 inline-flex items-center justify-center px-4 py-3 border border-blue-300 rounded-xl text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Refresh
                </button>
                <button @click="exportData" class="flex-1 inline-flex items-center justify-center px-4 py-3 border border-green-300 rounded-xl text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-sm hover:shadow-md">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  Export
                </button>
              </div>
              <div class="text-xs text-gray-500">
                Refresh data atau ekspor hasil pencarian
              </div>
            </div>
          </div>

          <!-- Quick Filter Tags -->
          <div v-if="searchQuery || selectedSchool || selectedRole" class="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200">
            <span class="text-sm font-medium text-gray-700">Filter aktif:</span>
            <div v-if="searchQuery" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              Pencarian: "{{ searchQuery }}"
              <button @click="searchQuery = ''" class="ml-1 text-blue-600 hover:text-blue-800">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div v-if="selectedSchool" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              Sekolah: {{ getSchoolName(selectedSchool) }}
              <button @click="selectedSchool = ''" class="ml-1 text-green-600 hover:text-green-800">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div v-if="selectedRole" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              Role: {{ getRoleName(selectedRole) }}
              <button @click="selectedRole = ''" class="ml-1 text-purple-600 hover:text-purple-800">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
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
import { ref, computed, onMounted } from 'vue'
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
    const currentPage = ref(1)
    const itemsPerPage = ref(10)

    // Computed properties
    const filteredGuruList = computed(() => {
      let filtered = guruStore.getGuruList

      // Filter by search query
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

      return filtered
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

    const viewGuruDetail = (id) => {
      router.push({ name: 'guru-detail', params: { id } })
    }

    const clearAllFilters = () => {
      searchQuery.value = ''
      selectedSchool.value = ''
      selectedRole.value = ''
      currentPage.value = 1
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

    return {
      guruStore,
      searchQuery,
      selectedSchool,
      selectedRole,
      currentPage,
      itemsPerPage,
      filteredGuruList,
      totalPages,
      paginatedGuruList,
      visiblePages,
      loadGuruData,
      viewGuruDetail,
      clearAllFilters,
      exportData,
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