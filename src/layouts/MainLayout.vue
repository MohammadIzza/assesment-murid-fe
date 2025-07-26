<!-- filepath: g:\KERJAAN\Om Nusa\assesment-murid-fe\src\layouts\MainLayout.vue -->
<!-- Tambahkan link ke navigasi -->
<router-link 
  :to="{ name: 'laporan-nilai' }" 
  class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200"
  :class="[
    $route.name === 'laporan-nilai' 
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200' 
      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
  ]"
>
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
  <span>Laporan</span>
</router-link>