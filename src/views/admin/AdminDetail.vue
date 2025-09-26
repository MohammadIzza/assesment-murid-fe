<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header with Back Button -->
    <div class="mb-6">
      <div class="flex items-center">
        <button
          @click="goBack"
          class="mr-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Detail Admin</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">Informasi lengkap tentang admin</p>
        </div>
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
              @click="loadAdminDetail"
              class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Admin Detail Card -->
    <div v-else-if="admin" class="bg-white dark:bg-dark-surface rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
      <!-- Admin Header -->
      <div class="px-6 py-5 border-b border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-gray-800">
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0 h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-medium">
            {{ getInitials(admin.nama) }}
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ admin.nama }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">Admin</p>
            <div class="mt-1 flex items-center">
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="admin.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              >
                {{ admin.status === 1 ? 'Aktif' : 'Nonaktif' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Details -->
      <div class="px-6 py-5">
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ admin.email }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">NIP</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ admin.nip || 'Tidak ada' }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">ID Admin</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ admin.id_admin }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Role</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">Administrator</dd>
          </div>
          <div v-if="admin.created_at" class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Terdaftar Pada</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ formatDate(admin.created_at) }}</dd>
          </div>
          <div v-if="admin.updated_at" class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Terakhir Diperbarui</dt>
            <dd class="mt-1 text-sm text-gray-900 dark:text-white">{{ formatDate(admin.updated_at) }}</dd>
          </div>
        </dl>
      </div>

      <!-- Action Buttons -->
      <div class="px-6 py-4 border-t border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-gray-800 flex justify-end space-x-3">
        <RouterLink
          :to="`/admin/${admin.id_admin}/edit`"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
          </svg>
          Edit Admin
        </RouterLink>
        <button
          @click="confirmDeleteAdmin"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          Hapus
        </button>
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
                Apakah Anda yakin ingin menghapus admin <span class="font-semibold">{{ admin?.nama }}</span>? Tindakan ini tidak dapat dibatalkan.
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminStore } from '@/stores/admin'
import { useAuthStore } from '@/stores/auth'
import Toast from '@/components/common/Toast.vue'

// Initialize stores and router
const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const authStore = useAuthStore()
const adminId = computed(() => route.params.id)

// Admin data
const admin = computed(() => adminStore.getCurrentAdmin)

// Check if user has admin permissions
onMounted(() => {
  // If not admin role, redirect to dashboard
  if (!authStore.isAdmin) {
    router.push('/dashboard')
    return
  }
  
  loadAdminDetail()
})

// UI state
const showDeleteConfirm = ref(false)
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

// Load admin detail
const loadAdminDetail = async () => {
  if (!adminId.value) {
    router.push('/admin/list')
    return
  }
  
  adminStore.clearError()
  try {
    await adminStore.fetchAdminDetail(adminId.value)
  } catch (error) {
    console.error('Failed to fetch admin detail:', error)
  }
}

// Confirm delete admin
const confirmDeleteAdmin = () => {
  showDeleteConfirm.value = true
}

// Delete admin
const deleteAdmin = async () => {
  isDeleting.value = true
  
  try {
    await adminStore.deleteAdmin(adminId.value)
    showDeleteConfirm.value = false
    
    showNotification('success', 'Berhasil!', 'Admin berhasil dihapus')
    
    // Navigate back to admin list after successful deletion
    setTimeout(() => {
      router.push('/admin/list')
    }, 1500)
  } catch (error) {
    console.error('Failed to delete admin:', error)
    showNotification('error', 'Gagal!', 'Terjadi kesalahan saat menghapus admin')
  } finally {
    isDeleting.value = false
  }
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'Tidak tersedia'
  
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
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

// Navigate back
const goBack = () => {
  router.back()
}
</script>