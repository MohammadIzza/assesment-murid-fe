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
        <p class="mt-2 text-xs">Pastikan Anda sudah login dan memiliki akses yang tepat.</p>
        <div class="mt-3 flex">
          <button @click="fetchGuruData" class="mr-2 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm">Coba Lagi</button>
          <button @click="reloadPage" class="bg-gray-600 text-white px-3 py-1.5 rounded-lg text-sm">Muat Ulang Halaman</button>
        </div>
      </div>
    </div>
    
    <!-- Profile content when data is available -->
    <div v-else-if="userProfile" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow rounded-xl border border-gray-100 overflow-hidden">
        <div class="flex items-center gap-4 px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-200 text-blue-700 text-lg font-bold">
            <svg v-if="!userProfile.nama" class="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span v-else>{{ userInitials }}</span>
          </div>
          <div>
            <h3 class="text-lg font-bold text-gray-900">Profil Pengguna</h3>
            <p class="text-xs text-gray-500">Informasi detail akun Anda</p>
          </div>
          <div class="flex-1"></div>
          <div>
            <button v-if="!isEditing" @click="toggleEdit" class="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition">Edit Profil</button>
            <div v-else class="flex space-x-2">
              <button @click="saveProfile" :disabled="isSaving" class="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:bg-green-700 transition flex items-center">
                <span v-if="isSaving" class="mr-2">
                  <div class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                </span>
                <span>Simpan</span>
              </button>
              <button @click="toggleEdit" :disabled="isSaving" class="bg-gray-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-600 transition">Batal</button>
            </div>
          </div>
        </div>
        <div class="px-4 py-4 sm:p-6 space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <div class="flex items-center">
              <input 
                v-if="isEditing"
                v-model="editableProfile.nama" 
                type="text" 
                class="block w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" />
              <div v-else class="px-3 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 w-full text-sm">
                {{ userProfile.nama }}
              </div>
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Email</label>
            <div class="px-3 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 text-sm">
              {{ userProfile.email }}
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Role</label>
            <div v-if="isEditing" class="flex items-center">
              <select v-model="editableProfile.id_role" class="block w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm">
                <option disabled value="">Pilih Role</option>
                <option v-for="r in roleList" :key="r.id_role" :value="r.id_role">{{ r.nama_role }}</option>
              </select>
            </div>
            <div v-else class="px-3 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 text-sm">
              {{ getRoleName(userProfile.id_role) }}
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Sekolah</label>
            <div v-if="isEditing" class="flex items-center">
              <select v-model="editableProfile.id_sekolah" class="block w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm">
                <option disabled value="">Pilih Sekolah</option>
                <option v-for="s in sekolahList" :key="s.id_sekolah" :value="s.id_sekolah">{{ s.nama_sekolah }}</option>
              </select>
            </div>
            <div v-else class="px-3 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 text-sm">
              {{ getSchoolName(userProfile.id_sekolah) }}
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">NIP</label>
            <div class="flex items-center">
              <input 
                v-if="isEditing"
                v-model="editableProfile.nip" 
                type="text" 
                class="block w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm" />
              <div v-else class="px-3 py-1.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 w-full text-sm">
                {{ userProfile.nip || 'Belum diisi' }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Relations & Stats -->
      <div class="bg-white shadow rounded-xl border border-gray-100 overflow-hidden mt-6">
        <div class="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-indigo-100">
          <h4 class="text-sm font-semibold text-gray-800">Statistik & Pengampu</h4>
        </div>
        <div class="p-4 sm:p-6">
          <!-- Stats -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <div class="rounded-lg border border-gray-200 p-3 bg-gray-50">
              <div class="text-xs text-gray-500">Jumlah Kelas Diampu</div>
              <div class="text-xl font-bold text-gray-800">{{ jumlahKelas }}</div>
            </div>
            <div class="rounded-lg border border-gray-200 p-3 bg-gray-50">
              <div class="text-xs text-gray-500">Jumlah Siswa Diajar</div>
              <div class="text-xl font-bold text-gray-800">{{ jumlahSiswa }}</div>
            </div>
            <div class="rounded-lg border border-gray-200 p-3 bg-gray-50">
              <div class="text-xs text-gray-500">Total Assessment Terkait</div>
              <div class="text-xl font-bold text-gray-800">{{ jumlahAssessment }}</div>
            </div>
          </div>

          <!-- Pengampu list -->
          <div>
            <div class="text-xs font-medium text-gray-700 mb-2">Kelas yang Diampu</div>
            <div v-if="pengampuForGuru.length === 0" class="text-sm text-gray-500">Belum ada data pengampu untuk guru ini.</div>
            <ul v-else class="list-disc pl-5 text-sm text-gray-700 space-y-1">
              <li v-for="p in pengampuForGuru" :key="p.id_pengampu">{{ p.nama_kelas }}</li>
            </ul>
          </div>
        </div>
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
// Reference lists & relations
const roleList = ref([]);
const sekolahList = ref([]);
const kelasList = ref([]);
const pengampuForGuru = ref([]);
// Quick counts
const jumlahKelas = ref(0);
const jumlahSiswa = ref(0);
const jumlahAssessment = ref(0);

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
    const [rolesRes, sekolahRes, kelasRes] = await Promise.all([
      axios.get('/list/role'),
      axios.get('/list/sekolah'),
      axios.get('/list/kelas')
    ]);
    roleList.value = rolesRes.data?.data || [];
    sekolahList.value = sekolahRes.data?.data || [];
    kelasList.value = kelasRes.data?.data || [];
  } catch (e) {
    console.warn('Reference lists fetch failed:', e?.message || e);
  }
};

// Fetch pengampu for this guru, resolve kelas names, and counts
const fetchRelations = async (id_guru) => {
  if (!id_guru) return;
  try {
    const [pengampuRes, kelasCountRes, siswaCountRes, assessRes] = await Promise.allSettled([
      axios.get('/list/pengampu'),
      axios.get(`/filter/guru/${id_guru}/jumlah-kelas`),
      axios.get(`/filter/guru/${id_guru}/jumlah-siswa`),
      axios.get(`/filter/assessment/guru/${id_guru}`)
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
    jumlahAssessment.value = assessRes.status === 'fulfilled' && assessRes.value?.data?.success
      ? (assessRes.value?.data?.data?.length || 0)
      : 0;
  } catch (e) {
    console.warn('Failed fetching relations:', e?.message || e);
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
</script>
