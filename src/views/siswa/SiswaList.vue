<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg border border-green-600 p-8 mb-8 text-white">
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
              <p class="text-green-100 text-base">Kelola dan pantau data siswa dalam sistem assessment</p>
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
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
              <div class="text-2xl font-bold text-white mb-1">{{ filteredSiswaList.length }}</div>
              <div class="text-sm text-green-100 font-medium mb-2">Total Siswa</div>
              <div class="flex items-center justify-center space-x-2">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-xs text-green-100">Live Data</span>
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
              <div class="flex items-center justify-center w-10 h-10 bg-green-100 rounded-xl shadow-sm">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"></path>
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Filter & Pencarian Data Siswa</h3>
                <p class="text-sm text-gray-600">Temukan dan filter data siswa berdasarkan kriteria spesifik</p>
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
                <select v-model="selectedSchool" class="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white hover:shadow-md appearance-none text-sm">
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
            
            <!-- Kelas Filter -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 flex items-center">
                <svg class="w-4 h-4 mr-1.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                Kelas
              </label>
              <div class="relative">
                <select v-model="selectedKelas" class="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white hover:shadow-md appearance-none text-sm">
                  <option value="">Semua Kelas</option>
                  <option value="X">Kelas X</option>
                  <option value="XI">Kelas XI</option>
                  <option value="XII">Kelas XII</option>
                </select>
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            
            <!-- Status Filter -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 flex items-center">
                <svg class="w-4 h-4 mr-1.5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Status
              </label>
              <div class="relative">
                <select v-model="selectedStatus" class="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white hover:shadow-md appearance-none text-sm">
                  <option value="">Semua Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="tidak_aktif">Tidak Aktif</option>
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

            <!-- Search -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 flex items-center">
                <svg class="w-4 h-4 mr-1.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Pencarian
              </label>
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari nama, NIS..."
                  class="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white hover:shadow-md text-sm"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          @click="goToAdd"
          class="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Tambah Siswa Baru
        </button>
        
        <button
          @click="refreshData"
          :disabled="siswaStore.isLoading"
          class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          {{ siswaStore.isLoading ? 'Memuat...' : 'Refresh Data' }}
        </button>
      </div>

      <!-- Data Table -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NISN</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Kelas</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Sekolah</th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(siswa, index) in paginatedSiswaList" :key="siswa.id_siswa" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ siswa.id_siswa }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ siswa.nama }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ siswa.nisn }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ siswa.tanggal_lahir }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ siswa.jenis_kelamin }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ siswa.id_kelas }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ siswa.id_sekolah }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="goToDetail(siswa.id_siswa)" class="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-lg transition-colors">Detail</button>
                </td>
              </tr>
              <tr v-if="paginatedSiswaList.length === 0">
                <td colspan="8" class="px-6 py-12 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p class="text-lg font-medium text-gray-900 mb-2">Tidak ada data siswa</p>
                    <p class="text-gray-500">Coba ubah filter atau tambah siswa baru</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
              <p class="text-sm text-gray-700">
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

const router = useRouter()
const siswaStore = useSiswaStore()

// Reactive data
const searchQuery = ref('')
const selectedSchool = ref('')
const selectedKelas = ref('')
const selectedStatus = ref('')
const showAdvancedFilter = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Computed properties
const filteredSiswaList = computed(() => {
  let filtered = siswaStore.getSiswaList

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(siswa => 
      siswa.nama?.toLowerCase().includes(query) ||
      siswa.nisn?.toLowerCase().includes(query) ||
      siswa.email?.toLowerCase().includes(query)
    )
  }

  // School filter
  if (selectedSchool.value) {
    filtered = filtered.filter(siswa => siswa.id_sekolah == selectedSchool.value)
  }

  // Kelas filter
  if (selectedKelas.value) {
    filtered = filtered.filter(siswa => siswa.id_kelas === selectedKelas.value)
  }

  // Status filter
  if (selectedStatus.value) {
    filtered = filtered.filter(siswa => siswa.status === selectedStatus.value)
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

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedSchool.value || selectedKelas.value || selectedStatus.value
})

const activeFilterCount = computed(() => {
  let count = 0
  if (searchQuery.value) count++
  if (selectedSchool.value) count++
  if (selectedKelas.value) count++
  if (selectedStatus.value) count++
  return count
})

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
  selectedSchool.value = ''
  selectedKelas.value = ''
  selectedStatus.value = ''
  currentPage.value = 1
}

const toggleAdvancedFilter = () => {
  showAdvancedFilter.value = !showAdvancedFilter.value
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

// Watchers
watch([searchQuery, selectedSchool, selectedKelas, selectedStatus], () => {
  currentPage.value = 1
})

// Lifecycle
onMounted(() => {
  fetchData()
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