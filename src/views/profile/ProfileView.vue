<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex justify-center items-center min-h-[500px]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
    
    <!-- Error state -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error: </strong>
        <span class="block sm:inline">{{ error }}</span>
        <p class="mt-2 text-sm">
          Pastikan Anda sudah login dan memiliki akses yang tepat.
        </p>
        <div class="mt-3 flex">
          <button @click="fetchGuruData" class="mr-2 bg-red-600 text-white px-3 py-1 rounded text-sm">
            Coba Lagi
          </button>
          <button @click="reloadPage" class="bg-gray-600 text-white px-3 py-1 rounded text-sm">
            Muat Ulang Halaman
          </button>
        </div>
      </div>
    </div>
    
    <!-- Profile content when data is available -->
    <div v-else-if="userProfile" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">Profil Pengguna</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Informasi detail akun Anda</p>
          </div>
          <div>
            <button v-if="!isEditing" @click="toggleEdit" class="bg-blue-600 text-white px-4 py-2 rounded-md">
              Edit Profil
            </button>
            <div v-else class="flex space-x-2">
              <button @click="saveProfile" :disabled="isSaving" class="bg-green-600 text-white px-4 py-2 rounded-md flex items-center">
                <span v-if="isSaving" class="mr-2">
                  <div class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                </span>
                <span>Simpan</span>
              </button>
              <button @click="toggleEdit" :disabled="isSaving" class="bg-gray-500 text-white px-4 py-2 rounded-md">
                Batal
              </button>
            </div>
          </div>
        </div>
        
        <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <div class="flex items-center">
                <input 
                  v-if="isEditing"
                  v-model="editableProfile.nama" 
                  type="text" 
                  class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                <div v-else class="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 w-full">
                  {{ userProfile.nama }}
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div class="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                {{ userProfile.email }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <div class="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                {{ getRoleName(userProfile.id_role) }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Sekolah</label>
              <div class="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600">
                {{ getSchoolName(userProfile.id_sekolah) }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">NIP</label>
              <div class="flex items-center">
                <input 
                  v-if="isEditing"
                  v-model="editableProfile.nip" 
                  type="text" 
                  class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                <div v-else class="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 w-full">
                  {{ userProfile.nip || 'Belum diisi' }}
                </div>
              </div>
            </div>
            <!-- User ID section removed as requested -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import Cookies from 'js-cookie';
import { getGuruById, updateGuruById } from '@/services/api';
import { parseJWT } from '@/utils/jwt';

// State variables
const userProfile = ref(null);
const editableProfile = reactive({});
const isEditing = ref(false);
const isSaving = ref(false);
const isLoading = ref(true);
const error = ref(null);
const userId = ref(null);

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
const getGuruIdFromToken = () => {
  try {
    // PENTING: Di sini kita coba berbagai kemungkinan nama cookie untuk token
    const token = Cookies.get('auth_token') || 
                 Cookies.get('token') || 
                 localStorage.getItem('token');
    
    // Remove cookie debugging
    // console.log("Cookies available:", Object.keys(Cookies.get()));
    
    if (!token) {
      throw new Error('Token tidak ditemukan. Silakan login kembali.');
    }
    
    // Remove token found logging
    // console.log('Token found!');
    
    // Parse token untuk mendapatkan payload
    const decoded = parseJWT(token);
    
    
    // Cek berbagai kemungkinan field untuk ID user/guru
    const guruId = decoded?.id || decoded?.id_guru || decoded?.user_id;
    
    if (!guruId) {
      // Sanitize the error to not show full token content
      throw new Error('ID guru tidak ditemukan dalam token.');
    }
    
    // Remove ID logging
    // console.log('Found guru ID in token:', guruId);
    userId.value = guruId;
    return guruId;
  } catch (err) {
    console.error('Error getting guru ID from token:', err.message);
    error.value = err.message;
    return null;
  }
};

// Fungsi untuk mengambil data guru dari API
const fetchGuruData = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Dapatkan ID guru dari token
    const guruId = getGuruIdFromToken();
    
    if (!guruId) {
      throw new Error('Tidak dapat mendapatkan ID guru dari token');
    }
    
    // Panggil API untuk mendapatkan data guru
    const response = await getGuruById(guruId);
    
    if (!response.success) {
      throw new Error(response.message || 'Gagal mengambil data profil');
    }
    
    // Set data profil
    userProfile.value = response.data;
    
    // Copy data ke editable profile
    Object.assign(editableProfile, userProfile.value);
    
    // Remove data logging
    // console.log('Guru data loaded:', userProfile.value);
  } catch (err) {
    console.error('Error fetching guru data:', err.message);
    error.value = 'Gagal memuat data profil: ' + err.message;
  } finally {
    isLoading.value = false;
  }
};

// Fungsi untuk menyimpan perubahan profil
const saveProfile = async () => {
  isSaving.value = true;
  
  try {
    const guruId = getGuruIdFromToken();
    
    if (!guruId) {
      throw new Error('Tidak dapat mendapatkan ID guru dari token');
    }
    
    // Kirim perubahan ke API
    const response = await updateGuruById(guruId, editableProfile);
    
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
    alert('Gagal menyimpan profil: ' + err.message);
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

// Helper function untuk role name
const getRoleName = (roleId) => {
  const roles = {
    1: 'Super Admin',
    2: 'Guru',
    3: 'Kepala Sekolah'
  };
  return roles[roleId] || 'Tidak Diketahui';
};

// Helper function untuk school name
const getSchoolName = (schoolId) => {
  const schools = {
    1: 'SMA Negeri 1 Semarang',
    2: 'SMA Negeri 2 Semarang'
  };
  return schools[schoolId] || 'Tidak Diketahui';
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
</script>
