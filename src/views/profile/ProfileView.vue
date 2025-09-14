<template>
  <div class="min-h-screen bg-background dark:bg-dark-background py-6 sm:py-10">
    <!-- Loading skeleton: full page -->
    <div v-if="isLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left skeleton -->
        <div class="rounded-2xl bg-white dark:bg-dark-surface shadow-sm ring-1 ring-gray-200 dark:ring-dark-border p-6 animate-pulse">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
          </div>
          <div class="mt-6 space-y-3">
            <div class="h-10 bg-gray-100 dark:bg-gray-800 rounded"></div>
            <div class="h-10 bg-gray-100 dark:bg-gray-800 rounded"></div>
            <div class="h-10 bg-gray-100 dark:bg-gray-800 rounded"></div>
          </div>
        </div>
        <!-- Right skeleton -->
        <div class="lg:col-span-2 rounded-2xl bg-white dark:bg-dark-surface shadow-sm ring-1 ring-gray-200 dark:ring-dark-border p-6">
          <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
          <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="h-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
            <div class="h-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
            <div class="h-20 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
          </div>
          <div class="mt-6 space-y-3">
            <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
            <div class="h-32 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3" role="alert">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
          <div>
            <strong class="font-semibold">Terjadi kesalahan</strong>
            <div class="text-sm">{{ error }}</div>
            <div class="mt-3 flex gap-2">
              <button @click="fetchGuruData" class="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 0119 5"/></svg>
                Coba Lagi
              </button>
              <button @click="reloadPage" class="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-sm">Muat Ulang</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div v-else-if="userProfile" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left column: Profile card -->
        <aside class="lg:col-span-1">
          <div class="rounded-2xl bg-white dark:bg-dark-surface shadow-sm ring-1 ring-gray-200 dark:ring-dark-border overflow-hidden">
            <div class="p-6">
              <!-- Header Profile -->
              <div class="flex items-start gap-4">
                <div class="relative">
                  <div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xl font-semibold select-none ring-2 ring-white/80 dark:ring-dark-surface">
                    <img v-if="avatarUrl" :src="avatarUrl" alt="avatar" class="w-16 h-16 rounded-full object-cover" />
                    <span v-else>{{ userInitials }}</span>
                  </div>
                  <!-- online dot (decorative) -->
                  <span class="absolute -bottom-0 -right-0 w-3.5 h-3.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-dark-surface"></span>
                </div>
                <div class="flex-1 min-w-0">
                  <h1 class="text-lg sm:text-xl font-semibold leading-snug text-gray-900 dark:text-dark-text truncate">{{ userProfile.nama || 'Pengguna' }}</h1>
                  <div class="mt-1 flex items-center gap-2 min-w-0">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                      {{ getRoleName(userProfile.id_role) }}
                    </span>
                    <span v-if="userProfile.id_sekolah" class="text-xs text-gray-500 dark:text-dark-text-secondary truncate">• {{ getSchoolName(userProfile.id_sekolah) }}</span>
                  </div>
                </div>
                <!-- Edit button -->
                <button v-if="!isEditing" @click="toggleEdit" class="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm shrink-0 self-start">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5h2m4 0h.01M4 7h16M4 12h16M4 17h10"/></svg>
                  Edit
                </button>
              </div>

              <!-- Contact and basics -->
              <div class="mt-5 space-y-2.5">
                <div class="flex items-center gap-3 text-sm text-gray-700 dark:text-dark-text-secondary">
                  <svg class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12A4 4 0 118 12a4 4 0 018 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14v7m-4-4h8"/></svg>
                  <span>{{ userProfile.nip || 'NIP belum diisi' }}</span>
                </div>
                <div class="flex items-center gap-3 text-sm text-gray-700 dark:text-dark-text-secondary">
                  <svg class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12A4 4 0 118 12a4 4 0 018 0z"/></svg>
                  <span>{{ userProfile.email || 'Email belum diisi' }}</span>
                </div>
              </div>

              <!-- Edit fields (compact) -->
              <div v-if="isEditing" class="mt-6 space-y-4">
                <div>
                  <label class="block text-xs font-medium text-gray-600 dark:text-dark-text-secondary mb-1">Nama Lengkap</label>
                  <input v-model="editableProfile.nama" type="text" class="block w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text" />
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 dark:text-dark-text-secondary mb-1">Role</label>
                  <select v-model="editableProfile.id_role" class="block w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text">
                    <option disabled value="">Pilih Role</option>
                    <option v-for="r in roleList" :key="r.id_role" :value="r.id_role">{{ r.nama_role }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 dark:text-dark-text-secondary mb-1">Sekolah</label>
                  <select v-model="editableProfile.id_sekolah" class="block w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text">
                    <option disabled value="">Pilih Sekolah</option>
                    <option v-for="s in sekolahList" :key="s.id_sekolah" :value="s.id_sekolah">{{ s.nama_sekolah }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 dark:text-dark-text-secondary mb-1">NIP</label>
                  <input v-model="editableProfile.nip" type="text" class="block w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text" />
                </div>
                <div class="flex gap-2 pt-1">
                  <button @click="saveProfile" :disabled="isSaving" class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-sm">
                    <svg v-if="!isSaving" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    <svg v-else class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="4" class="opacity-25"/><path d="M4 12a8 8 0 018-8" stroke-width="4" class="opacity-75"/></svg>
                    Simpan
                  </button>
                  <button @click="toggleEdit" :disabled="isSaving" class="inline-flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-sm">Batal</button>
                </div>
              </div>
            </div>

            <!-- Quick stats -->
            <div class="px-6 pb-6 pt-0">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="rounded-xl border border-gray-200 dark:border-dark-border p-4 bg-gray-50 dark:bg-gray-800/50 h-24">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-xs text-gray-500 dark:text-dark-text-secondary">Jumlah Kelas</div>
                      <div class="mt-1 text-2xl font-semibold leading-tight text-gray-900 dark:text-dark-text">{{ jumlahKelas }}</div>
                    </div>
                    <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 flex items-center justify-center">
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                    </div>
                  </div>
                </div>
                <div class="rounded-xl border border-gray-200 dark:border-dark-border p-4 bg-gray-50 dark:bg-gray-800/50 h-24">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-xs text-gray-500 dark:text-dark-text-secondary">Jumlah Siswa</div>
                      <div class="mt-1 text-2xl font-semibold leading-tight text-gray-900 dark:text-dark-text">{{ jumlahSiswa }}</div>
                    </div>
                    <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 flex items-center justify-center">
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5V4H2v16h5m10 0v-6a2 2 0 10-4 0v6m4 0H9"/></svg>
                    </div>
                  </div>
                </div>
                <div class="rounded-xl border border-gray-200 dark:border-dark-border p-4 bg-gray-50 dark:bg-gray-800/50 h-24">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="text-xs text-gray-500 dark:text-dark-text-secondary">Assessment</div>
                      <div class="mt-1 text-2xl font-semibold leading-tight text-gray-900 dark:text-dark-text">{{ jumlahAssessment }}</div>
                    </div>
                    <div class="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-900/40 dark:text-sky-300 flex items-center justify-center">
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6M9 8h6M5 6h14v12H5z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Right column: Tabs & details -->
        <section class="lg:col-span-2">
          <div class="rounded-2xl bg-white dark:bg-dark-surface shadow-sm ring-1 ring-gray-200 dark:ring-dark-border overflow-hidden">
            <!-- Tabs -->
            <div class="px-4 sm:px-6 pt-4">
              <nav class="inline-flex items-center bg-gray-50 dark:bg-gray-800/40 rounded-xl p-1 gap-1">
                <button 
                  v-for="tab in tabs" 
                  :key="tab"
                  @click="activeTab = tab"
                  class="h-9 px-4 rounded-full text-sm font-medium transition-colors"
                  :class="activeTab === tab 
                    ? 'bg-white dark:bg-dark-surface text-blue-600 shadow ring-1 ring-blue-200/60 dark:ring-blue-900/30' 
                    : 'text-gray-600 dark:text-dark-text-secondary hover:bg-white/60 dark:hover:bg-gray-700'">
                  {{ tab }}
                </button>
              </nav>
            </div>

            <!-- Tab content -->
            <div class="p-4 sm:p-6">
              <!-- Informasi -->
              <div v-if="activeTab === 'Informasi'" class="space-y-6">
              <!-- Header info -->
              <div class="rounded-xl border border-gray-200 dark:border-dark-border p-4 bg-gray-50 dark:bg-gray-800/40">
                <h2 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-dark-text">Informasi Utama</h2>
              </div>
              <div class="grid grid-cols-1 gap-4">
                <div class="rounded-xl border border-gray-200 dark:border-dark-border p-4">
                <div class="text-xs text-gray-500 dark:text-dark-text-secondary">NIP/ID</div>
                <div class="mt-1 text-sm font-medium text-gray-900 dark:text-dark-text">{{ userProfile.nip || 'Belum diisi' }}</div>
                </div>
                <div class="rounded-xl border border-gray-200 dark:border-dark-border p-4">
                <div class="text-xs text-gray-500 dark:text-dark-text-secondary">Email</div>
                <div class="mt-1 text-sm font-medium text-gray-900 dark:text-dark-text">{{ userProfile.email || 'Belum diisi' }}</div>
                </div>
                <div class="rounded-xl border border-gray-200 dark:border-dark-border p-4">
                <div class="text-xs text-gray-500 dark:text-dark-text-secondary">Sekolah</div>
                <div class="mt-1 text-sm font-medium text-gray-900 dark:text-dark-text">{{ getSchoolName(userProfile.id_sekolah) }}</div>
                </div>
              </div>
              </div>

              <!-- Kelas -->
              <div v-else-if="activeTab === 'Kelas'" class="space-y-6">
                <div class="grid grid-cols-1 gap-6">
                  <!-- Kelas diampu -->
                  <div class="rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
                    <div class="px-4 py-3 bg-gray-50 dark:bg-gray-800/40 flex items-center justify-between">
                      <h3 class="text-sm font-semibold text-gray-900 dark:text-dark-text">Kelas yang Diampu</h3>
                      <span class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ pengampuForGuru.length }} kelas</span>
                    </div>
                    <div class="p-4">
                      <div v-if="pengampuForGuru.length === 0" class="text-sm text-gray-500 dark:text-dark-text-secondary">Belum ada data pengampu.</div>
                      <ul v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <li v-for="p in pengampuForGuru" :key="p.id_pengampu" class="rounded-lg border border-gray-200 dark:border-dark-border p-3">
                          <div class="flex items-center gap-3">
                            <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
                            </span>
                            <div>
                              <div class="text-sm font-medium text-gray-900 dark:text-dark-text">{{ p.nama_kelas }}</div>
                              <div class="text-xs text-gray-500 dark:text-dark-text-secondary">ID: {{ p.id_kelas }}</div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- Siswa diajar -->
                  <div class="rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden">
                    <div class="px-4 py-3 bg-gray-50 dark:bg-gray-800/40">
                      <h3 class="text-sm font-semibold text-gray-900 dark:text-dark-text">Siswa yang Diajar</h3>
                    </div>
                    <div class="p-0">
                      <div v-if="siswaForGuru.length === 0" class="p-4 text-sm text-gray-500 dark:text-dark-text-secondary">Belum ada siswa yang terdata.</div>
                      <div v-else class="max-h-72 overflow-auto">
                        <table class="min-w-full text-sm">
                          <thead class="bg-gray-100 dark:bg-gray-800/60 text-gray-700 dark:text-dark-text sticky top-0 z-10">
                            <tr>
                              <th class="text-left px-4 py-2.5 font-semibold">Nama Siswa</th>
                              <th class="text-left px-4 py-2.5 font-semibold">Kelas</th>
                              <th class="text-left px-4 py-2.5 font-semibold">NISN</th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-gray-100 dark:divide-dark-border">
                            <tr 
                              v-for="s in siswaForGuru" 
                              :key="s.id_siswa" 
                              class="odd:bg-white even:bg-gray-50 dark:odd:bg-transparent dark:even:bg-gray-800/40">
                              <td class="px-4 py-2.5 text-gray-800 dark:text-dark-text">{{ s.nama }}</td>
                              <td class="px-4 py-2.5 text-gray-600 dark:text-dark-text-secondary">{{ s.nama_kelas }}</td>
                              <td class="px-4 py-2.5 text-gray-600 dark:text-dark-text-secondary">{{ s.nisn || '-' }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Aktivitas -->
              <div v-else-if="activeTab === 'Aktivitas'" class="space-y-4">
                <div class="rounded-xl border border-gray-200 dark:border-dark-border p-4 bg-gray-50 dark:bg-gray-800/40">
                  <h3 class="text-sm font-semibold text-gray-900 dark:text-dark-text">Aktivitas Terbaru (Assessment)</h3>
                  <p class="text-xs text-gray-500 dark:text-dark-text-secondary">{{ assessmentListForGuru.length }} item</p>
                </div>
                <div v-if="assessmentListForGuru.length === 0" class="text-sm text-gray-500 dark:text-dark-text-secondary">Belum ada aktivitas.</div>
                <ul v-else class="space-y-2.5">
                  <li
                    v-for="a in assessmentListForGuru"
                    :key="a.id_assessment || a.id || a.nama_assessment"
                    class="rounded-lg border border-gray-200 dark:border-dark-border p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <div class="flex items-start justify-between gap-4">
                      <div class="min-w-0">
                        <div class="flex items-center gap-2">
                          <span class="inline-flex items-center justify-center w-6 h-6 rounded-md bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6M9 8h6M5 6h14v12H5z"/></svg>
                          </span>
                          <div class="text-sm font-medium text-gray-900 dark:text-dark-text truncate" :title="a.nama_assessment || a.nama || 'Assessment'">
                            {{ a.nama_assessment || a.nama || 'Assessment' }}
                          </div>
                        </div>
                        <div class="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-dark-text-secondary">
                          <span>kelas: <span class="font-medium text-gray-700 dark:text-dark-text">{{ a.nama_kelas || resolveKelasName(a.id_kelas) }}</span></span>
                          <span v-if="a.nama_capaian">capaian: <span class="font-medium text-gray-700 dark:text-dark-text">{{ a.nama_capaian }}</span></span>
                          <span v-if="a.bobot">bobot: <span class="font-medium text-gray-700 dark:text-dark-text">{{ a.bobot }}</span></span>
                          <span v-if="a.created_at">dibuat: <span class="font-medium text-gray-700 dark:text-dark-text">{{ formatDate(a.created_at) }}</span></span>
                        </div>
                      </div>
                      <div class="flex items-center gap-2 shrink-0">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">ID: {{ a.id_assessment || a.id }}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- Pengaturan Akun -->
              <div v-else-if="activeTab === 'Pengaturan Akun'" class="space-y-6">
                <div class="rounded-xl border border-gray-200 dark:border-dark-border p-4 bg-gray-50 dark:bg-gray-800/40">
                  <h3 class="text-sm font-semibold text-gray-900 dark:text-dark-text">Pengaturan Akun</h3>
                  <p class="text-xs text-gray-500 dark:text-dark-text-secondary">Ubah kata sandi Anda di sini.</p>
                </div>
                <form class="space-y-4 max-w-md">
                  <div>
                    <label class="block text-xs font-medium text-gray-600 dark:text-dark-text-secondary mb-1">Kata Sandi Saat Ini</label>
                    <input type="password" v-model="accountForm.oldPassword" class="block w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-600 dark:text-dark-text-secondary mb-1">Kata Sandi Baru</label>
                    <input type="password" v-model="accountForm.newPassword" class="block w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text" />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-600 dark:text-dark-text-secondary mb-1">Konfirmasi Kata Sandi Baru</label>
                    <input type="password" v-model="accountForm.newPasswordConfirm" class="block w-full px-3 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-dark-input text-gray-900 dark:text-dark-text" />
                  </div>
                  <div class="pt-2">
                    <button type="button" @click="handleChangePassword" :disabled="isChangingPassword" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                      <svg v-if="!isChangingPassword" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 0v4m0 4h.01"/></svg>
                      <svg v-else class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="4" class="opacity-25"/><path d="M4 12a8 8 0 018-8" stroke-width="4" class="opacity-75"/></svg>
                      Ubah Kata Sandi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import Cookies from 'js-cookie';
import axios from '@/plugins/axios';
import { updateGuruById } from '@/services/api';
import { getGuruByUserId, getGuruByEmail } from '@/services/api';
import { parseJWT } from '@/utils/jwt';

// State variables
const userProfile = ref(null);
const editableProfile = reactive({});
const isEditing = ref(false);
const isSaving = ref(false);
const isLoading = ref(true);
const error = ref(null);
const userId = ref(null);
const avatarUrl = ref('');
// Rename the second tab from 'Relasi' to 'Kelas'
const tabs = ['Informasi', 'Kelas', 'Aktivitas', 'Pengaturan Akun'];
const activeTab = ref('Informasi');
// Reference lists & relations
const roleList = ref([]);
const sekolahList = ref([]);
const kelasList = ref([]);
const capaianKelasList = ref([]); // reference for resolving kelas from assessment
const pengampuForGuru = ref([]);
const siswaForGuru = ref([]);
const assessmentListForGuru = ref([]);
// Quick counts
const jumlahKelas = ref(0);
const jumlahSiswa = ref(0);
const jumlahAssessment = ref(0);
// Change password state
const accountForm = reactive({ oldPassword: '', newPassword: '', newPasswordConfirm: '' });
const isChangingPassword = ref(false);

// Helper function untuk user initials
const userInitials = computed(() => {
  if (!userProfile.value?.nama) return 'U';
  return userProfile.value.nama
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

// Fungsi untuk mendapatkan ID guru dari JWT token
// Fungsi untuk mendapatkan klaim dari JWT token (id adalah users.id_user)
const getClaimsFromToken = () => {
  try {
    const token = Cookies.get('auth_token') || Cookies.get('token') || localStorage.getItem('token');
    if (!token) throw new Error('Token tidak ditemukan. Silakan login kembali.');
    const decoded = parseJWT(token);
    // klaim utama: id -> users.id_user, email -> user email
    const userIdClaim = decoded?.id || decoded?.user_id || null;
    const emailClaim = decoded?.email || null;
    return { userId: userIdClaim, email: emailClaim };
  } catch (err) {
    console.error('Error parsing token:', err.message);
    error.value = err.message;
    return { userId: null, email: null };
  }
};

// Fungsi untuk mengambil data guru dari API
const fetchGuruData = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    const claims = getClaimsFromToken();
    if (!claims.userId && !claims.email) {
      throw new Error('Tidak dapat mendapatkan klaim user dari token');
    }

    // 1) Coba lookup berdasarkan user_id yang ada di token (direkomendasikan)
    let result = null;
    if (claims.userId) {
      result = await getGuruByUserId(claims.userId);
    }

    // 2) Jika tidak ditemukan, fallback: ambil list guru dan cari berdasarkan email
    if (!result && claims.email) {
      const found = await getGuruByEmail(claims.email);
      if (found) {
        result = { success: true, data: found };
      }
    }

    if (!result || !result.success) {
      throw new Error('Profil guru tidak ditemukan. Pastikan Anda sudah verifikasi NIP.');
    }

    userProfile.value = result.data;
    Object.assign(editableProfile, userProfile.value);
    avatarUrl.value = userProfile.value?.avatar_url || userProfile.value?.avatar || '';

    // After profile, fetch relations and counts in parallel
    await Promise.all([
      fetchReferenceLists(),
      fetchRelations(userProfile.value?.id_guru)
    ]);
  } catch (err) {
    console.error('Error fetching guru data:', err.message);
    error.value = 'Gagal memuat data profil: ' + err.message;
  } finally {
    isLoading.value = false;
  }
};

// Fetch role, sekolah, kelas lists
const fetchReferenceLists = async () => {
  try {
    const [rolesRes, sekolahRes, kelasRes, capaianKelasRes] = await Promise.all([
      axios.get('/list/role'),
      axios.get('/list/sekolah'),
      axios.get('/list/kelas'),
      axios.get('/list/capaian_kelas')
    ]);
    roleList.value = rolesRes.data?.data || [];
    sekolahList.value = sekolahRes.data?.data || [];
    kelasList.value = kelasRes.data?.data || [];
    capaianKelasList.value = capaianKelasRes.data?.data || [];
  } catch (e) {
    console.warn('Reference lists fetch failed:', e?.message || e);
  }
};

// Fetch pengampu for this guru, resolve kelas names, and counts
const fetchRelations = async (id_guru) => {
  if (!id_guru) return;
  try {
    const [pengampuRes, kelasCountRes, siswaCountRes, assessRes, siswaRes, capaianKelasRes] = await Promise.allSettled([
      axios.get('/list/pengampu'),
      axios.get(`/filter/guru/${id_guru}/jumlah-kelas`),
      axios.get(`/filter/guru/${id_guru}/jumlah-siswa`),
      axios.get(`/filter/assessment/guru/${id_guru}`),
      axios.get('/list/siswa'),
      axios.get('/list/capaian_kelas')
    ]);

    const pengampuData = pengampuRes.status === 'fulfilled' ? (pengampuRes.value?.data?.data || []) : [];
    pengampuForGuru.value = pengampuData
      .filter(p => p.id_guru == id_guru)
      .map(p => ({
        ...p,
        nama_kelas: kelasList.value.find(k => k.id_kelas == p.id_kelas)?.nama_kelas || `Kelas #${p.id_kelas}`
      }));

    jumlahKelas.value = kelasCountRes.status === 'fulfilled' ? (kelasCountRes.value?.data?.jumlah_kelas || 0) : 0;
    jumlahSiswa.value = siswaCountRes.status === 'fulfilled' ? (siswaCountRes.value?.data?.jumlah_siswa || 0) : 0;
    // ensure capaianKelasList populated
    if (capaianKelasRes.status === 'fulfilled') {
      const listCK = capaianKelasRes.value?.data?.data || [];
      if (!capaianKelasList.value?.length) capaianKelasList.value = listCK;
    }

    if (assessRes.status === 'fulfilled' && assessRes.value?.data?.success) {
      const list = assessRes.value?.data?.data || [];
      // enrich with kelas and capaian names
      const enriched = list.map(a => {
        const ck = (capaianKelasList.value || []).find(c => c.id == (a.id_capaian_kelas || a.id_ck || a.id_capaianKelas));
        const id_kelas = a.id_kelas || ck?.id_kelas;
        return {
          ...a,
          id_kelas,
          nama_kelas: resolveKelasName(id_kelas),
          nama_capaian: ck?.nama_ck || ck?.nama_ck || ck?.nama || undefined,
        };
      });
      assessmentListForGuru.value = enriched.slice(0, 10);
      jumlahAssessment.value = list.length;
    } else {
      assessmentListForGuru.value = [];
      jumlahAssessment.value = 0;
    }

    // Compute siswa diajar guru: filter siswa by kelas yang diampu guru
    const siswaDataAll = siswaRes.status === 'fulfilled' ? (siswaRes.value?.data?.data || []) : [];
    const kelasIds = new Set(pengampuForGuru.value.map(p => p.id_kelas));
    const uniq = new Map();
    siswaDataAll.forEach(s => {
      if (kelasIds.has(s.id_kelas)) {
        // ensure uniqueness by id_siswa
        if (!uniq.has(s.id_siswa)) {
          uniq.set(s.id_siswa, {
            ...s,
            nama_kelas: kelasList.value.find(k => k.id_kelas == s.id_kelas)?.nama_kelas || `Kelas #${s.id_kelas}`
          });
        }
      }
    });
    siswaForGuru.value = Array.from(uniq.values());
  } catch (e) {
    console.warn('Failed fetching relations:', e?.message || e);
  }
};

// Resolve kelas name helper (for Aktivitas list)
const resolveKelasName = (id_kelas) => {
  if (!id_kelas) return '-';
  return kelasList.value.find(k => k.id_kelas == id_kelas)?.nama_kelas || `Kelas #${id_kelas}`;
};

// Simple date formatter for display
const formatDate = (val) => {
  if (!val) return '-';
  try {
    // Keep as provided if parsing may be ambiguous
    const s = String(val);
    // Trim seconds for compact view
    return s.replace('T', ' ').slice(0, 16);
  } catch {
    return String(val);
  }
};

// Fungsi untuk menyimpan perubahan profil
const saveProfile = async () => {
  isSaving.value = true;
  
  try {
    // Ambil id_guru dari profil yang sudah dimuat; fallback ke lookup via user_id
    let guruId = userProfile.value?.id_guru || null;
    if (!guruId) {
      const claims = getClaimsFromToken();
      if (claims.userId) {
        const res = await getGuruByUserId(claims.userId);
        guruId = res?.data?.id_guru || null;
      }
    }
    if (!guruId) throw new Error('Tidak dapat menentukan ID guru untuk disimpan');
    
    // Kirim perubahan ke API (only allowed fields)
    const payload = {
      nama: editableProfile.nama,
      nip: editableProfile.nip,
      id_role: editableProfile.id_role,
      id_sekolah: editableProfile.id_sekolah,
    };
    const response = await updateGuruById(guruId, payload);
    
    if (!response.success) {
      throw new Error(response.message || 'Gagal menyimpan perubahan');
    }
    
    // Refresh data
    await fetchGuruData();
    
    // Reset editing mode
    isEditing.value = false;
    
    alert('Profil berhasil diperbarui!');
  } catch (err) {
    console.error('Error saving profile:', err);
    const msg = err?.response?.data?.message || err.message || 'Gagal menyimpan profil';
    alert('Gagal menyimpan profil: ' + msg);
  } finally {
    isSaving.value = false;
  }
};

// Toggle mode edit
const toggleEdit = () => {
  if (isEditing.value) {
    // Jika batal, kembalikan data ke aslinya
    Object.assign(editableProfile, userProfile.value);
  }
  isEditing.value = !isEditing.value;
};

// Helper functions mapping with backend lists
const getRoleName = (roleId) => {
  const item = roleList.value.find(r => r.id_role == roleId);
  return item?.nama_role || 'Tidak Diketahui';
};

const getSchoolName = (schoolId) => {
  const item = sekolahList.value.find(s => s.id_sekolah == schoolId);
  return item?.nama_sekolah || 'Tidak Diketahui';
};

// Helper function untuk reload page
const reloadPage = () => {
  window.location.reload();
};

// Load data saat komponen dimount
onMounted(() => {
  console.log('ProfileView mounted, fetching data...');
  fetchGuruData();
});

// Change password handler (dummy client-side validation then hit backend if exists)
const handleChangePassword = async () => {
  if (!accountForm.oldPassword || !accountForm.newPassword || !accountForm.newPasswordConfirm) {
    return alert('Mohon lengkapi semua field kata sandi.');
  }
  if (accountForm.newPassword !== accountForm.newPasswordConfirm) {
    return alert('Konfirmasi kata sandi tidak cocok.');
  }
  try {
    isChangingPassword.value = true;
    // Jika backend memiliki endpoint: PUT /change-password (lihat store auth.js)
    await axios.put('/change-password', {
      oldPassword: accountForm.oldPassword,
      newPassword: accountForm.newPassword,
    });
    alert('Kata sandi berhasil diubah');
    accountForm.oldPassword = '';
    accountForm.newPassword = '';
    accountForm.newPasswordConfirm = '';
  } catch (e) {
    const msg = e?.response?.data?.message || e.message || 'Gagal mengubah kata sandi';
    alert(msg);
  } finally {
    isChangingPassword.value = false;
  }
};
</script>
