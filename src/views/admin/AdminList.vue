<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Daftar Admin</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Kelola admin sistem</p>
      </div>
      <div class="flex space-x-3">
        <!-- Tambah Admin Button -->
        <button
          @click="goToAddAdmin"
          class="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Tambah Admin
        </button>
      </div>
    </div>

    <!-- Search & Filter Bar -->
    <div class="mb-5 p-4 bg-white dark:bg-dark-surface rounded-xl shadow-sm border border-gray-200 dark:border-dark-border">
      <div class="flex flex-col md:flex-row gap-3">
        <div class="flex-1">
          <label for="search" class="sr-only">Cari</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              id="search"
              v-model="searchQuery"
              @keyup="handleSearch"
              type="search"
              placeholder="Cari admin..."
              class="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-dark-form dark:border-dark-border dark:text-white"
            />
          </div>
        </div>

        <!-- Filter Status -->
        <div class="w-full md:w-64">
          <label for="status" class="sr-only">Status</label>
          <select
            id="status"
            v-model="filterStatus"
            @change="handleSearch"
            class="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-dark-form dark:border-dark-border dark:text-white"
          >
            <option value="">Semua Status</option>
            <option value="1">Aktif</option>
            <option value="0">Nonaktif</option>
          </select>
        </div>

        <!-- Reset Filter Button -->
        <button
          @click="resetFilters"
          class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-dark-form dark:border-dark-border dark:text-white dark:hover:bg-dark-border"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          Reset
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="adminStore.isLoading" class="flex justify-center my-8">
      <svg class="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Error State -->
    <div v-else-if="adminStore.getError" class="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
      <div class="flex">
        <svg class="h-5 w-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Gagal memuat data admin</h3>
          <p class="text-sm text-red-700 mt-1">{{ adminStore.getError }}</p>
          <div class="mt-2">
            <button
              @click="loadAdminList"
              class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredAdminList.length === 0" class="bg-white dark:bg-dark-surface rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6 text-center my-4">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Belum ada admin</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Data admin tidak ditemukan atau belum tersedia.</p>
      <div class="mt-4">
        <button
          @click="goToAddAdmin"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Tambah Admin
        </button>
      </div>
    </div>

    <!-- Admin Table -->
    <div v-else class="bg-white dark:bg-dark-surface rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-dark-border">
          <thead class="bg-gray-50 dark:bg-dark-header">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nama</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-dark-border">
            <tr v-for="admin in filteredAdminList" :key="admin.id_admin" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    {{ getInitials(admin.nama) }}
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ admin.nama }}</div>
                    <div v-if="admin.nip" class="text-xs text-gray-500 dark:text-gray-400">NIP: {{ admin.nip }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">{{ admin.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="admin.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                >
                  {{ admin.status === 1 ? 'Aktif' : 'Nonaktif' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <RouterLink
                  :to="`/admin/${admin.id_admin}`"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  Detail
                </RouterLink>
                <RouterLink
                  :to="`/admin/${admin.id_admin}/edit`"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs rounded-md text-yellow-700 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                  Edit
                </RouterLink>
                <button
                  @click="confirmDeleteAdmin(admin)"
                  class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Confirmation Dialog -->
    <Teleport to="body">
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
          <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
            <h3 class="text-lg font-medium leading-6 text-gray-900">
              Konfirmasi Hapus
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Apakah Anda yakin ingin menghapus admin <span class="font-semibold">{{ adminToDelete?.nama }}</span>? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div class="mt-4 flex justify-end space-x-3">
              <button
                @click="showDeleteConfirm = false"
                type="button"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Batal
              </button>
              <button
                @click="deleteAdmin"
                type="button"
                class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                :disabled="isDeleting"
              >
                <span v-if="isDeleting">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menghapus...
                </span>
                <span v-else>Hapus</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Toast Notification -->
    <Toast
      :show="showToast"
      :type="toastType"
      :title="toastTitle"
      :message="toastMessage"
      :duration="5000"
      @close="closeToast"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { useAuthStore } from '@/stores/auth'
import Toast from '@/components/common/Toast.vue'

// Initialize stores and router
const router = useRouter()
const adminStore = useAdminStore()
const authStore = useAuthStore()

// Check if user has admin permissions
onMounted(() => {
  // If not admin role, redirect to dashboard
  if (!authStore.isAdmin) {
    router.push('/dashboard')
    return
  }
  
  loadAdminList()
})

// Set up reactive data
const searchQuery = ref('')
const filterStatus = ref('')
const showDeleteConfirm = ref(false)
const adminToDelete = ref(null)
const isDeleting = ref(false)

// Toast notification state
const showToast = ref(false)
const toastType = ref('info')
const toastTitle = ref('')
const toastMessage = ref('')

const showNotification = (type, title, message) => {
  toastType.value = type
  toastTitle.value = title
  toastMessage.value = message
  showToast.value = true
}

const closeToast = () => {
  showToast.value = false
}

// Filtered admin list based on search query and filters
const filteredAdminList = computed(() => {
  let filtered = adminStore.getAdminList || []

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(admin => 
      admin.nama?.toLowerCase().includes(query) || 
      admin.email?.toLowerCase().includes(query) ||
      admin.nip?.toLowerCase().includes(query)
    )
  }

  // Apply status filter
  if (filterStatus.value !== '') {
    filtered = filtered.filter(admin => admin.status === parseInt(filterStatus.value))
  }

  return filtered
})

// Load admin list from API
const loadAdminList = async () => {
  adminStore.clearError()
  try {
    await adminStore.fetchAdminList()
  } catch (error) {
    console.error('Failed to fetch admin list:', error)
  }
}

// Handle search input
const handleSearch = () => {
  // You can add debounce logic here if needed
}

// Reset filters
const resetFilters = () => {
  searchQuery.value = ''
  filterStatus.value = ''
}

// Navigate to add admin page
const goToAddAdmin = () => {
  router.push('/admin/add')
}

// Confirm delete admin
const confirmDeleteAdmin = (admin) => {
  adminToDelete.value = admin
  showDeleteConfirm.value = true
}

// Delete admin
const deleteAdmin = async () => {
  if (!adminToDelete.value) return
  
  isDeleting.value = true
  
  try {
    await adminStore.deleteAdmin(adminToDelete.value.id_admin)
    showDeleteConfirm.value = false
    adminToDelete.value = null
    
    showNotification('success', 'Berhasil!', 'Admin berhasil dihapus')
  } catch (error) {
    console.error('Failed to delete admin:', error)
    showNotification('error', 'Gagal!', 'Terjadi kesalahan saat menghapus admin')
  } finally {
    isDeleting.value = false
  }
}

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return 'A'
  
  const nameParts = name.split(' ')
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase()
  }
  
  return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase()
}
</script>