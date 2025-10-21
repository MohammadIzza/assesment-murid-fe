<template>
  <div class="min-h-screen bg-gray-50 py-8" style="padding-top: 5rem;">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <div class="bg-blue-700 px-8 py-6 rounded-xl mb-8">
      <div class="flex items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-white mb-2">Assessment</h1>
          <p class="text-blue-100 text-base">Kelola dan buat assessment untuk siswa</p>
        </div>
      </div>
    </div>
    
    <!-- History Card -->
    <div class="mb-6">
      <div class="rounded-2xl bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between p-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">Riwayat Assessment</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">Entri terakhir dari penilaian Anda</p>
            </div>
          </div>
          <button 
            @click="toggleHistory(getGuru(currentEmailUser))"
            class="inline-flex items-center px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 rounded-lg text-sm font-medium"
          >
            <span class="mr-2">{{ isOpen ? 'Sembunyikan' : 'Tampilkan' }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" :class="['w-4 h-4 transition-transform', isOpen ? 'rotate-180' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        <div v-if="isOpen" class="border-t border-gray-200 dark:border-gray-700">
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th class="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Nama Siswa</th>
                  <th class="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Assessment</th>
                  <th class="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Nilai</th>
                  <th class="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Waktu Input</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="(row, index) in historyData" :key="index" class="hover:bg-gray-50 dark:hover:bg-blue-900/30">
                  <td class="px-4 py-2 text-gray-700 dark:text-gray-200">{{ getSiswa(row.id_siswa) }}</td>
                  <td class="px-4 py-2 text-gray-700 dark:text-gray-200">{{ getAssessment(row.id_assessment) }}</td>
                  <td class="px-4 py-2 text-gray-900 dark:text-gray-100 font-medium">{{ row.nilai }}</td>
                  <td class="px-4 py-2 text-gray-500 dark:text-gray-400">{{ formatDate(row.tanggal_input) }}</td>
                </tr>
                <tr v-if="historyData.length === 0">
                  <td colspan="4" class="px-4 py-6 text-center text-gray-500 dark:text-gray-400">Tidak ada riwayat assessment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Global Search Section - Always visible -->
    <div class="mb-4 mt-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-center gap-4">
          <div class="flex-1">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">🔍 Cari Siswa (Global)</label>
            <div class="relative">
              <input
                v-model="globalSearchQuery"
                @input="onGlobalSearch"
                @keydown="handleSearchKeydown"
                type="text"
                placeholder="Ketik nama siswa untuk mencari di semua kelas..."
                class="block w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <button
                v-if="globalSearchQuery"
                @click="clearGlobalSearch"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div v-if="globalSearchQuery && searchResults.length > 0" class="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Ditemukan {{ searchResults.length }} siswa • Gunakan ↑↓ untuk navigasi, Esc untuk clear
              <div class="mt-1 text-xs">
                <span v-for="(result, index) in searchResults.slice(0, 5)" :key="result.siswa.id_siswa" class="inline-block mr-2 mb-1">
                  <span :class="index === currentSearchIndex ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'" 
                        class="px-2 py-1 rounded text-xs">
                    {{ result.siswa.nama }} ({{ result.kelas }})
                  </span>
                </span>
                <span v-if="searchResults.length > 5" class="text-xs text-gray-500">+{{ searchResults.length - 5 }} lainnya</span>
              </div>
            </div>
            <div v-if="globalSearchQuery && searchResults.length === 0" class="mt-2 text-sm text-red-600 dark:text-red-400">
              Tidak ada siswa yang ditemukan
            </div>
          </div>
          <div v-if="globalSearchQuery && searchResults.length > 0" class="flex gap-2">
            <button
              @click="scrollToPrevious"
              :disabled="currentSearchIndex <= 0"
              class="px-3 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium"
            >
              ← Previous
            </button>
            <span class="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 flex items-center">
              {{ currentSearchIndex + 1 }} / {{ searchResults.length }}
            </span>
            <button
              @click="scrollToNext"
              :disabled="currentSearchIndex >= searchResults.length - 1"
              class="px-3 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Kelas Compact -->
    <div class="mb-4 flex flex-col items-start w-full">
      <label class="block text-base font-bold text-blue-700 dark:text-blue-300 mb-1">Kelas <span class="text-xs text-gray-400 ml-2">(Wajib dipilih dulu)</span></label>
      <select 
        v-model="selectedKelas" 
        @change="onKelasChange"
        class="block w-full max-w-md px-3 py-2 border border-blue-400 dark:border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-base font-medium shadow-sm"
      >
        <option value="">Pilih Kelas</option>
        <option v-for="kelas in kelasListForUser" :key="kelas.id_kelas" :value="kelas.id_kelas">
          {{ kelas.nama_kelas }}
        </option>
      </select>
      <span v-if="!isAdmin && kelasListForUser.length === 0" class="text-amber-600 dark:text-amber-400 text-xs mt-2">
        Anda belum terdaftar sebagai pengampu kelas mana pun. Hubungi admin jika ini tidak sesuai.
      </span>
      <span v-if="!selectedKelas" class="text-red-600 dark:text-red-400 text-xs mt-1 block">* Pilih kelas terlebih dahulu sebelum filter lain</span>
    </div>
    <!-- Filter & Action Section Card Compact -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 mb-6 p-4 relative">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <!-- Dimensi Filter -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Dimensi</label>
          <select 
            v-model="selectedDimensi"
            @change="onDimensiChange" 
            :disabled="!selectedKelas"
            class="block w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm"
            :title="!selectedKelas ? 'Pilih kelas dulu' : ''"
          >
            <option value="">Pilih Dimensi</option>
            <option v-for="dimensi in dimensiList" :key="dimensi.id_dimensi" :value="dimensi.id_dimensi">
              {{ dimensi.nama_dimensi }}
            </option>
          </select>
          <span v-if="!selectedKelas" class="text-xs text-gray-400 mt-1 block">Aktif setelah kelas dipilih</span>
        </div>
        <!-- Elemen Filter -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Elemen</label>
          <select 
            v-model="selectedElemen"
            @change="onElemenChange" 
            :disabled="!selectedDimensi || !selectedKelas"
            class="block w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm"
            :title="!selectedDimensi ? 'Pilih dimensi dulu' : ''"
          >
            <option value="">Pilih Elemen</option>
            <option v-for="elemen in filteredElemenList" :key="elemen.id_elemen" :value="elemen.id_elemen">
              {{ elemen.nama_elemen }}
            </option>
          </select>
          <span v-if="!selectedDimensi" class="text-xs text-gray-400 mt-1 block">Aktif setelah dimensi dipilih</span>
        </div>
        <!-- Sub Elemen Filter -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Sub Elemen</label>
          <select 
            v-model="selectedSubElemen"
            @change="onSubElemenChange" 
            :disabled="!selectedElemen || !selectedKelas"
            class="block w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm"
            :title="!selectedElemen ? 'Pilih elemen dulu' : ''"
          >
            <option value="">Pilih Sub Elemen</option>
            <option v-for="subElemen in filteredSubElemenList" :key="subElemen.id_sub_elemen" :value="subElemen.id_sub_elemen">
              {{ subElemen.nama_sub_elemen }}
            </option>
          </select>
          <span v-if="!selectedElemen" class="text-xs text-gray-400 mt-1 block">Aktif setelah elemen dipilih</span>
        </div>
        <!-- Capaian Filter -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Capaian</label>
          <select 
            v-model="selectedCapaian"
            @change="onCapaianChange" 
            :disabled="!selectedSubElemen || !selectedKelas"
            class="block w-full px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm"
            :title="!selectedSubElemen ? 'Pilih sub elemen dulu' : ''"
          >
            <option value="">Pilih Capaian</option>
            <option v-for="capaian in capaianList" :key="capaian.id_capaian" :value="capaian.id_capaian">
              {{ truncateText(capaian.deskripsi, 60) }}
            </option>
          </select>
          <span v-if="!selectedSubElemen" class="text-xs text-gray-400 mt-1 block">Aktif setelah sub elemen dipilih</span>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button 
          @click="openCreateModal"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-semibold flex items-center gap-2 shadow"
          title="Buat assessment baru"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Buat
        </button>
      </div>
    </div>

    <!-- Message when no class is selected -->
    <div v-if="!selectedKelas" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-10 text-center">
      <div class="text-gray-400 mb-4">
        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">Pilihlah Kelas terlebih dahulu!</h3>
      <p class="text-gray-500 dark:text-gray-400">Anda harus memilih kelas untuk melihat dan mengelola penilaian siswa.</p>
      <p class="text-sm text-blue-600 dark:text-blue-400 mt-2">💡 Gunakan fitur pencarian global di atas untuk mencari siswa di semua kelas</p>
    </div>

    <!-- Buku Penilaian - Muncul ketika kelas dipilih -->
    <div v-if="selectedKelas" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8 overflow-hidden">
      <div class="p-6 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white">
        <h2 class="text-xl font-bold">Buku Penilaian: {{ getNamaKelas(selectedKelas) }}</h2>
        <p class="text-blue-100">{{ filterDescription }}</p>
      </div>
      
      <!-- Tabel Penilaian dengan Styling yang Ditingkatkan -->
      <div class="overflow-x-auto">
        <table class="w-full min-w-full border-collapse">
          <!-- Header -->
          <thead>
            <tr class="bg-gray-800 text-white border-b border-gray-600">
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-16 border-r border-gray-700">Dimensi</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-12 border-r border-gray-700">Elemen</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-16 border-r border-gray-700">Sub Element</th>
              <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-r border-gray-700">Capaian</th>
              <!-- <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-16 border-r border-gray-700 bg-gray-700">Capaian Kelas</th> -->
              
              <!-- Student headers - Dynamic based on loaded students -->
              <template v-for="siswa in siswaList" :key="siswa.id_siswa">
                <th :id="`siswa-${siswa.id_siswa}`"
                    :colspan="7"
                    class="text-center border-l border-gray-700 transition-all duration-300"
                    :class="isSiswaHighlighted(siswa.id_siswa) ? 'bg-yellow-200 dark:bg-yellow-800' : ''">
                  <div class="px-2 py-3 text-xs font-semibold">
                    <span v-html="highlightSearchText(siswa.nama)"></span>
                    <div v-if="isSiswaHighlighted(siswa.id_siswa)" class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      ({{ getKelasNameById(siswa.id_kelas) }})
                    </div>
                  </div>
                  <div class="flex border-t border-gray-700">
                    <div v-for="n in 6" :key="n" class="flex-1 px-1 py-2 text-xs border-r last:border-r-0 border-gray-700">{{ n }}</div>
                    <div class="flex-1 px-1 py-2 text-xs font-semibold bg-gray-700">M</div>
                  </div>
                </th>
              </template>
            </tr>
          </thead>
          
          <!-- Body -->
          <tbody>
            <!-- For each dimensi -->
            <template v-for="(dimensi, dimIndex) in filteredDimensiList" :key="dimensi.id_dimensi">
              <!-- Dimensi header row with colored background -->
              <tr class="bg-green-600 dark:bg-green-800 text-white">
                <td colspan="100%" class="px-4 py-3 font-semibold">
                  {{ dimensi.nama_dimensi }}
                </td>
              </tr>
              
              <!-- For each elemen in this dimensi -->
              <template v-for="(elemen, elemIndex) in getElemenForDimensi(dimensi.id_dimensi)" :key="elemen.id_elemen">
                <!-- Elemen Header Row -->
                <tr class="bg-gray-100 dark:bg-gray-700">
                  <!-- Elemen identifier (A, B, C, etc.) -->
                  <td class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-lg font-bold text-green-700 dark:text-green-300">
                    {{ String.fromCharCode(65 + elemIndex) }}
                  </td>
                  
                  <!-- Elemen Name -->
                  <td colspan="4" class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-300">
                    {{ elemen.nama_elemen }}
                  </td>
                  
                  <!-- Empty cells for student columns -->
                  <td :colspan="siswaList.length * 7" class="border border-gray-300 dark:border-gray-700"></td>
                </tr>
                
                <!-- Sub-Elemen (SKL) and Capaian (Kompetensi) Rows -->
                <template v-for="(subElemen, subIndex) in getSubElemenForElemen(elemen.id_elemen)" :key="subElemen.id_sub_elemen">
                  <!-- For each capaian in this sub-elemen -->
                  <template v-for="(capaian, capIndex) in getCapaianForSubElemen(subElemen.id_sub_elemen)" :key="capaian.id_capaian">
                    <tr class="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-blue-950">
                      <!-- Empty cell for elemen identifier column -->
                      <td class="border border-gray-300 dark:border-gray-700"></td>
                      
                      <!-- SKL Number (incrementing counter) -->
                      <td class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm font-medium text-center text-gray-800 dark:text-gray-300">
                        {{ subIndex + 1 }}
                      </td>
                      
                      <!-- SKL Name -->
                      <td class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                        {{ subElemen.nama_sub_elemen }}
                      </td>
                      
                      <!-- Kompetensi Description -->
                      <td class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-800 dark:text-gray-300">
                        {{ capaian.deskripsi }}
                      </td>
                      
                      <!-- Additional empty column for spacing -->
                      <!-- <td class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm text-gray-800 dark:text-gray-300"></td> -->
                      
                      <!-- Student assessment cells -->
                      <template v-for="siswa in siswaList" :key="`${capaian.id_capaian}-${siswa.id_siswa}`">
                        <!-- Assessment values (1-6) -->
                        <td v-for="n in 6" :key="`${capaian.id_capaian}-${siswa.id_siswa}-${n}`" 
                            @click="editNilai(capaian, siswa, n)"
                            class="border border-gray-300 dark:border-gray-700 w-12 text-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-black dark:hover:text-white">
                          <div v-if="getNilaiForAssessment(capaian.id_capaian, siswa.id_siswa, n)" 
                               :class="getNilaiClass(getNilaiForAssessment(capaian.id_capaian, siswa.id_siswa, n))" 
                               class="m-1 py-1 px-1 font-medium rounded-full flex items-center justify-center h-8 w-8 mx-auto">
                          {{ getNilaiForAssessment(capaian.id_capaian, siswa.id_siswa, n) }}
                          </div>
                          <div v-else class="m-1 py-1 px-1 text-gray-400 dark:text-gray-600">-</div>
                        </td>
                        
                        <!-- Modus value -->
                        <td class="border border-gray-300 dark:border-gray-700 w-12 bg-gray-100 dark:bg-gray-600 text-center">
                          <div v-if="getModusNilai(capaian.id_capaian, siswa.id_siswa)" 
                               :class="getNilaiClass(getModusNilai(capaian.id_capaian, siswa.id_siswa))" 
                               class="m-1 py-1 px-1 font-medium rounded-full flex items-center justify-center h-8 w-8 mx-auto">
                          {{ getModusNilai(capaian.id_capaian, siswa.id_siswa) }}
                          </div>
                          <div v-else class="m-1 py-1 px-1 text-gray-400 dark:text-gray-600">-</div>
                        </td>
                      </template>
                    </tr>
                  </template>
                </template>
                
                <!-- Average Row for each Elemen -->
                <tr class="bg-blue-50 dark:bg-blue-900/20 border-t-2 border-blue-200 dark:border-blue-800">
                  <td colspan="3" class="border border-gray-300 dark:border-gray-700 px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-300">
                    Modus Per Elemen
                  </td>
                  
                  <!-- Empty cell for capaian column -->
                  <td class="border border-gray-300 dark:border-gray-700"></td>
                  
                  <!-- Additional empty cell for spacing column -->
                  <!-- <td class="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-750"></td> -->
                  
                  <!-- Average for each student -->
                  <template v-for="siswa in siswaList" :key="`avg-${elemen.id_elemen}-${siswa.id_siswa}`">
                    <td colspan="6" class="border border-gray-300 dark:border-gray-700 text-center text-sm font-medium text-gray-800 dark:text-gray-300 py-3">
                      {{ calculateAvgForElemenAndSiswa(elemen.id_elemen, siswa.id_siswa).toFixed(1) }}
                    </td>
                    <td class="border border-gray-300 dark:border-gray-700 w-12 bg-gray-100 dark:bg-gray-600 text-center">
                      <div v-if="getElemenModusForSiswa(elemen.id_elemen, siswa.id_siswa)" 
                           :class="getNilaiClass(getElemenModusForSiswa(elemen.id_elemen, siswa.id_siswa))" 
                           class="m-1 py-1 px-1 font-medium rounded-full flex items-center justify-center h-8 w-8 mx-auto">
                        {{ getElemenModusForSiswa(elemen.id_elemen, siswa.id_siswa) }}
                      </div>
                      <div v-else class="m-1 py-1 px-1 text-gray-400 dark:text-gray-600">-</div>
                    </td>
                  </template>
                </tr>
              </template>
            </template>
            
            <!-- Empty state -->
            <tr v-if="filteredDimensiList.length === 0">
              <td colspan="100%" class="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                Tidak ada data penilaian yang sesuai dengan filter. Silakan ubah filter atau tambahkan assessment baru.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Toast notification -->
    <div v-if="showToast" class="w-full max-w-2xl mx-auto mb-4 text-center">
      <span :class="{
        'text-green-600': toastType === 'success', 
        'text-red-600': toastType === 'error',
        'text-blue-600': toastType === 'info'
      }" 
            class="italic text-base font-medium">
        {{ toastMessage }}
      </span>
    </div>

    <!-- Keep the modal component -->
    <AssesmentFormModal
      v-if="showModal"
      :isEdit="isEditMode"
      :selectedAssessment="selectedAssessment"
      @close="closeModal"
      @save="saveAssessment"
    />
    </div>
  </div>
</template>

<style scoped>
.search-highlight {
  animation: highlight 2s ease-in-out;
}

@keyframes highlight {
  0% { background-color: #fef3c7; }
  50% { background-color: #fbbf24; }
  100% { background-color: transparent; }
}

.dark .search-highlight {
  animation: highlight-dark 2s ease-in-out;
}

@keyframes highlight-dark {
  0% { background-color: #374151; }
  50% { background-color: #92400e; }
  100% { background-color: transparent; }
}
</style>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import AssesmentFormModal from '@/components/assesment/AssesmentFormModal.vue';
import { useAssesmentStore } from '@/stores/assesment'
import { useKelasStore } from '@/stores/kelas'
import { useDimensiStore } from '@/stores/dimensi'
import { useElemenStore } from '@/stores/elemen'
import { useSubElemenStore } from '@/stores/subElemen'
import { useCapaianStore } from '@/stores/capaian'
import { useSiswaStore } from '@/stores/siswa'
import { useThemeStore } from '@/stores/theme'
import { useAuthStore } from '@/stores/auth'
import { useGuruStore } from '@/stores/guru'
import axios from '@/plugins/axios'

// Store initialization
const assessmentStore = useAssesmentStore()
const kelasStore = useKelasStore()
const dimensiStore = useDimensiStore()
const elemenStore = useElemenStore()
const subElemenStore = useSubElemenStore()
const capaianStore = useCapaianStore()
const themeStore = useThemeStore()
const authStore = useAuthStore()
const guruStore = useGuruStore()
const siswaStore = useSiswaStore()
// Pengampu cache for quick lookup
const pengampuList = ref([])

// State variables
const loading = ref(false)
const searchQuery = ref('')
const globalSearchQuery = ref('')
const searchResults = ref([])
const currentSearchIndex = ref(-1)
const allSiswaList = ref([]) // Store all students for global search
const showModal = ref(false)
const isEditMode = ref(false)
const selectedAssessment = ref(null)
// GANTI: kelasList pakai computed agar reactive ke store
const kelasList = computed(() => kelasStore.getKelasList)
// Role & access helpers
const isAdmin = computed(() => authStore.isAdmin)
const currentGuruIdComputed = computed(() => {
  const id = guruStore.getCurrentGuruId
  if (id) return id
  const email = authStore.getUser?.email
  const found = guruStore.getGuruList?.find?.(g => String(g.email || '').toLowerCase() === String(email || '').toLowerCase())
  return found?.id_guru || null
})
// Allowed kelas IDs for current user (normalize to strings)
const allowedKelasIds = computed(() => {
  try {
    if (isAdmin.value) return new Set((kelasList.value || []).map(k => String(k.id_kelas)))
    const gid = currentGuruIdComputed.value
    if (!gid) return new Set()
    const rows = Array.isArray(pengampuList.value) ? pengampuList.value : []
    return new Set(rows.filter(p => p.id_guru == gid).map(p => String(p.id_kelas)))
  } catch (e) {
    return new Set()
  }
})
// Kelas list to present to user
const kelasListForUser = computed(() => {
  const list = kelasList.value || []
  if (isAdmin.value) return list
  const allowed = allowedKelasIds.value
  return list.filter(k => allowed.has(String(k.id_kelas)))
})
const dimensiList = ref([])
const elemenList = ref([])
const subElemenList = ref([])
const capaianList = ref([])
const siswaList = ref([]) // Current class students
const nilaiSiswa = ref({}) // {id_capaian: {id_siswa: nilai}}
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')
let toastTimeout = null

// New data structure for storing assessment values
const assessmentValues = ref({}) // {id_capaian: {id_siswa: {assessmentNumber: nilai}}}

const user = computed(() => authStore.getUser)
const currentEmailUser = computed(() => user.value?.email || '')

// Track current editing assessment
const currentEditingAssessment = ref({
  capaian: null,
  siswa: null,
  assessmentNumber: null
})

// State History
const isOpen = ref(false)
const historyData = ref([])

const toggleHistory = async (id_guru) => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    try {
      await assessmentStore.fetchAssessmentHistory(id_guru)
      historyData.value = assessmentStore.assessmentHistoryList
    } catch (error) {
    }
  }
}

function formatDate(isoDate) {
  if (!isoDate) return "-";
  return new Date(isoDate).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta"
  }).replace("pukul ", ", ");
}

const getAssessment = (id) => {
  const assessment = assessmentStore.assessmentList.find(a => a.id_assessment == id)
  return assessment ? assessment.nama_assessment : 'N/A'

}

const getSiswa = (id) => {
  const siswa = siswaStore.siswaList.find(s => s.id_siswa == id)
  return siswa ? siswa.nama : 'N/A'
}

const getGuru = (email) => {
  const guru = guruStore.guruList.find(g => g.email == email)
  return guru ? guru.id_guru : 'N/A'
}


// Filter selections
const selectedKelas = ref('')
const selectedDimensi = ref('')
const selectedElemen = ref('')
const selectedSubElemen = ref('')
const selectedCapaian = ref('')

// Computed for filter description
const filterDescription = computed(() => {
  const parts = []
  
  if (selectedDimensi.value) {
    parts.push(`Dimensi: ${getNamaDimensi(selectedDimensi.value)}`)
  }
  
  if (selectedElemen.value) {
    parts.push(`Elemen: ${getNamaElemen(selectedElemen.value)}`)
  }
  
  if (selectedSubElemen.value) {
    parts.push(`Sub Elemen: ${getNamaSubElemen(selectedSubElemen.value)}`)
  }
  
  if (selectedCapaian.value) {
    parts.push(`Capaian: ${truncateText(getNamaCapaian(selectedCapaian.value), 40)}`)
  }
  
  return parts.length > 0 ? parts.join(' • ') : 'Menampilkan semua data penilaian'
})

// Helper functions
function showSuccessToast(msg) {
  toastMessage.value = msg
  toastType.value = 'success'
  showToast.value = true
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => { showToast.value = false }, 2000)
}

function showErrorToast(msg) {
  toastMessage.value = msg
  toastType.value = 'error'
  showToast.value = true
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => { showToast.value = false }, 3000)
}

function truncateText(text, maxLength) {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// Global Search Functions
const onGlobalSearch = () => {
  if (!globalSearchQuery.value.trim()) {
    searchResults.value = []
    currentSearchIndex.value = -1
    return
  }

  const query = globalSearchQuery.value.toLowerCase().trim()
  const results = []

  // Search in all students (not just current class) but restrict for guru
  allSiswaList.value.forEach((siswa, index) => {
    if (!isAdmin.value && !allowedKelasIds.value.has(String(siswa.id_kelas))) return
    if (siswa.nama.toLowerCase().includes(query)) {
      results.push({
        siswa,
        index,
        elementId: `siswa-${siswa.id_siswa}`,
        kelas: getKelasNameById(siswa.id_kelas)
      })
    }
  })

  searchResults.value = results
  currentSearchIndex.value = results.length > 0 ? 0 : -1

  // Auto-scroll to first result if a class is selected
  if (results.length > 0 && selectedKelas.value) {
    setTimeout(() => scrollToResult(0), 100)
  }
}

const handleSearchKeydown = (event) => {
  if (!globalSearchQuery.value.trim()) return

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      scrollToNext()
      break
    case 'ArrowUp':
      event.preventDefault()
      scrollToPrevious()
      break
    case 'Escape':
      event.preventDefault()
      clearGlobalSearch()
      break
    case 'Enter':
      event.preventDefault()
      if (searchResults.value.length > 0) {
        scrollToResult(currentSearchIndex.value)
      }
      break
  }
}

const clearGlobalSearch = () => {
  globalSearchQuery.value = ''
  searchResults.value = []
  currentSearchIndex.value = -1
}

const scrollToNext = () => {
  if (currentSearchIndex.value < searchResults.value.length - 1) {
    currentSearchIndex.value++
    scrollToResult(currentSearchIndex.value)
  }
}

const scrollToPrevious = () => {
  if (currentSearchIndex.value > 0) {
    currentSearchIndex.value--
    scrollToResult(currentSearchIndex.value)
  }
}

const scrollToResult = async (index) => {
  const result = searchResults.value[index]
  if (!result) return

  // If the student is not in the current class, programmatically load that class first
  if (result.siswa.id_kelas != selectedKelas.value) {
    // Inform user
    showInfoToast(`Beralih ke kelas ${result.kelas} untuk menampilkan siswa ${result.siswa.nama}`)

    // Load class data without clearing the current global search
    try {
      // Set the selected class value so UI reflects the change
      selectedKelas.value = result.siswa.id_kelas

      // Fetch students for that class and related data
      await Promise.all([
        fetchSiswaByKelas(result.siswa.id_kelas),
        fetchAllCapaianForKelas(),
        fetchNilaiSiswa()
      ])

      // After data is available, allow a short delay for DOM render, then scroll
      await new Promise(res => setTimeout(res, 120))
    } catch (e) {
    }
  }

  // Try to locate the element again (now it should exist)
  const element = document.getElementById(result.elementId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    })

    // Add temporary highlight effect
    element.classList.add('search-highlight')
    setTimeout(() => {
      element.classList.remove('search-highlight')
    }, 2000)
  } else {
    // If element still doesn't exist, log for debugging
  }
}

const isSiswaHighlighted = (siswaId) => {
  return searchResults.value.some(result =>
    result.siswa.id_siswa === siswaId &&
    searchResults.value[currentSearchIndex.value]?.siswa.id_siswa === siswaId
  )
}

const highlightSearchText = (text) => {
  if (!globalSearchQuery.value.trim()) return text

  const query = globalSearchQuery.value.toLowerCase()
  const index = text.toLowerCase().indexOf(query)

  if (index === -1) return text

  const before = text.substring(0, index)
  const match = text.substring(index, index + query.length)
  const after = text.substring(index + query.length)

  return `${before}<mark class="bg-yellow-200 dark:bg-yellow-600 px-1 rounded">${match}</mark>${after}`
}

// Helper function to get class name by ID
const getKelasNameById = (id_kelas) => {
  const kelas = (kelasListForUser.value || []).find(k => k.id_kelas == id_kelas) || (kelasList.value || []).find(k => k.id_kelas == id_kelas)
  return kelas ? kelas.nama_kelas : 'N/A'
}

// Add info toast function
function showInfoToast(msg) {
  toastMessage.value = msg
  toastType.value = 'info'
  showToast.value = true
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => { showToast.value = false }, 4000)
}

// Computed properties
const filteredAssessmentList = computed(() => {
  const list = assessmentStore.getAssessmentList
  if (!list.length) return []

  // Apply filters
  let filtered = list
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(assessment => 
      (assessment.nama_assessment && assessment.nama_assessment.toLowerCase().includes(query))
    )
  }
  
  return filtered
})

const filteredElemenList = computed(() => {
  if (!selectedDimensi.value) return []
  return elemenList.value.filter(e => e.id_dimensi == selectedDimensi.value)
})

const filteredSubElemenList = computed(() => {
  if (!selectedElemen.value) return []
  return subElemenList.value.filter(se => se.id_elemen == selectedElemen.value)
})

const filteredDimensiList = computed(() => {
  if (!selectedKelas.value) return []
  
  let filtered = dimensiList.value

  if (selectedDimensi.value) {
    filtered = filtered.filter(d => d.id_dimensi == selectedDimensi.value)
  }
  
  return filtered
})

const isAllFilterSelected = computed(() => {
  return selectedKelas.value && selectedDimensi.value && 
         selectedElemen.value && selectedSubElemen.value && selectedCapaian.value
})

// Helper functions for fetching names
const getNamaKelas = (id) => {
  const kelas = kelasList.value.find(k => k.id_kelas == id)
  return kelas ? kelas.nama_kelas : 'N/A'
}

const getNamaDimensi = (id) => {
  const dimensi = dimensiList.value.find(d => d.id_dimensi == id)
  return dimensi ? dimensi.nama_dimensi : 'N/A'
}

const getNamaElemen = (id) => {
  const elemen = elemenList.value.find(e => e.id_elemen == id)
  return elemen ? elemen.nama_elemen : 'N/A'
}

const getNamaSubElemen = (id) => {
  const subElemen = subElemenList.value.find(se => se.id_sub_elemen == id)
  return subElemen ? subElemen.nama_sub_elemen : 'N/A'
}

const getNamaCapaian = (id) => {
  const capaian = capaianList.value.find(c => c.id_capaian == id)
  return capaian ? capaian.deskripsi : 'N/A'
}

// Functions for grade book table
const getElemenForDimensi = (id_dimensi) => {
  if (!id_dimensi) return []
  
  let filtered = elemenList.value.filter(e => e.id_dimensi == id_dimensi)
  
  if (selectedElemen.value) {
    filtered = filtered.filter(e => e.id_elemen == selectedElemen.value)
  }
  
  return filtered
}

const getCapaianForElemen = (id_elemen) => {
  if (!id_elemen || !selectedKelas.value) return [];
  
  // Get all sub-elemens for this elemen
  const relevantSubElems = getSubElemenForElemen(id_elemen);
  if (relevantSubElems.length === 0) return [];

  // capaianList already filtered by selected kelas in fetchCapaianList
  let allCapaian = [];
  relevantSubElems.forEach(se => {
    const capaianForSubElem = capaianList.value.filter(c => 
      c.id_sub_elemen == se.id_sub_elemen
    );
    allCapaian = [...allCapaian, ...capaianForSubElem];
  });
  
  // Additional filter if a specific capaian is selected
  if (selectedCapaian.value) {
    allCapaian = allCapaian.filter(c => c.id_capaian == selectedCapaian.value);
  }
  
  return allCapaian;
}

// Functions for new assessment table
const getNilaiForAssessment = (id_capaian, id_siswa, assessmentNumber) => {
  if (!assessmentValues.value[id_capaian] ||
      !assessmentValues.value[id_capaian][id_siswa] ||
      !assessmentValues.value[id_capaian][id_siswa][assessmentNumber]) {
    return null;
  }
  
  return assessmentValues.value[id_capaian][id_siswa][assessmentNumber];
}

const getModusNilai = (id_capaian, id_siswa) => {
  if (!assessmentValues.value[id_capaian] || !assessmentValues.value[id_capaian][id_siswa]) {
    return null;
  }
  
  // Get all values for this capaian and student
  const values = Object.values(assessmentValues.value[id_capaian][id_siswa]).filter(Boolean);
  
  if (values.length === 0) return null;
  
  // Convert values to numeric for proper comparison
  const numericValues = values.map(val => {
    if (typeof val === 'number') return val;
    if (val === 'MB') return 1;
    if (val === 'SB') return 2;
    if (val === 'BSH') return 3;
    if (val === 'SAB') return 4;
    if (typeof val === 'string' && !isNaN(Number(val))) {
      return Number(val);
    }
    return 0;
  });
  
  // Calculate mode (most frequent value)
  const counts = {};
  let maxCount = 0;
  
  numericValues.forEach(value => {
    counts[value] = (counts[value] || 0) + 1;
    if (counts[value] > maxCount) {
      maxCount = counts[value];
    }
  });
  
  // Find all values with the maximum count
  const modesWithMaxCount = Object.keys(counts)
    .filter(key => counts[key] === maxCount)
    .map(key => Number(key));
  
  // If there are multiple modes with the same count, take the highest value
  const finalModus = Math.max(...modesWithMaxCount);
  
  // Convert back to original format
  if (finalModus === 1) return 'MB';
  if (finalModus === 2) return 'SB';
  if (finalModus === 3) return 'BSH';
  if (finalModus === 4) return 'SAB';
  
  return finalModus;
}

const getElemenModusForSiswa = (id_elemen, id_siswa) => {
  // Get all capaian for this elemen
  const capaians = getCapaianForElemen(id_elemen);
  if (capaians.length === 0) return null;
  
  // Get mode values for each capaian
  const modeValues = capaians
    .map(capaian => getModusNilai(capaian.id_capaian, id_siswa))
    .filter(Boolean);
  
  if (modeValues.length === 0) return null;
  
  // Calculate mode of mode values
  const counts = {};
  let maxCount = 0;
  let modus = null;
  
  modeValues.forEach(value => {
    // Convert string numeric values to actual numbers
    const normalizedValue = typeof value === 'string' && !isNaN(Number(value)) 
      ? Number(value) 
      : value;
      
    counts[normalizedValue] = (counts[normalizedValue] || 0) + 1;
    if (counts[normalizedValue] > maxCount) {
      maxCount = counts[normalizedValue];
      modus = normalizedValue;
    }
  });
  
  return modus;
}

const calculateAvgForElemenAndSiswa = (id_elemen, id_siswa) => {
  const capaians = getCapaianForElemen(id_elemen);
  if (capaians.length === 0) return 0;
  
  let total = 0;
  let count = 0;
  
  capaians.forEach(capaian => {
    const modeValue = getModusNilai(capaian.id_capaian, id_siswa);
    if (modeValue) {
      let numericValue = 0;
      
      if (typeof modeValue === 'string') {
        if (modeValue === 'MB') numericValue = 1;
        else if (modeValue === 'SB') numericValue = 2;
        else if (modeValue === 'BSH') numericValue = 3;
        else if (modeValue === 'SAB') numericValue = 4;
        else numericValue = parseFloat(modeValue) || 0;
      } else {
        numericValue = modeValue || 0;
      }
      
      total += numericValue;
      count++;
    }
  });
  
  return count > 0 ? total / count : 0;
}

const getNilaiClass = (nilai) => {
  if (!nilai) return 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-400'
  
  switch (nilai) {
    case '1':
    case 1:
    case 'MB':
      return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'
    case '2':
    case 2:
    case 'SB':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'
    case '3':
    case 3:
    case 'BSH':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
    case '4':
    case 4:
    case 'SAB':
      return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
    default:
      return 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
  }
}

// Edit assessment value function
const editNilai = (capaian, siswa, assessmentNumber) => {
  currentEditingAssessment.value = {
    capaian,
    siswa,
    assessmentNumber
  };
  
  // Create new assessment for this specific cell
  selectedAssessment.value = {
    nama_assessment: `Assessment ${assessmentNumber} - ${capaian.deskripsi.substring(0, 30)}...`,
    id_kelas: selectedKelas.value,
    id_dimensi: getElemenForCapaian(capaian).id_dimensi,
    id_elemen: getSubElemenForCapaian(capaian).id_elemen,
    id_sub_elemen: capaian.id_sub_elemen,
    id_capaian: capaian.id_capaian,
    nilai: {
      [siswa.id_siswa]: getNilaiForAssessment(capaian.id_capaian, siswa.id_siswa, assessmentNumber) || ''
    },
    assessmentNumber
  };
  
  isEditMode.value = false;
  showModal.value = true;
}

// Change this function name to match what's used in the template
const getSubElemenForCapaian = (capaian) => {
  if (!capaian || capaian.id_sub_elemen === undefined) return {};
  return subElemenList.value.find(se => se.id_sub_elemen == capaian.id_sub_elemen) || {};
}

// Also rename this function for consistency
const getElemenForCapaian = (capaian) => {
  if (!capaian || capaian.id_sub_elemen === undefined) return {};
  
  const subElement = subElemenList.value.find(se => se.id_sub_elemen == capaian.id_sub_elemen);
  if (!subElement || !subElement.id_elemen) return {};
  
  const element = elemenList.value.find(e => e.id_elemen == subElement.id_elemen);
  return element || {};
}

// Add these functions to support the hierarchy display

// Get Sub Elemen for an Elemen
const getSubElemenForElemen = (id_elemen) => {
  if (!id_elemen) return [];
  return subElemenList.value.filter(se => se.id_elemen == id_elemen);
}

// Get Capaian for a Sub Elemen (respect selectedCapaian when set)
const getCapaianForSubElemen = (id_sub_elemen) => {
  if (!id_sub_elemen || !selectedKelas.value) return []
  let list = capaianList.value.filter(c => c.id_sub_elemen == id_sub_elemen)
  if (selectedCapaian.value) {
    const sel = String(selectedCapaian.value)
    list = list.filter(c => String(c.id_capaian) === sel || String(c.id_ck) === sel)
  }
  return list
}

// Fetch data functions
const fetchKelasList = async () => {
  try {
    await kelasStore.fetchKelasList()
    // HAPUS: kelasList.value = kelasStore.getKelasList || []
  } catch (error) {
  }
}

const fetchDimensiList = async () => {
  try {
    await dimensiStore.fetchDimensiList()
    dimensiList.value = dimensiStore.getDimensiList || []
  } catch (error) {
  }
}

const fetchElemenList = async () => {
  try {
    await elemenStore.fetchElemenList()
    elemenList.value = elemenStore.getElemenList || []
  } catch (error) {
  }
}

const fetchSubElemenList = async () => {
  try {
    await subElemenStore.fetchSubElemenList()
    subElemenList.value = subElemenStore.getSubElemenList || []
  } catch (error) {
  }
}

const fetchCapaianList = async (id_fase, id_sub_elemen) => {
  try {
    const res = await axios.get('/list/capaian_kelas')
    if (res.data.success) {
      let list = res.data.data || []
      if (selectedKelas.value) list = list.filter(x => x.id_kelas == selectedKelas.value)
      if (id_sub_elemen) list = list.filter(x => x.id_sub_elemen == id_sub_elemen)
      // Map capaian to capaian_kelas contract used by backend (ck.id is the key)
      capaianList.value = list.map(x => ({
        // preserve existing field name for template usage but hold ck id
        id_capaian: x.id_capaian ?? x.id, // legacy fallback
        deskripsi: x.nama_ck || `Capaian ${x.kode_ck || x.id}`,
        id_sub_elemen: x.id_sub_elemen,
        id_ck: x.id
      }))
    } else {
      capaianList.value = []
    }
  } catch (error) {
    capaianList.value = []
  }
}

const fetchSiswaByKelas = async (id_kelas) => {
  try {
    const response = await axios.get(`/list/siswa?id_kelas=${id_kelas}`)
    if (response.data.success) {
      siswaList.value = response.data.data.filter(siswa => siswa.id_kelas == id_kelas) || []
    } else {
      siswaList.value = []
    }
  } catch (error) {
    siswaList.value = []
  }
}

// Fetch all students for global search
const fetchAllSiswa = async () => {
  try {
    const siswaStore = useSiswaStore()
    await siswaStore.fetchSiswaList()
    allSiswaList.value = siswaStore.getSiswaList || []
  } catch (error) {
    allSiswaList.value = []
  }
}

const fetchNilaiSiswa = async () => {
  // Clear existing data first
  nilaiSiswa.value = {};
  assessmentValues.value = {};
  
  if (!selectedKelas.value) return;
  
  try {
    
    // Step 1: Fetch all assessments
    const responseAssessments = await axios.get(`/list/assessment`);
    
    if (!responseAssessments.data.success) {
      return;
    }
    
    const allAssessments = responseAssessments.data.data || [];
    
    // Step 1.5: Fetch capaian_kelas map for current kelas to translate id_capaian_kelas -> id_capaian
    const resCk = await axios.get('/list/capaian_kelas');
    const ckList = (resCk.data?.success ? resCk.data.data : [])
      .filter(ck => ck.id_kelas == selectedKelas.value);
    // Map ck.id directly for translation later
    const ckIdSet = new Set(ckList.map(ck => ck.id));

    // Step 2: Fetch all nilai
    const responseNilai = await axios.get(`/list/nilai`);
    
    if (!responseNilai.data.success) {
      return;
    }
    
    const allNilai = responseNilai.data.data || [];
    
    // Step 3: Get current class students
    const currentStudents = siswaList.value.map(s => s.id_siswa);
    
    // Step 4: Create assessment list with nilai data (similar to laporan logic)
    const assessmentList = allAssessments.map(assessment => {
      const nilaiForAssessment = allNilai.filter(nilai =>
        nilai.id_assessment === assessment.id_assessment &&
        currentStudents.includes(nilai.id_siswa)
      );
      
      const nilai = {};
      nilaiForAssessment.forEach(n => {
        nilai[n.id_siswa] = n.nilai;
      });
      
      return {
        ...assessment,
        nilai: nilai
      };
    });
    
    // Step 5: Process each capaian to get assessment values
    // Translate assessment.id_capaian_kelas -> id_capaian using ck map
    // Use capaian_kelas ids directly (ck.id)
    const capaianIds = [...new Set(assessmentList
      .map(a => a.id_capaian_kelas)
      .filter(id => id && ckIdSet.has(id))
    )];
    
    capaianIds.forEach(id_capaian => {
      // Get all assessments for this capaian that have nilai data
      const assessmentsForCapaian = assessmentList.filter(a => 
        a.id_capaian_kelas == id_capaian && a.nilai && Object.keys(a.nilai).length > 0
      );
      
      // Sort by creation date or ID to maintain order
      assessmentsForCapaian.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
      
      
      // Initialize structure for this capaian
      if (!assessmentValues.value[id_capaian]) {
        assessmentValues.value[id_capaian] = {};
      }
      
      // Process each student for this capaian
      currentStudents.forEach(id_siswa => {
        const studentAssessments = assessmentsForCapaian.filter(a =>
          a.nilai[id_siswa] !== undefined &&
          a.nilai[id_siswa] !== null &&
          a.nilai[id_siswa] !== ''
        );
        
        if (studentAssessments.length > 0) {
          if (!assessmentValues.value[id_capaian][id_siswa]) {
            assessmentValues.value[id_capaian][id_siswa] = {};
          }
          
          // Store up to 6 assessment values
          studentAssessments.slice(0, 6).forEach((assessment, index) => {
            const assessmentNumber = index + 1; // 1-based numbering
            assessmentValues.value[id_capaian][id_siswa][assessmentNumber] = assessment.nilai[id_siswa];
          });
        }
      });
    });
    
    
    // Also maintain the existing nilaiSiswa structure for backward compatibility
    Object.keys(assessmentValues.value).forEach(id_ck => {
      nilaiSiswa.value[id_ck] = {};
      
      Object.keys(assessmentValues.value[id_ck]).forEach(id_siswa => {
        // Use the mode value as the representative value
        nilaiSiswa.value[id_ck][id_siswa] = getModusNilai(id_ck, id_siswa);
      });
    });
    
  } catch (error) {
    nilaiSiswa.value = {}; // Reset on error
    assessmentValues.value = {};
  }
}

// Get id_fase from kelas name
function getIdFaseFromKelas(namaKelas) {
  if (/\bI\b|\bII\b|\bIII\b|\bIV\b|\bV\b|\bVI\b|\bVII\b|\bVIII\b|\bIX\b|\bX\b|\bXI\b|\bXII\b/i.test(namaKelas)) {
    if (/\bI\b/i.test(namaKelas)) return 2; // Fase A (Kelas 1)
    if (/\bII\b/i.test(namaKelas)) return 2; // Fase A (Kelas 2)
    if (/\bIII\b/i.test(namaKelas)) return 3; // Fase B (Kelas 3)
    if (/\bIV\b/i.test(namaKelas)) return 3; // Fase B (Kelas 4)
    if (/\bV\b/i.test(namaKelas)) return 4; // Fase C (Kelas 5)
    if (/\bVI\b/i.test(namaKelas)) return 4; // Fase C (Kelas 6)
    if (/\bVII\b/i.test(namaKelas)) return 5; // Fase D (Kelas 7)
    if (/\bVIII\b/i.test(namaKelas)) return 5; // Fase D (Kelas 8)
    if (/\bIX\b/i.test(namaKelas)) return 5; // Fase D (Kelas 9)
    if (/\bX\b/i.test(namaKelas)) return 6; // Fase E (Kelas 10)
    if (/\bXI\b/i.test(namaKelas)) return 7; // Fase F (Kelas 11)
    if (/\bXII\b/i.test(namaKelas)) return 7; // Fase F (Kelas 12)
  }
  return null;
}

const fetchAllCapaianForKelas = async () => {
  if (!selectedKelas.value) return;
  const kelas = kelasList.value.find(k => k.id_kelas == selectedKelas.value);
  if (!kelas) return;
  const id_fase = getIdFaseFromKelas(kelas.nama_kelas);
  if (!id_fase) return;
  try {
    await fetchCapaianList(id_fase, selectedSubElemen.value)
  } catch (error) {
;
    capaianList.value = [];
  }
}

const fetchData = async () => {
  loading.value = true
  try {
    await Promise.all([
      siswaStore.fetchSiswaList(),
      guruStore.fetchGuruList(),
  // resolve current guru from token (best-effort)
  guruStore.fetchCurrentGuruFromToken().catch(() => {}),
      assessmentStore.fetchAssessmentList(),
  // load pengampu list once for id_pengampu resolution
  axios.get('/list/pengampu').then(res => { if (res.data?.success) pengampuList.value = res.data.data || [] }),
      fetchKelasList(),
      fetchDimensiList(),
      fetchElemenList(),
      fetchSubElemenList(),
      fetchAllSiswa() // Fetch all students for global search
    ])
  } catch (error) {
  } finally {
    loading.value = false
  }
}

// Filter change handlers
const onKelasChange = async () => {
  // Reset dependent filters
  selectedDimensi.value = ''
  selectedElemen.value = ''
  selectedSubElemen.value = ''
  selectedCapaian.value = ''

  // Clear search when changing class
  clearGlobalSearch()

  // Access guard for guru: only allowed classes
  if (!isAdmin.value && selectedKelas.value && !allowedKelasIds.value.has(String(selectedKelas.value))) {
    const nama = getNamaKelas(selectedKelas.value)
    showInfoToast(`Anda bukan pengampu kelas ${nama || selectedKelas.value}. Pilih kelas yang Anda ampu.`)
    selectedKelas.value = ''
    return
  }

  if (selectedKelas.value) {
    await Promise.all([
      fetchSiswaByKelas(selectedKelas.value),
      fetchAllCapaianForKelas(),
      fetchNilaiSiswa()
    ])
  }
}

const onDimensiChange = () => {
  // Reset dependent filters
  selectedElemen.value = ''
  selectedSubElemen.value = ''
  selectedCapaian.value = ''
}

const onElemenChange = () => {
  // Reset dependent filters
  selectedSubElemen.value = ''
  selectedCapaian.value = ''
}

const onSubElemenChange = async () => {
  // Reset capaian
  selectedCapaian.value = '';
  
  if (selectedSubElemen.value && selectedKelas.value) {
    const kelas = kelasList.value.find(k => k.id_kelas == selectedKelas.value);
    if (kelas) {
      const id_fase = getIdFaseFromKelas(kelas.nama_kelas);
      if (id_fase) {
        try {
          await fetchCapaianList(id_fase, selectedSubElemen.value)
        } catch (error) {
;
          capaianList.value = [];
        }
      } else {
        capaianList.value = [];
      }
    }
  }
}

const onCapaianChange = () => {
  // Any additional logic when capaian is selected
}

const resetFilters = () => {
  selectedKelas.value = ''
  selectedDimensi.value = ''
  selectedElemen.value = ''
  selectedSubElemen.value = ''
  selectedCapaian.value = ''
}

// Modal methods
const openCreateModal = () => {
  if (isAllFilterSelected.value) {
    selectedAssessment.value = {
      nama_assessment: '',
      id_kelas: selectedKelas.value,
      id_dimensi: selectedDimensi.value,
      id_elemen: selectedElemen.value,
      id_sub_elemen: selectedSubElemen.value,
      id_capaian: selectedCapaian.value,
      nilai: {}
    }
  } else {
    selectedAssessment.value = {
      nama_assessment: '',
      id_kelas: '',
      id_dimensi: '',
      id_elemen: '',
      id_sub_elemen: '',
      id_capaian: '',
      nilai: {}
    }
  }
  
  isEditMode.value = false
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  currentEditingAssessment.value = {
    capaian: null,
    siswa: null,
    assessmentNumber: null
  }
}

const editAssessment = (assessment) => {
  selectedAssessment.value = { ...assessment }
  isEditMode.value = true
  showModal.value = true
}

const deleteAssessment = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus assessment ini?')) return
  
  try {
    loading.value = true
    await assessmentStore.deleteAssessment(id)
    showSuccessToast('Assessment berhasil dihapus')
  } catch (error) {
    showErrorToast('Gagal menghapus assessment: ' + (error.message || 'Unknown error'))
  } finally {
    loading.value = false
  }
}

const saveAssessment = async (formData) => {
  try {
    loading.value = true
    
    // If we're editing a specific cell, update the assessmentNumber
    if (currentEditingAssessment.value.capaian) {
      formData.assessmentNumber = currentEditingAssessment.value.assessmentNumber;
    }
    
  let id_assessment = null; // Initialize id_assessment

    if (isEditMode.value) {
      await assessmentStore.updateAssessment(selectedAssessment.value.id_assessment, formData)
      id_assessment = selectedAssessment.value.id_assessment
      showSuccessToast('Assessment berhasil diperbarui')
    } else {
      // Prepare assessment data with proper validation
      // Resolve id_capaian_kelas (ck) based on selected kelas + sub elemen + id_capaian
      const id_kelas = selectedKelas.value || formData.id_kelas
      const id_sub_elemen = selectedSubElemen.value || formData.id_sub_elemen
      const id_capaian = parseInt(formData.id_capaian)

      if (!id_kelas || !id_sub_elemen || !id_capaian) {
        throw new Error('Kelas, Sub Elemen, dan Capaian wajib dipilih')
      }

      // Try resolve CK locally from current capaianList first (fast path)
      let targetCkId = null
      const localMatch = capaianList.value.find(c =>
        c.id_capaian == id_capaian && c.id_sub_elemen == id_sub_elemen && c.id_ck
      )
      if (localMatch) {
        targetCkId = localMatch.id_ck
      } else {
        // Fallback 1: Try filter endpoint (if available)
        let ckRows = []
        try {
          const ckRes = await axios.get(`/filter/capaian_kelas/${id_sub_elemen}/${id_kelas}`)
          if (ckRes.data?.success) ckRows = ckRes.data.data || []
        } catch (e) {
          // Ignore and proceed to final fallback
        }

        if (!ckRows.length) {
          // Fallback 2: Use list endpoint and filter client-side
          const listRes = await axios.get('/list/capaian_kelas')
          if (!listRes.data?.success) {
            throw new Error('Gagal mengambil data capaian_kelas')
          }
          ckRows = (listRes.data.data || []).filter(r => r.id_kelas == id_kelas && r.id_sub_elemen == id_sub_elemen)
        }

        // pick the first ck row for this kelas+sub_elemen if multiple
        const found = ckRows.find(r => true)
        if (!found) {
          throw new Error('Capaian terpilih tidak terdaftar pada kelas/sub elemen ini')
        }
        targetCkId = found.id
      }

      const assessmentPayload = {
        id_capaian_kelas: targetCkId,
        nama_assessment: formData.nama_assessment || `Assessment ${Date.now()}`,
        deskripsi: formData.deskripsi || 'Assessment otomatis',
        bobot: parseInt(formData.bobot) || 20
      };


      // Use correct endpoint
      const res = await axios.post('/add/assessment', assessmentPayload);
      
      if (!res.data.success) {
        throw new Error(res.data.message || 'Gagal membuat assessment');
      }
      
      id_assessment = res.data.id;
      showSuccessToast('Assessment baru berhasil dibuat');
    }

    // Resolve id_pengampu: map current guru + selected kelas to pengampu.id_pengampu
    // Prefer guruStore.currentGuru if available, else fallback by email, else attempt to create mapping
    let currentGuruId = guruStore.getCurrentGuruId
    try {
      if (!currentGuruId) {
        await guruStore.fetchCurrentGuruFromToken()
        currentGuruId = guruStore.getCurrentGuruId
      }
    } catch (e) {
      // ignore, fallback next
    }

    if (!currentGuruId) {
      const email = authStore.getUser?.email
      const found = guruStore.getGuruList.find(g => String(g.email || '').toLowerCase() === String(email || '').toLowerCase())
      currentGuruId = found?.id_guru || null
    }

    const kelasIdForMapping = selectedKelas.value || formData.id_kelas

    let id_pengampu_resolved = null
    if (currentGuruId && kelasIdForMapping) {
      const match = pengampuList.value.find(p => p.id_guru == currentGuruId && p.id_kelas == kelasIdForMapping)
      id_pengampu_resolved = match?.id_pengampu || null
    }

    // Helper to derive tahun ajaran when creating a mapping
    const deriveTahunAjaran = () => {
      const kelasObj = kelasList.value?.find?.(k => k.id_kelas == kelasIdForMapping)
      if (kelasObj?.tahun_ajaran) return kelasObj.tahun_ajaran
      const now = new Date()
      const year = now.getFullYear()
      const startYear = now.getMonth() + 1 >= 7 ? year : year - 1
      return `${startYear}/${startYear + 1}`
    }

    // If pengampu mapping not found
    if (!id_pengampu_resolved) {
      // Guru cannot auto-create mapping; block the operation
      if (!isAdmin.value) {
        throw new Error('Anda bukan pengampu kelas ini. Hubungi admin untuk menambahkan pengampu.')
      }
      // Admin may auto-create mapping
      if (!currentGuruId || !kelasIdForMapping) {
        throw new Error('Pengampu untuk guru/kelas ini tidak valid. (guru/kelas tidak ditemukan)')
      }
      try {
        const payloadPengampu = {
          id_guru: Number(currentGuruId),
          id_kelas: Number(kelasIdForMapping),
          tahun_ajaran: deriveTahunAjaran()
        }
        const resPeng = await axios.post('/add/pengampu', payloadPengampu)
        if (resPeng?.data?.success && resPeng?.data?.id) {
          id_pengampu_resolved = resPeng.data.id
          // Update local cache for future resolutions
          pengampuList.value = [
            ...pengampuList.value,
            { id_pengampu: id_pengampu_resolved, ...payloadPengampu }
          ]
        } else {
          throw new Error(resPeng?.data?.message || 'Gagal membuat mapping pengampu')
        }
      } catch (e) {
        throw new Error(`Otomatis membuat mapping pengampu gagal: ${e.message || e}`)
      }
    }

  // Process nilai submission with better error handling
    if (id_assessment && formData.nilai) {
      const nilaiPromises = [];
      
  for (const [id_siswa, nilai] of Object.entries(formData.nilai)) {
        if (nilai && nilai.trim() !== '') {
          const nilaiPayload = {
            id_siswa: parseInt(id_siswa),
    id_pengampu: id_pengampu_resolved,
            id_assessment: parseInt(id_assessment),
            nilai: nilai.toString(),
            tanggal_input: new Date().toISOString().slice(0, 10)
          };
          
          
          // Fix: Use correct endpoint that matches backend
          nilaiPromises.push(
            axios.post('/add/nilai', nilaiPayload)
              .catch(err => {
                throw new Error(`Gagal menyimpan nilai untuk siswa ${id_siswa}: ${err.response?.data?.message || err.message}`);
              })
          );
        }
      }
      
      // Execute all nilai submissions in parallel
      if (nilaiPromises.length > 0) {
        try {
          await Promise.all(nilaiPromises);
        } catch (error) {
          throw error;
        }
      }
    }
    
    closeModal()
    await fetchData()
    // Also refresh nilai data if we're looking at a class
    if (selectedKelas.value) {
      await fetchNilaiSiswa()
    }
  } catch (error) {
    
    let errorMessage = 'Gagal menyimpan assessment';
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;
      
      switch (status) {
        case 401:
          errorMessage = 'Sesi login telah berakhir. Silakan login kembali.';
          break;
        case 403:
          errorMessage = 'Anda tidak memiliki izin untuk melakukan operasi ini.';
          break;
        case 400:
          errorMessage = `Data tidak valid: ${data.message || 'Periksa kembali input Anda'}`;
          break;
        case 500:
          errorMessage = 'Terjadi kesalahan server. Silakan coba lagi nanti.';
          break;
        default:
          errorMessage = data.message || `Error ${status}: ${error.message}`;
      }
    } else if (error.request) {
      // Network error
      errorMessage = 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.';
    } else {
      // Other error
      errorMessage = error.message || 'Terjadi kesalahan tidak terduga';
    }
    
    showErrorToast(errorMessage);
  } finally {
    loading.value = false
  }
}

// Add this helper function to check if there are any actual values
const hasAnyValues = (id_capaian) => {
  if (!nilaiSiswa.value[id_capaian]) return false;
  
  const values = Object.values(nilaiSiswa.value[id_capaian]);
  return values.some(v => v !== null && v !== undefined && v !== '');
};

// Initialize data on component mount
onMounted(async () => {
  await fetchData();

  // Add keyboard navigation for search
  const handleKeydown = (event) => {
    if (!globalSearchQuery.value || searchResults.value.length === 0) return;

    if (event.key === 'ArrowDown' || (event.key === 'Enter' && event.shiftKey)) {
      event.preventDefault();
      scrollToNext();
    } else if (event.key === 'ArrowUp' || (event.key === 'Enter' && event.ctrlKey)) {
      event.preventDefault();
      scrollToPrevious();
    } else if (event.key === 'Escape') {
      clearGlobalSearch();
    }
  };

  document.addEventListener('keydown', handleKeydown);

  // Cleanup on unmount
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
  });
});

// Add to the script section with other helper functions
const getElemenLetter = (index) => {
  return String.fromCharCode(65 + index); // A, B, C, ...
}

// Update or add to your script section
const getSiswaStatus = (avgValue) => {
  if (avgValue >= 3) return "Tuntas";
  return "Belum Tuntas";
}

const getSiswaStatusClass = (avgValue) => {
  if (avgValue >= 3) {
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded-lg text-xs font-medium";
  }
  return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-1 rounded-lg text-xs font-medium";
}
</script>

<style scoped>
/* Search highlight animation */
.search-highlight {
  animation: searchHighlight 2s ease-in-out;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  border-radius: 8px;
}

@keyframes searchHighlight {
  0% {
    background-color: rgba(59, 130, 246, 0.1);
  }
  50% {
    background-color: rgba(59, 130, 246, 0.3);
  }
  100% {
    background-color: transparent;
  }
}

/* Info toast styling */
.toast-info {
  background-color: rgba(59, 130, 246, 0.9);
  color: white;
}
</style>
