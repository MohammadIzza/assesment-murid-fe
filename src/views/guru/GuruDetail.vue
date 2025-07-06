<template>
  <div class="guru-detail-container">
    <!-- Header Section -->
    <div class="header-section">
      <button @click="goBack" class="back-button">
        ← Kembali ke Daftar Guru
      </button>
      <h1 class="page-title">Detail Guru</h1>
    </div>

    <!-- Loading State -->
    <div v-if="guruStore.isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Memuat detail guru...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="guruStore.getError" class="error-container">
      <div class="error-icon">⚠️</div>
      <h3>Terjadi Kesalahan</h3>
      <p>{{ guruStore.getError }}</p>
      <button @click="loadGuruDetail" class="retry-button">
        Coba Lagi
      </button>
    </div>

    <!-- Guru Detail Content -->
    <div v-else-if="guruStore.getCurrentGuru" class="detail-content">
      <div class="guru-profile-card">
        <div class="profile-header">
          <div class="profile-avatar">
            <span class="avatar-text">
              {{ getInitials(guruStore.getCurrentGuru.nama) }}
            </span>
          </div>
          <div class="profile-info">
            <h2 class="guru-name">{{ guruStore.getCurrentGuru.nama || 'Nama Tidak Tersedia' }}</h2>
            <p class="guru-email">{{ guruStore.getCurrentGuru.email || 'Email Tidak Tersedia' }}</p>
            <div class="status-badge" :class="getStatusClass(guruStore.getCurrentGuru)">
              {{ getStatusText(guruStore.getCurrentGuru) }}
            </div>
          </div>
        </div>

        <div class="profile-details">
          <div class="detail-grid">
            <div class="detail-item">
              <label class="detail-label">ID Guru</label>
              <span class="detail-value">{{ guruStore.getCurrentGuru.id_guru }}</span>
            </div>

            <div class="detail-item">
              <label class="detail-label">NIP</label>
              <span class="detail-value">{{ guruStore.getCurrentGuru.nip || 'Tidak Tersedia' }}</span>
            </div>

            <div class="detail-item">
              <label class="detail-label">Email</label>
              <span class="detail-value">
                <a :href="`mailto:${guruStore.getCurrentGuru.email}`" class="email-link">
                  {{ guruStore.getCurrentGuru.email || 'Tidak Tersedia' }}
                </a>
              </span>
            </div>

            <div class="detail-item">
              <label class="detail-label">Sekolah</label>
              <span class="detail-value">
                <span class="school-badge" :class="getSchoolClass(guruStore.getCurrentGuru.id_sekolah)">
                  {{ getSchoolName(guruStore.getCurrentGuru.id_sekolah) }}
                </span>
              </span>
            </div>

            <div class="detail-item">
              <label class="detail-label">Role</label>
              <span class="detail-value">
                <span class="role-badge" :class="getRoleClass(guruStore.getCurrentGuru.id_role)">
                  {{ getRoleName(guruStore.getCurrentGuru.id_role) }}
                </span>
              </span>
            </div>

            <div class="detail-item">
              <label class="detail-label">Status Akun</label>
              <span class="detail-value">
                <span class="status-badge" :class="getStatusClass(guruStore.getCurrentGuru)">
                  {{ getStatusText(guruStore.getCurrentGuru) }}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div class="profile-actions">
          <button @click="editGuru" class="action-button edit-button">
            ✏️ Edit Guru
          </button>
          <button @click="deleteGuru" class="action-button delete-button">
            🗑️ Hapus Guru
          </button>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="additional-info">
        <div class="info-card">
          <h3 class="info-title">Informasi Sistem</h3>
          <div class="info-content">
            <p><strong>ID Guru:</strong> {{ guruStore.getCurrentGuru.id_guru }}</p>
            <p><strong>ID Sekolah:</strong> {{ guruStore.getCurrentGuru.id_sekolah || 'Tidak Ditetapkan' }}</p>
            <p><strong>ID Role:</strong> {{ guruStore.getCurrentGuru.id_role || 'Tidak Ditetapkan' }}</p>
            <p><strong>Password Hash:</strong> {{ guruStore.getCurrentGuru.password_hash ? 'Tersedia' : 'Tidak Tersedia' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="not-found-container">
      <div class="not-found-icon">👤</div>
      <h3>Guru Tidak Ditemukan</h3>
      <p>Guru dengan ID {{ $route.params.id }} tidak ditemukan dalam sistem.</p>
      <button @click="goBack" class="back-button">
        Kembali ke Daftar Guru
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGuruStore } from '@/stores/guru'

export default {
  name: 'GuruDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const guruStore = useGuruStore()

    // Methods
    const loadGuruDetail = async () => {
      try {
        await guruStore.fetchGuruDetail(route.params.id)
      } catch (error) {
        console.error('Failed to load guru detail:', error)
      }
    }

    const goBack = () => {
      router.push({ name: 'guru-list' })
    }

    const editGuru = () => {
      router.push({ name: 'guru-edit', params: { id: route.params.id } })
    }

    const deleteGuru = () => {
      if (confirm('Apakah Anda yakin ingin menghapus guru ini?')) {
        // Implementasi delete guru
        console.log('Delete guru:', route.params.id)
      }
    }

    const getInitials = (name) => {
      if (!name) return '?'
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
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
      if (!schoolId) return 'school-unknown'
      return `school-${schoolId}`
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
      if (!roleId) return 'role-unknown'
      return `role-${roleId}`
    }

    const getStatusText = (guru) => {
      if (!guru.password_hash) return 'Belum Aktif'
      return 'Aktif'
    }

    const getStatusClass = (guru) => {
      if (!guru.password_hash) return 'status-inactive'
      return 'status-active'
    }

    // Lifecycle
    onMounted(() => {
      loadGuruDetail()
    })

    onUnmounted(() => {
      guruStore.clearCurrentGuru()
    })

    return {
      guruStore,
      loadGuruDetail,
      goBack,
      editGuru,
      deleteGuru,
      getInitials,
      getSchoolName,
      getSchoolClass,
      getRoleName,
      getRoleClass,
      getStatusText,
      getStatusClass
    }
  }
}
</script>

<style scoped>
.guru-detail-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.header-section {
  margin-bottom: 2rem;
}

.back-button {
  background: #718096;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: background-color 0.2s;
}

.back-button:hover {
  background: #4a5568;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
}

.loading-container {
  text-align: center;
  padding: 3rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #4299e1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  text-align: center;
  padding: 3rem;
  background: #fed7d7;
  border-radius: 0.5rem;
  border: 1px solid #feb2b2;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.retry-button {
  background: #e53e3e;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;
}

.guru-profile-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;
}

.avatar-text {
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

.profile-info {
  flex: 1;
}

.guru-name {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.guru-email {
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  opacity: 0.9;
}

.profile-details {
  padding: 2rem;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
}

.detail-label {
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: 1.1rem;
  color: #2d3748;
}

.email-link {
  color: #4299e1;
  text-decoration: none;
}

.email-link:hover {
  text-decoration: underline;
}

.school-badge, .role-badge, .status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
}

.school-1 { background: #c6f6d5; color: #22543d; }
.school-2 { background: #fed7d7; color: #742a2a; }
.school-unknown { background: #e2e8f0; color: #4a5568; }

.role-2 { background: #bee3f8; color: #2a4365; }
.role-3 { background: #faf089; color: #744210; }
.role-unknown { background: #e2e8f0; color: #4a5568; }

.status-active { background: #c6f6d5; color: #22543d; }
.status-inactive { background: #fed7d7; color: #742a2a; }

.profile-actions {
  padding: 1.5rem 2rem;
  background: #f7fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 1rem;
}

.action-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.edit-button {
  background: #4299e1;
  color: white;
}

.edit-button:hover {
  background: #3182ce;
}

.delete-button {
  background: #e53e3e;
  color: white;
}

.delete-button:hover {
  background: #c53030;
}

.additional-info {
  margin-top: 2rem;
}

.info-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.info-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1rem 0;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.info-content p {
  margin: 0.5rem 0;
  color: #4a5568;
}

.not-found-container {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.not-found-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.not-found-container h3 {
  color: #2d3748;
  margin-bottom: 1rem;
}

.not-found-container p {
  color: #718096;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .guru-detail-container {
    padding: 1rem;
  }
  
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .profile-avatar {
    margin-right: 0;
    margin-bottom: 1rem;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .profile-actions {
    flex-direction: column;
  }
}
</style> 