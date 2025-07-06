<template>
  <div class="guru-list-container">
    <!-- Header Section -->
    <div class="header-section">
      <h1 class="page-title">Daftar Guru</h1>
      <p class="page-subtitle">Kelola data guru di sistem</p>
    </div>

    <!-- Search and Filter Section -->
    <div class="search-filter-section">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari guru berdasarkan nama, email, atau NIP..."
          class="search-input"
        />
        <i class="search-icon">🔍</i>
      </div>
      
      <div class="filter-options">
        <select v-model="selectedSchool" class="filter-select">
          <option value="">Semua Sekolah</option>
          <option value="1">SMA Negeri 1 Semarang</option>
          <option value="2">SMA Negeri 2 Semarang</option>
        </select>
        
        <select v-model="selectedRole" class="filter-select">
          <option value="">Semua Role</option>
          <option value="2">Guru</option>
          <option value="3">Kepala Sekolah</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="guruStore.isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Memuat data guru...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="guruStore.getError" class="error-container">
      <div class="error-icon">⚠️</div>
      <h3>Terjadi Kesalahan</h3>
      <p>{{ guruStore.getError }}</p>
      <button @click="loadGuruData" class="retry-button">
        Coba Lagi
      </button>
    </div>

    <!-- Data Table -->
    <div v-else class="table-container">
      <div class="table-header">
        <div class="table-info">
          <span>Total: {{ filteredGuruList.length }} guru</span>
        </div>
        <div class="table-actions">
          <button @click="loadGuruData" class="refresh-button">
            🔄 Refresh
          </button>
        </div>
      </div>

      <div class="table-wrapper">
        <table class="guru-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>NIP</th>
              <th>Sekolah</th>
              <th>Role</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(guru, index) in paginatedGuruList" :key="guru.id_guru" class="table-row">
              <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
              <td class="guru-name">
                <div class="name-info">
                  <span class="name">{{ guru.nama || 'N/A' }}</span>
                </div>
              </td>
              <td class="guru-email">
                <a :href="`mailto:${guru.email}`" class="email-link">
                  {{ guru.email || 'N/A' }}
                </a>
              </td>
              <td class="guru-nip">{{ guru.nip || 'N/A' }}</td>
              <td class="guru-school">
                <span class="school-badge" :class="getSchoolClass(guru.id_sekolah)">
                  {{ getSchoolName(guru.id_sekolah) }}
                </span>
              </td>
              <td class="guru-role">
                <span class="role-badge" :class="getRoleClass(guru.id_role)">
                  {{ getRoleName(guru.id_role) }}
                </span>
              </td>
              <td class="guru-status">
                <span class="status-badge" :class="getStatusClass(guru)">
                  {{ getStatusText(guru) }}
                </span>
              </td>
              <td class="guru-actions">
                <button 
                  @click="viewGuruDetail(guru.id_guru)"
                  class="action-button view-button"
                  title="Lihat Detail"
                >
                  👁️
                </button>
                <button 
                  @click="editGuru(guru.id_guru)"
                  class="action-button edit-button"
                  title="Edit"
                >
                  ✏️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredGuruList.length === 0 && !guruStore.isLoading" class="empty-state">
        <div class="empty-icon">📚</div>
        <h3>Tidak Ada Data Guru</h3>
        <p>Tidak ada guru yang ditemukan dengan kriteria pencarian saat ini.</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="pagination-button"
        >
          ← Sebelumnya
        </button>
        
        <div class="page-numbers">
          <button 
            v-for="page in visiblePages" 
            :key="page"
            @click="currentPage = page"
            :class="['page-button', { active: currentPage === page }]"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
          class="pagination-button"
        >
          Selanjutnya →
        </button>
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

    const editGuru = (id) => {
      router.push({ name: 'guru-edit', params: { id } })
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
      editGuru,
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
.guru-list-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header-section {
  margin-bottom: 2rem;
  text-align: center;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #718096;
  margin: 0;
}

.search-filter-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 300px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.filter-options {
  display: flex;
  gap: 0.5rem;
}

.filter-select {
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 0.5rem;
  background: white;
  font-size: 0.9rem;
  min-width: 150px;
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

.table-container {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
}

.table-info {
  font-weight: 600;
  color: #4a5568;
}

.refresh-button {
  background: #4299e1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.table-wrapper {
  overflow-x: auto;
}

.guru-table {
  width: 100%;
  border-collapse: collapse;
}

.guru-table th {
  background: #f7fafc;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #4a5568;
  border-bottom: 1px solid #e2e8f0;
}

.guru-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
}

.table-row:hover {
  background: #f7fafc;
}

.guru-name .name {
  font-weight: 600;
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
}

.school-1 { background: #c6f6d5; color: #22543d; }
.school-2 { background: #fed7d7; color: #742a2a; }
.school-unknown { background: #e2e8f0; color: #4a5568; }

.role-2 { background: #bee3f8; color: #2a4365; }
.role-3 { background: #faf089; color: #744210; }
.role-unknown { background: #e2e8f0; color: #4a5568; }

.status-active { background: #c6f6d5; color: #22543d; }
.status-inactive { background: #fed7d7; color: #742a2a; }

.guru-actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.2s;
}

.view-button:hover { background: #bee3f8; }
.edit-button:hover { background: #faf089; }

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #718096;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: #f7fafc;
  border-top: 1px solid #e2e8f0;
}

.pagination-button {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-weight: 600;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.25rem;
}

.page-button {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  cursor: pointer;
  min-width: 40px;
}

.page-button.active {
  background: #4299e1;
  color: white;
  border-color: #4299e1;
}

@media (max-width: 768px) {
  .guru-list-container {
    padding: 1rem;
  }
  
  .search-filter-section {
    flex-direction: column;
  }
  
  .search-box {
    min-width: auto;
  }
  
  .filter-options {
    flex-direction: column;
  }
  
  .table-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .guru-table th,
  .guru-table td {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style> 