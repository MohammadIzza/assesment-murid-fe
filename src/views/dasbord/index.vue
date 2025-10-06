<template>
  <div class="min-h-screen bg-background dark:bg-dark-background py-8">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Section -->
      <div class="relative overflow-hidden rounded-2xl p-8 mb-8 text-white shadow-sm ring-1 ring-blue-500/30 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 animate-fade-in">
        <div class="absolute -right-20 -top-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div class="relative flex flex-col md:flex-row md:items-center md:justify-between">
          <div class="flex items-center gap-5">
            <div class="relative">
              <div class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/40 shadow">
                <span v-if="userInitials" class="text-xl font-semibold">{{ userInitials }}</span>
                <svg v-else class="w-8 h-8 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-white/80"></span>
            </div>
            <div class="min-w-0">
              <div class="text-sm text-blue-100/90">Selamat Datang</div>
              <h1 class="text-2xl font-semibold leading-tight truncate">{{ userData.nama || dashboardData.userName || '!' }}</h1>
              <p class="text-sm text-blue-100/90 mt-1">{{ getRoleName(userData.id_role) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistik Cards -->
      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <!-- Total Kelas -->
        <div class="rounded-2xl bg-white dark:bg-dark-surface shadow-sm ring-1 ring-gray-200 dark:ring-dark-border p-5 animate-fade-in-up" style="animation-delay: .02s">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary">Total Kelas</div>
              <div class="mt-1 text-2xl font-semibold text-gray-900 dark:text-dark-text">{{ dashboardData.totalKelas || '0' }}</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16"/></svg>
            </div>
          </div>
          <div v-if="isAdmin" class="mt-3 text-xs text-gray-500">
            <div class="flex justify-between items-center">
              <span>Kelas Aktif:</span>
              <span class="font-semibold text-gray-700">{{ dashboardData.kelasAktif || '0' }}</span>
            </div>
          </div>
        </div>
        <!-- Assessment -->
        <div class="rounded-2xl bg-white dark:bg-dark-surface shadow-sm ring-1 ring-gray-200 dark:ring-dark-border p-5 animate-fade-in-up" style="animation-delay: .06s">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary">Total Assessment</div>
              <div class="mt-1 text-2xl font-semibold text-gray-900 dark:text-dark-text">{{ dashboardData.totalAssessment || '0' }}</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            </div>
          </div>
          <div v-if="isAdmin" class="mt-3 text-xs text-gray-500">
            <div class="flex justify-between items-center">
              <span>Belum Dinilai:</span>
              <span class="font-semibold text-gray-700">{{ dashboardData.belumDinilai || '0' }}</span>
            </div>
            <div class="flex justify-between items-center mt-1">
              <span>Sudah Dinilai:</span>
              <span class="font-semibold text-gray-700">{{ dashboardData.totalAssessment - dashboardData.belumDinilai || '0' }}</span>
            </div>
          </div>
        </div>
        <!-- Guru -->
        <div class="rounded-2xl bg-white dark:bg-dark-surface shadow-sm ring-1 ring-gray-200 dark:ring-dark-border p-5 animate-fade-in-up" style="animation-delay: .10s">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary">Total Guru</div>
              <div class="mt-1 text-2xl font-semibold text-gray-900 dark:text-dark-text">{{ dashboardData.totalGuru || '0' }}</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-green-50 text-green-600 dark:bg-green-900/40 dark:text-green-300 flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
          </div>
          <div v-if="isAdmin" class="mt-3 text-xs text-gray-500">
            <div class="flex justify-between items-center">
              <span>Guru Aktif:</span>
              <span class="font-semibold text-gray-700">{{ dashboardData.guruAktif || '0' }}</span>
            </div>
          </div>
        </div>
        <!-- Siswa -->
        <div class="rounded-2xl bg-white dark:bg-dark-surface shadow-sm ring-1 ring-gray-200 dark:ring-dark-border p-5 animate-fade-in-up" style="animation-delay: .14s">
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs text-gray-500 dark:text-dark-text-secondary">Total Siswa</div>
              <div class="mt-1 text-2xl font-semibold text-gray-900 dark:text-dark-text">{{ dashboardData.totalSiswa || '0' }}</div>
            </div>
            <div class="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800/60 dark:text-gray-300 flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            </div>
          </div>
          <div v-if="isAdmin" class="mt-3 text-xs text-gray-500">
            <div class="flex justify-between items-center">
              <span>Siswa Aktif:</span>
              <span class="font-semibold text-gray-700">{{ dashboardData.siswaAktif || '0' }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Admin Stats Charts untuk Admin -->
      <div v-if="isAdmin" class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <!-- Assessment per Dimensi -->
        <div class="rounded-2xl bg-white dark:bg-dark-surface shadow-sm ring-1 ring-gray-200 dark:ring-dark-border p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">Assessment per Dimensi</h3>
          <div class="h-64 flex items-center justify-center" v-if="loading">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <div v-else-if="!assessmentByDimensi.length" class="h-64 flex items-center justify-center text-gray-400">
            <div class="text-center">
              <svg class="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>Tidak ada data assessment</p>
            </div>
          </div>
          <div v-else class="space-y-4">
            <div v-for="(item, index) in assessmentByDimensi" :key="index" class="relative">
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700 dark:text-dark-text truncate max-w-[70%]" :title="item.nama_dimensi">{{ item.nama_dimensi }}</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-dark-text">{{ item.count }}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div class="h-2.5 rounded-full" 
                     :style="{width: `${(item.count / maxAssessmentByDimensi) * 100}%`, backgroundColor: getDimensiColor(item.nama_dimensi)}"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Siswa per Kelas -->
        <div class="rounded-2xl bg-white dark:bg-dark-surface shadow-sm ring-1 ring-gray-200 dark:ring-dark-border p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">Siswa per Kelas</h3>
          <div class="h-64 flex items-center justify-center" v-if="loading">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <div v-else-if="!siswaPerKelas.length" class="h-64 flex items-center justify-center text-gray-400">
            <div class="text-center">
              <svg class="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p>Tidak ada data siswa</p>
            </div>
          </div>
          <div v-else class="overflow-y-auto max-h-64 space-y-4">
            <div v-for="(item, index) in siswaPerKelas" :key="index" class="relative">
              <div class="flex justify-between items-center mb-1">
                <span class="text-sm font-medium text-gray-700 dark:text-dark-text">{{ item.nama_kelas }}</span>
                <span class="text-sm font-semibold text-gray-900 dark:text-dark-text">{{ item.count }}</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div class="bg-blue-500 h-2.5 rounded-full" :style="{width: `${(item.count / maxSiswaPerKelas) * 100}%`}"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Daftar Assessment untuk Guru, Tidak muncul di dashboard Admin -->
      <div v-if="!isAdmin" class="rounded-2xl bg-white dark:bg-dark-surface shadow-sm ring-1 ring-gray-200 dark:ring-dark-border p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text">Daftar Assessment</h3>
            <div v-if="hasActiveFilters" class="mt-1 flex flex-wrap gap-1">
              <span class="text-xs text-gray-500">Filter aktif:</span>
              <span v-if="searchQuery" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                🔍 {{ searchQuery.length > 15 ? searchQuery.substring(0, 15) + '...' : searchQuery }}
              </span>
              <span v-if="filterKelas" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-50 text-blue-700">
                📚 {{ getNamaKelas(filterKelas) }}
              </span>
              <span v-if="filterDimensi" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                🎯 {{ getNamaDimensi(filterDimensi).length > 20 ? getNamaDimensi(filterDimensi).substring(0, 20) + '...' : getNamaDimensi(filterDimensi) }}
              </span>
              <span v-if="filterElemen" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-800">
                📝 {{ getNamaElemen(filterElemen).length > 20 ? getNamaElemen(filterElemen).substring(0, 20) + '...' : getNamaElemen(filterElemen) }}
              </span>
            </div>
          </div>
          <button 
            @click="refreshData" 
            class="inline-flex items-center px-3 py-1.5 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        <!-- Filter Toggle Button -->
        <div class="mb-4">
          <button
            @click="showFilters = !showFilters"
            class="inline-flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            <svg :class="['w-4 h-4 mr-2 transition-transform duration-200', showFilters ? 'rotate-180' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
            {{ showFilters ? 'Sembunyikan Filter' : 'Tampilkan Filter' }}
            <span v-if="hasActiveFilters" class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
              {{ [searchQuery, filterKelas, filterDimensi, filterElemen].filter(Boolean).length }} aktif
            </span>
          </button>
        </div>

        <!-- Filter Section -->
        <div v-if="showFilters" class="mb-6 bg-gray-50 dark:bg-gray-800/40 rounded-lg p-4 transition-all duration-300 ease-in-out">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <!-- Search Assessment -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">🔍 Cari Assessment</label>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Nama assessment..."
                class="block w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text"
              >
            </div>

            <!-- Filter Kelas -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
              <select
                v-model="filterKelas"
                class="block w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text"
              >
                <option value="">Semua Kelas</option>
                <option v-for="kelas in kelasList" :key="kelas.id_kelas" :value="kelas.id_kelas">
                  {{ kelas.nama_kelas }}
                </option>
              </select>
            </div>

            <!-- Filter Dimensi -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Dimensi</label>
              <select
                v-model="filterDimensi"
                class="block w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-gray-800/40 dark:disabled:text-gray-500"
              >
                <option value="">Semua Dimensi</option>
                <option v-for="dimensi in dimensiList" :key="dimensi.id_dimensi" :value="dimensi.id_dimensi">
                  {{ dimensi.nama_dimensi }}
                </option>
              </select>
            </div>

            <!-- Filter Elemen -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Elemen</label>
              <select
                v-model="filterElemen"
                :disabled="!filterDimensi"
                class="block w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text disabled:bg-gray-100 disabled:text-gray-400 dark:disabled:bg-gray-800/40 dark:disabled:text-gray-500"
              >
                <option value="">Semua Elemen</option>
                <option v-for="elemen in filteredElemenList" :key="elemen.id_elemen" :value="elemen.id_elemen">
                  {{ elemen.nama_elemen }}
                </option>
              </select>
            </div>

            <!-- Clear Filters -->
            <div class="flex items-end">
              <button
                @click="clearFilters"
                class="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md text-sm font-medium"
              >
                Clear Filter
              </button>
            </div>
          </div>

          <!-- Filter Results Info -->
          <div v-if="filteredAssessments.length !== dashboardData.assessments.length" class="mt-3 flex items-center justify-between">
            <div class="text-sm text-gray-600">
              Menampilkan {{ filteredAssessments.length }} dari {{ dashboardData.assessments.length }} assessment
            </div>
            <div class="flex gap-2">
              <span v-if="searchQuery" class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                🔍 "{{ searchQuery }}"
              </span>
              <span v-if="filterKelas" class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-700">
                📚 {{ getNamaKelas(filterKelas) }}
              </span>
              <span v-if="filterDimensi" class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                🎯 {{ getNamaDimensi(filterDimensi) }}
              </span>
              <span v-if="filterElemen" class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                📝 {{ getNamaElemen(filterElemen) }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="loading" class="flex justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <div v-else-if="error" class="flex items-center justify-center py-8 text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm">{{ error }}</p>
        </div>
        <div v-else-if="filteredAssessments.length === 0" class="flex flex-col items-center py-8 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span class="text-sm">Tidak ada assessment yang sesuai dengan filter</span>
        </div>
        <div v-else>
          <!-- Horizontal scrollable card container, bertingkat -->
          <div class="flex flex-row items-start gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50 dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800/40">
            <div v-for="(ass, idx) in filteredAssessments" :key="ass.id_assessment"
              class="min-w-[340px] max-w-xs snap-start flex-shrink-0 rounded-2xl ring-1 ring-gray-200 dark:ring-dark-border bg-white dark:bg-dark-surface p-6 flex flex-col transition-all duration-200 hover:shadow-md">
              <!-- Label/tag dimensi -->
              <div :class="['inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3', getDimensiLabelClass(ass)]">
                {{ getRelasiAssessment(ass).dimensi }}
              </div>
              <div class="font-semibold text-lg mb-2 text-gray-900 dark:text-dark-text truncate" :title="ass.nama_assessment">{{ ass.nama_assessment }}</div>
              <div class="flex items-center gap-2 mb-2 text-sm">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  Kelas: {{ getKelasAssessment(ass) }}
                </span>
              </div>
              <div class="flex flex-wrap gap-2 mb-3 text-xs">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-200">Elemen: {{ getRelasiAssessment(ass).elemen }}</span>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-200">Sub: {{ getRelasiAssessment(ass).subElemen }}</span>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-200">Capaian: {{ getRelasiAssessment(ass).capaian }}</span>
              </div>
              <div class="flex items-center justify-between mt-2 mb-1">
                <div class="flex items-center gap-2 text-xs text-gray-600 dark:text-dark-text-secondary">
                  <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5V4H2v16h5m10 0v-6a2 2 0 10-4 0v6m4 0H9"/></svg>
                  <span>Jumlah Siswa</span>
                </div>
                <div class="text-base font-semibold text-gray-900 dark:text-dark-text">{{ getJumlahSiswaAssessment(ass) }}</div>
              </div>
              <router-link
                :to="{ name: 'assesment-detail', query: { id_assessment: ass.id_assessment } }"
                class="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 text-center shadow"
              >
                Lihat Detail
              </router-link>
              <router-link
                :to="{ name: 'assessment-edit', params: { id: ass.id_assessment }}"
                class="mt-4 inline-block px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 text-center shadow"
              >
                Edit Nilai
              </router-link>
              <!-- Add Delete Button -->
              <button
                @click.stop="confirmDelete(ass)"
                class="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors duration-200 shadow"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Admin Summary Cards -->
      <div v-if="isAdmin" class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        <!-- Tren Assessment -->
        <div class="rounded-2xl bg-white dark:bg-dark-surface shadow-sm ring-1 ring-gray-200 dark:ring-dark-border p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">Status Assessment Terkini</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mr-4">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-500">Assessment Selesai</div>
                  <div class="text-lg font-semibold">{{ dashboardData.totalAssessment - dashboardData.belumDinilai || '0' }}</div>
                </div>
              </div>
              <div class="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
                {{ Math.round(((dashboardData.totalAssessment - dashboardData.belumDinilai) / (dashboardData.totalAssessment || 1)) * 100) }}%
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center mr-4">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-500">Assessment Pending</div>
                  <div class="text-lg font-semibold">{{ dashboardData.belumDinilai || '0' }}</div>
                </div>
              </div>
              <div class="text-sm font-medium px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                {{ Math.round((dashboardData.belumDinilai / (dashboardData.totalAssessment || 1)) * 100) }}%
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-500">Total Assessment</div>
                  <div class="text-lg font-semibold">{{ dashboardData.totalAssessment || '0' }}</div>
                </div>
              </div>
              <router-link :to="{ name: 'assesment-index' }" class="text-sm font-medium text-blue-600 hover:text-blue-800">
                Lihat Semua
              </router-link>
            </div>
          </div>
        </div>
        
        <!-- Ringkasan Guru dan Siswa -->
        <div class="rounded-2xl bg-white dark:bg-dark-surface shadow-sm ring-1 ring-gray-200 dark:ring-dark-border p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-dark-text mb-4">Ringkasan SDM</h3>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mr-4">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-500">Total Guru</div>
                  <div class="text-lg font-semibold">{{ dashboardData.totalGuru || '0' }}</div>
                </div>
              </div>
              <router-link :to="{ name: 'guru' }" class="text-sm font-medium text-blue-600 hover:text-blue-800">
                Lihat Semua
              </router-link>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mr-4">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-500">Total Siswa</div>
                  <div class="text-lg font-semibold">{{ dashboardData.totalSiswa || '0' }}</div>
                </div>
              </div>
              <router-link :to="{ name: 'siswa' }" class="text-sm font-medium text-blue-600 hover:text-blue-800">
                Lihat Semua
              </router-link>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mr-4">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-medium text-gray-500">Total Kelas</div>
                  <div class="text-lg font-semibold">{{ dashboardData.totalKelas || '0' }}</div>
                </div>
              </div>
              <router-link :to="{ name: 'kelas' }" class="text-sm font-medium text-blue-600 hover:text-blue-800">
                Lihat Semua
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <Teleport to="body">
    <div v-if="showDeleteModal" class="fixed inset-0 z-[100]">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="cancelDelete"></div>
      
      <!-- Modal -->
      <div class="relative z-[101] min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-lg w-full p-6">
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-medium text-gray-900 mb-2">Hapus Assessment</h3>
              <p class="text-sm text-gray-500">
                Apakah Anda yakin ingin menghapus assessment "{{ selectedAssessment?.nama_assessment }}"? Semua nilai terkait akan ikut terhapus.
              </p>
              <div v-if="deleteError" class="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
                {{ deleteError }}
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              @click="cancelDelete"
              class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-sm font-medium"
            >
              Batal
            </button>
            <button
              @click="deleteAssessment"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import axios from '@/plugins/axios'
import { Teleport } from 'vue'
import Cookies from 'js-cookie'
import { parseJWT } from '@/utils/jwt'
import { getGuruByUserId, getGuruByEmail } from '@/services/api'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { useGuruStore } from '@/stores/guru'
import { useKelasStore } from '@/stores/kelas'
import { useSiswaStore } from '@/stores/siswa'

// Add store
const themeStore = useThemeStore();
const authStore = useAuthStore();
const guruStore = useGuruStore();
const kelasStore = useKelasStore();
const siswaStore = useSiswaStore();

const isDarkMode = computed(() => themeStore.isDarkMode);
const isAdmin = computed(() => authStore.isAdmin);

// Initials for header avatar
const userInitials = computed(() => {
  const name = (userData.value?.nama || dashboardData.value.userName || '').trim();
  if (!name) return '';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
});

// Data untuk grafik dimensi
const assessmentByDimensi = ref([]);
const maxAssessmentByDimensi = computed(() => {
  if (!assessmentByDimensi.value.length) return 1;
  return Math.max(...assessmentByDimensi.value.map(item => item.count));
});

// Data untuk grafik siswa per kelas
const siswaPerKelas = ref([]);
const maxSiswaPerKelas = computed(() => {
  if (!siswaPerKelas.value.length) return 1;
  return Math.max(...siswaPerKelas.value.map(item => item.count));
});

interface DashboardData {
  userName: string
  totalKelas: number
  kelasAktif: number
  totalAssessment: number
  belumDinilai: number
  totalSiswa: number
  siswaAktif: number
  totalGuru: number
  guruAktif: number
  assessments: any[]
}

const dashboardData = ref<DashboardData>({
  userName: '',
  totalKelas: 0,
  kelasAktif: 0,
  totalAssessment: 0,
  belumDinilai: 0,
  totalSiswa: 0,
  siswaAktif: 0,
  totalGuru: 0,
  guruAktif: 0,
  assessments: []
})

const userData = ref({
  id: null,
  nama: '',
  email: '',
  nip: '',
  id_sekolah: null,
  id_role: null
})

const loading = ref(true)
const error = ref<string | null>(null)

// Filter variables
const searchQuery = ref('')
const filterKelas = ref('')
const filterDimensi = ref('')
const filterElemen = ref('')
const showFilters = ref(false)

// Delete functionality refs and methods
const showDeleteModal = ref(false)
const selectedAssessment = ref(null)
const deleteError = ref(null)

// Klaim dari token (id di token = users.id_user)
const getClaimsFromToken = () => {
  try {
    const token = Cookies.get('auth_token') || Cookies.get('token') || localStorage.getItem('token')
    if (!token) return { userId: null, email: null }
    const decoded = parseJWT(token)
    return { userId: decoded?.id || decoded?.user_id || null, email: decoded?.email || null }
  } catch (err) {
    console.error('Error parsing token:', err)
    return { userId: null, email: null }
  }
}

// Fungsi untuk mengambil data guru dari API
const fetchUserData = async () => {
  try {
    const { userId, email } = getClaimsFromToken()
    let result = null
    if (userId) result = await getGuruByUserId(userId)

    if ((!result || !result.success) && email) {
      const found = await getGuruByEmail(email)
      if (found) result = { success: true, data: found }
    }

    if (result?.success) {
      userData.value = result.data
      dashboardData.value.userName = result.data?.nama || ''
    } else {
      // Fallback ke localStorage
      const user = localStorage.getItem('user')
      if (user) userData.value = { ...userData.value, ...JSON.parse(user) }
    }
  } catch (err) {
    console.error('Error fetching user data:', err)
  }
}

// Warna untuk dimensi
const dimensiColorMap = {
  'Beriman, Bertaqwa kepada Tuhan YME dan Berakhlak Mulia': '#3b82f6',
  'Inklusif, Berbudaya dan Nasionalis': '#6366f1',
  'Berukhuwah dan Peduli': '#8b5cf6',
  'Kreatif dan Terampil': '#ec4899',
  'Berkepribadian yang Matang': '#14b8a6',
  // Default
  'default': '#64748b'
}

// Fungsi untuk mendapatkan warna dimensi
const getDimensiColor = (dimensi) => {
  return dimensiColorMap[dimensi] || dimensiColorMap.default;
}

const fetchDashboardData = async () => {
  try {
    loading.value = true
    error.value = null

    const { userId, email } = getClaimsFromToken()
    let result = null
    const resultGet = await getGuruByUserId(userId)

    console.log('userId from token:', resultGet.data)
    const guruId = resultGet.data?.id_guru || null
    
    // Jika admin, ambil data global, jika tidak ambil data khusus guru
    if (isAdmin.value) {
      // Ambil data global untuk admin
      try {
        // Ambil data kelas
        const kelasRes = await axios.get('/list/kelas')
        const kelasList = kelasRes.data.data || []
        dashboardData.value.totalKelas = kelasList.length
        dashboardData.value.kelasAktif = kelasList.filter(k => k.status === 'aktif' || k.status === 1).length
        
        // Ambil data guru
        const guruRes = await axios.get('/list/guru')
        const guruList = guruRes.data.data || []
        dashboardData.value.totalGuru = guruList.length
        dashboardData.value.guruAktif = guruList.filter(g => g.status === 'aktif' || g.status === 1).length
        
        // Ambil data siswa
        const siswaRes = await axios.get('/list/siswa')
        const siswaList = siswaRes.data.data || []
        dashboardData.value.totalSiswa = siswaList.length
        dashboardData.value.siswaAktif = siswaList.filter(s => s.status === 'aktif' || s.status === 1).length
        
        // Ambil data assessment (semua assessment)
        const assessmentRes = await axios.get('/list/assessment')
        const assessmentList = assessmentRes.data.data || []
        dashboardData.value.totalAssessment = assessmentList.length
        
        // Ambil data nilai
        const nilaiRes = await axios.get('/list/nilai')
        const nilaiList = nilaiRes.data.data || []
        
        // Hitung assessment yang belum dinilai
        const dinilaiSet = new Set(nilaiList.map((n) => n.id_assessment))
        dashboardData.value.belumDinilai = Math.max(0, dashboardData.value.totalAssessment - dinilaiSet.size)
        
        // Hitung assessment per dimensi
        if (dimensiList.value.length > 0) {
          const assessmentsByDimensi = [];
          for (const dimensi of dimensiList.value) {
            const elemenIds = elemenList.value
              .filter(e => e.id_dimensi === dimensi.id_dimensi)
              .map(e => e.id_elemen);
              
            const subElemenIds = subElemenList.value
              .filter(s => elemenIds.includes(s.id_elemen))
              .map(s => s.id_sub_elemen);
              
            const capaianIds = capaianList.value
              .filter(c => subElemenIds.includes(c.id_sub_elemen))
              .map(c => c.id);
              
            const count = assessmentList.filter(a => capaianIds.includes(a.id_capaian_kelas)).length;
            
            assessmentsByDimensi.push({
              nama_dimensi: dimensi.nama_dimensi,
              count
            });
          }
          assessmentByDimensi.value = assessmentsByDimensi;
        }
        
        // Hitung siswa per kelas
        if (kelasList.length > 0) {
          const siswaPerKelasData = kelasList.map(kelas => {
            return {
              nama_kelas: kelas.nama_kelas,
              count: siswaList.filter(s => s.id_kelas === kelas.id_kelas).length
            }
          }).sort((a, b) => b.count - a.count).slice(0, 10); // Top 10 kelas dengan siswa terbanyak
          
          siswaPerKelas.value = siswaPerKelasData;
        }
      } catch (adminErr) {
        console.error('Error fetching admin dashboard data:', adminErr)
      }
    } else {
      // Ambil data spesifik guru
      // Ambil data kelas
      const kelasRes = await axios.get(`/filter/guru/${guruId}/jumlah-kelas`)
      console.log('response kelas', kelasRes.data.jumlah_kelas);
      dashboardData.value.totalKelas = kelasRes.data.jumlah_kelas

      // Ambil data assessment
      const assessmentRes = await axios.get(`/filter/assessment/guru/${guruId}`)
      dashboardData.value.totalAssessment = Array.isArray(assessmentRes.data.data) ? assessmentRes.data.data.length : 0
      console.log('response assessment', assessmentRes.data);
      dashboardData.value.assessments = assessmentRes.data.data || []

      // Ambil data siswa
      const siswaRes = await axios.get(`/filter/guru/${guruId}/jumlah-siswa`)
      console.log('response siswa', siswaRes.data.jumlah_siswa);
      dashboardData.value.totalSiswa = siswaRes.data.jumlah_siswa

      // Ambil data nilai
      const nilaiRes = await axios.get('/list/nilai')
      const nilaiList = nilaiRes.data.data || []
      // Hitung assessment yang belum dinilai
      const dinilaiSet = new Set(nilaiList.map((n: any) => n.id_assessment))
      dashboardData.value.belumDinilai = Math.max(0, dashboardData.value.totalAssessment - dinilaiSet.size)
    }

    // Ambil nama user dari localStorage sebagai fallback jika API belum berhasil
    if (!userData.value.nama) {
      const user = localStorage.getItem('user')
      dashboardData.value.userName = user ? JSON.parse(user).nama || '' : ''
    }
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Tidak dapat mengambil data dashboard dari server'
  } finally {
    loading.value = false
  }
}

// Helper function untuk role name
const getRoleName = (roleId) => {
  const roles = {
    1: 'Super Admin',
    2: 'Guru',
    3: 'Kepala Sekolah'
  }
  return roles[roleId] || 'Guru'
}

// Helper function untuk school name
const getSchoolName = (schoolId) => {
  const schools = {
    1: 'SMA Negeri 1 Semarang',
    2: 'SMA Negeri 2 Semarang'
  }
  return schools[schoolId] || 'Tidak Diketahui'
}

// Data referensi
const kelasList = ref([])
const dimensiList = ref([])
const elemenList = ref([])
const subElemenList = ref([])
const capaianList = ref([])
const siswaList = ref([])
const nilaiList = ref([])
const pengampuList = ref([])

// Helper untuk nama
const getNamaKelas = id => kelasList.value.find(k => k.id_kelas == id)?.nama_kelas || '-';
const getNamaDimensi = id => dimensiList.value.find(d => d.id_dimensi == id)?.nama_dimensi || '-';
const getNamaElemen = id => elemenList.value.find(e => e.id_elemen == id)?.nama_elemen || '-';
const getNamaSubElemen = id => subElemenList.value.find(se => se.id_sub_elemen == id)?.nama_sub_elemen || '-';
// capaianList now holds rows from capaian_kelas: { id, id_sub_elemen, id_kelas, indikator, nama_ck, kode_ck }
const getNamaCapaian = id => {
  const ck = capaianList.value.find(c => c.id == id)
  return ck?.indikator || ck?.nama_ck || '-'
}
const getJumlahSiswa = id_kelas => siswaList.value.filter(s => s.id_kelas == id_kelas).length;

// Computed property for active filters
const hasActiveFilters = computed(() => {
  return searchQuery.value || filterKelas.value || filterDimensi.value || filterElemen.value
})

// Computed properties for filtering
const filteredElemenList = computed(() => {
  if (!filterDimensi.value) return []
  return elemenList.value.filter(e => e.id_dimensi == filterDimensi.value)
})

const filteredAssessments = computed(() => {
  let filtered = dashboardData.value.assessments

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(ass =>
      ass.nama_assessment.toLowerCase().includes(query)
    )
  }

  // Filter by kelas
  if (filterKelas.value) {
    filtered = filtered.filter(ass => {
      // Prefer kelas from capaian_kelas relation if available
      const ck = capaianList.value.find(c => c.id == ass.id_capaian_kelas)
      if (ck?.id_kelas) {
        return String(ck.id_kelas) === String(filterKelas.value)
      }
      // Fallback: derive kelas from nilai -> siswa
      const nilaiAssessment = nilaiList.value.filter(n => n.id_assessment == ass.id_assessment)
      const siswaIds = Array.from(new Set(nilaiAssessment.map(n => n.id_siswa)))
      const kelasIds = Array.from(new Set(
        siswaIds
          .map(sid => siswaList.value.find(s => s.id_siswa == sid)?.id_kelas)
          .filter(Boolean)
      ))
      return kelasIds.includes(parseInt(filterKelas.value))
    })
  }

  // Filter by dimensi
  if (filterDimensi.value) {
    filtered = filtered.filter(ass => {
      const relasi = getRelasiAssessment(ass)
      return relasi.dimensi !== '-' && dimensiList.value.find(d => d.nama_dimensi === relasi.dimensi)?.id_dimensi == filterDimensi.value
    })
  }

  // Filter by elemen
  if (filterElemen.value) {
    filtered = filtered.filter(ass => {
      const relasi = getRelasiAssessment(ass)
      return relasi.elemen !== '-' && elemenList.value.find(e => e.nama_elemen === relasi.elemen)?.id_elemen == filterElemen.value
    })
  }

  return filtered
})

// Clear filters function
const clearFilters = () => {
  searchQuery.value = ''
  filterKelas.value = ''
  filterDimensi.value = ''
  filterElemen.value = ''
}

// Watch for dimensi changes to reset elemen
watch(filterDimensi, (newDimensi) => {
  if (!newDimensi) {
    filterElemen.value = ''
  }
})

// Helper relasi assessment (dimensi, elemen, sub elemen, capaian)
const getRelasiAssessment = (ass) => {
  // Assessment sekarang mengacu ke capaian_kelas melalui id_capaian_kelas
  const ck = capaianList.value.find(c => c.id == ass.id_capaian_kelas)
  const subElemen = ck ? subElemenList.value.find(se => se.id_sub_elemen == ck.id_sub_elemen) : null
  const elemen = subElemen ? elemenList.value.find(e => e.id_elemen == subElemen.id_elemen) : null
  const dimensi = elemen ? dimensiList.value.find(d => d.id_dimensi == elemen.id_dimensi) : null
  return {
    dimensi: dimensi ? dimensi.nama_dimensi : '-',
    elemen: elemen ? elemen.nama_elemen : '-',
    subElemen: subElemen ? subElemen.nama_sub_elemen : '-',
    capaian: ck ? (ck.indikator || ck.nama_ck || '-') : '-'
  }
}

// Helper untuk jumlah siswa per assessment berdasarkan nilai dan pengampu
const getJumlahSiswaAssessment = (ass) => {
  // Dapatkan semua nilai untuk assessment ini
  const nilaiAssessment = nilaiList.value.filter(n => n.id_assessment == ass.id_assessment)
  // Dapatkan semua id_pengampu yang terkait dengan assessment ini
  const pengampuIds = Array.from(new Set(nilaiAssessment.map(n => n.id_pengampu)))
  // Dapatkan semua id_kelas dari pengampu terkait
  const kelasIds = pengampuIds.map(pid => pengampuList.value.find(p => p.id_pengampu == pid)?.id_kelas)
  // Hitung jumlah siswa unik yang dinilai pada assessment ini
  const siswaIds = Array.from(new Set(nilaiAssessment.map(n => n.id_siswa)))
  return siswaIds.length
}

// Helper untuk kelas assessment berdasarkan nilai dan siswa
const getKelasAssessment = (ass) => {
  // Prefer kelas dari relasi capaian_kelas jika tersedia
  const ck = capaianList.value.find(c => c.id == ass.id_capaian_kelas)
  if (ck?.id_kelas) {
    return getNamaKelas(ck.id_kelas)
  }
  // Fallback: derive from nilai -> siswa -> kelas
  const nilaiAssessment = nilaiList.value.filter(n => n.id_assessment == ass.id_assessment)
  const siswaIds = Array.from(new Set(nilaiAssessment.map(n => n.id_siswa)))
  const kelasIds = Array.from(new Set(
    siswaIds
      .map(sid => siswaList.value.find(s => s.id_siswa == sid)?.id_kelas)
      .filter(Boolean)
  ))
  const kelasNames = kelasIds.map(kid => kelasList.value.find(k => k.id_kelas == kid)?.nama_kelas).filter(Boolean)
  return kelasNames.length > 0 ? kelasNames.join(', ') : '-'
}

// Mapping warna label/tag per dimensi/domain
const dimensiLabelColorMap = {
  'Beriman, Bertaqwa kepada Tuhan YME dan Berakhlak Mulia': 'bg-blue-600 text-white',
  'Inklusif, Berbudaya dan Nasionalis': 'bg-blue-500 text-white',
  'Berukhuwah dan Peduli': 'bg-blue-700 text-white',
  'Kreatif dan Terampil': 'bg-blue-400 text-white',
  'Berkepribadian yang Matang': 'bg-blue-800 text-white',
  // Tambahkan domain lain jika ada
}
function getDimensiLabelClass(ass) {
  const dimensi = getRelasiAssessment(ass).dimensi
  return dimensiLabelColorMap[dimensi] || 'bg-gray-400 text-white'
}

const fetchReferenceData = async () => {
  const [kelasRes, dimensiRes, elemenRes, subElemenRes, capaianRes, siswaRes, nilaiRes, pengampuRes] = await Promise.all([
    axios.get('/list/kelas'),
    axios.get('/list/dimensi'),
    axios.get('/list/elemen'),
    axios.get('/list/sub_elemen'),
    axios.get('/list/capaian_kelas'),
    axios.get('/list/siswa'),
    axios.get('/list/nilai'),
    axios.get('/list/pengampu')
  ])
  kelasList.value = kelasRes.data.data || []
  dimensiList.value = dimensiRes.data.data || []
  elemenList.value = elemenRes.data.data || []
  subElemenList.value = subElemenRes.data.data || []
  capaianList.value = capaianRes.data.data || []
  siswaList.value = siswaRes.data.data || []
  nilaiList.value = nilaiRes.data.data || []
  pengampuList.value = pengampuRes.data.data || []
}

const refreshData = async () => {
  try {
    await fetchReferenceData() // Penting untuk memuat referensi terlebih dahulu
    await fetchUserData()
    await fetchDashboardData()
  } catch (err) {
    console.error('Error refreshing data:', err)
  }
}

onMounted(async () => {
  try {
    await fetchReferenceData() // Penting untuk memuat referensi terlebih dahulu
    await fetchUserData()
    await fetchDashboardData()
  } catch (err) {
    console.error('Error in onMounted:', err)
  }
})

const confirmDelete = (assessment) => {
  selectedAssessment.value = assessment
  showDeleteModal.value = true
}

const cancelDelete = () => {
  showDeleteModal.value = false
  selectedAssessment.value = null
  deleteError.value = null
}

const deleteAssessment = async () => {
  try {
    if (!selectedAssessment.value?.id_assessment) return;

    // First delete all related nilai
    await axios.delete(`/delete/assessment/${selectedAssessment.value.id_assessment}/nilai`)
    
    // Then delete the assessment
    await axios.delete(`/delete/assessment/${selectedAssessment.value.id_assessment}`)
    
    // Close modal and reset state
    showDeleteModal.value = false
    selectedAssessment.value = null
    deleteError.value = null
    
    // Refresh dashboard data
    await refreshData()
  } catch (err) {
    deleteError.value = err?.response?.data?.message || 'Gagal menghapus assessment'
    console.error('Error deleting assessment:', err)
  }
}
</script>

<style scoped>
.animate-fade-in { animation: fade-in 400ms ease-out both; }
.animate-fade-in-up { animation: fade-in-up 500ms ease-out both; }
@keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
@keyframes fade-in-up { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>