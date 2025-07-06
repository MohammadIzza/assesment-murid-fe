<template>
  <div class="guru-index-container">
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Mengalihkan ke halaman guru...</p>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'GuruIndex',
  setup() {
    const router = useRouter()

    onMounted(() => {
      // Redirect ke halaman list guru
      router.replace({ name: 'guru-list' })
    })
  }
}
</script>

<style scoped>
.guru-index-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.loading-container {
  text-align: center;
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
</style> 