<template>
  <div>
    <!-- Redirect ke AdminList -->
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  // Redirect to admin list
  router.replace('/admin/list')
})
</script>