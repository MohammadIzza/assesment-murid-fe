<!-- Debug Component -->
<template>
  <div class="bg-white shadow rounded-lg p-6 max-w-7xl mx-auto mt-8">
    <h1 class="text-2xl font-bold mb-6">Admin Role Debug Information</h1>
    
    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <h2 class="text-lg font-semibold mb-3">User Information</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-3 rounded shadow-sm">
          <p class="text-gray-600 text-sm">Name:</p>
          <p class="font-medium">{{ authStore.user?.name || 'Not available' }}</p>
        </div>
        <div class="bg-white p-3 rounded shadow-sm">
          <p class="text-gray-600 text-sm">Email:</p>
          <p class="font-medium">{{ authStore.user?.email || 'Not available' }}</p>
        </div>
        <div class="bg-white p-3 rounded shadow-sm">
          <p class="text-gray-600 text-sm">ID:</p>
          <p class="font-medium">{{ authStore.user?.id || 'Not available' }}</p>
        </div>
        <div class="bg-white p-3 rounded shadow-sm">
          <p class="text-gray-600 text-sm">ID Role:</p>
          <p class="font-medium" :class="{'text-green-600': isIdRoleAdmin, 'text-red-600': !isIdRoleAdmin}">
            {{ authStore.user?.id_role || 'Not available' }}
            <span v-if="isIdRoleAdmin" class="ml-2">(Admin)</span>
            <span v-else class="ml-2">(Not Admin)</span>
          </p>
          <p class="text-xs text-gray-500">Type: {{ typeof authStore.user?.id_role }}</p>
          <p class="text-xs text-gray-500">Parsed as number: {{ parseInt(authStore.user?.id_role) }}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <h2 class="text-lg font-semibold mb-3">Role Information</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-3 rounded shadow-sm">
          <p class="text-gray-600 text-sm">User Role (State):</p>
          <p class="font-medium" :class="{'text-green-600': isStateRoleAdmin, 'text-red-600': !isStateRoleAdmin}">
            {{ authStore.userRole }}
            <span v-if="isStateRoleAdmin" class="ml-2">(Admin)</span>
            <span v-else class="ml-2">(Not Admin)</span>
          </p>
          <p class="text-xs text-gray-500">Type: {{ typeof authStore.userRole }}</p>
          <p class="text-xs text-gray-500">Parsed as number: {{ parseInt(authStore.userRole) }}</p>
          <p class="text-xs text-gray-500">Is Equal to 1: {{ parseInt(authStore.userRole) === 1 ? 'Yes' : 'No' }}</p>
        </div>
        <div class="bg-white p-3 rounded shadow-sm">
          <p class="text-gray-600 text-sm">Is Admin (Getter):</p>
          <p class="font-medium" :class="{'text-green-600': authStore.isAdmin, 'text-red-600': !authStore.isAdmin}">
            {{ authStore.isAdmin ? 'Yes' : 'No' }}
          </p>
        </div>
        <div class="bg-white p-3 rounded shadow-sm">
          <p class="text-gray-600 text-sm">Is Guru (Getter):</p>
          <p class="font-medium">{{ authStore.isGuru ? 'Yes' : 'No' }}</p>
        </div>
        <div class="bg-white p-3 rounded shadow-sm">
          <p class="text-gray-600 text-sm">Get User Role:</p>
          <p class="font-medium">{{ authStore.getUserRole }}</p>
        </div>
      </div>
    </div>
    
    <div class="bg-gray-50 p-4 rounded-lg mb-6">
      <h2 class="text-lg font-semibold mb-3">Token Information</h2>
      <div class="grid grid-cols-1 gap-4">
        <div class="bg-white p-3 rounded shadow-sm">
          <p class="text-gray-600 text-sm">Is Authenticated:</p>
          <p class="font-medium">{{ authStore.isAuthenticated ? 'Yes' : 'No' }}</p>
        </div>
        <div class="bg-white p-3 rounded shadow-sm overflow-x-auto">
          <p class="text-gray-600 text-sm">Token:</p>
          <p class="font-mono text-xs">{{ truncatedToken }}</p>
        </div>
      </div>
    </div>
    
    <div class="flex space-x-3 mt-6">
      <button 
        @click="refreshUserInfo" 
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Refresh User Info
      </button>
      <button 
        @click="parseTokenManually" 
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        Parse Token
      </button>
      <button 
        @click="checkAuth" 
        class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
      >
        Check Auth
      </button>
    </div>
    
    <div v-if="decodedToken" class="mt-6 bg-gray-50 p-4 rounded-lg">
      <h2 class="text-lg font-semibold mb-3">Decoded Token</h2>
      <div class="bg-white p-3 rounded shadow-sm overflow-x-auto">
        <pre class="text-xs">{{ JSON.stringify(decodedToken, null, 2) }}</pre>
      </div>
    </div>
    
    <div v-if="refreshResult" class="mt-6 bg-gray-50 p-4 rounded-lg">
      <h2 class="text-lg font-semibold mb-3">Refresh Result</h2>
      <div class="bg-white p-3 rounded shadow-sm">
        <p>{{ refreshResult }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { parseJWT } from '@/utils/jwt'

const authStore = useAuthStore()
const decodedToken = ref(null)
const refreshResult = ref('')

const isIdRoleAdmin = computed(() => {
  const idRole = parseInt(authStore.user?.id_role) || 0
  return idRole === 1
})

const isStateRoleAdmin = computed(() => {
  const stateRole = parseInt(authStore.userRole) || 0
  return stateRole === 1
})

const truncatedToken = computed(() => {
  if (!authStore.token) return 'No token'
  if (authStore.token.length > 30) {
    return authStore.token.substring(0, 15) + '...' + authStore.token.substring(authStore.token.length - 15)
  }
  return authStore.token
})

const refreshUserInfo = async () => {
  try {
    if (!authStore.user?.id) {
      refreshResult.value = 'No user ID available to refresh'
      return
    }
    
    const result = await authStore.fetchUserInfo(authStore.user.id)
    refreshResult.value = result 
      ? 'User info refreshed successfully!' 
      : 'Failed to refresh user info'
  } catch (error) {
    refreshResult.value = `Error refreshing user info: ${error.message}`
  }
}

const parseTokenManually = () => {
  if (!authStore.token) {
    refreshResult.value = 'No token available to parse'
    return
  }
  
  decodedToken.value = parseJWT(authStore.token)
  refreshResult.value = decodedToken.value 
    ? 'Token parsed successfully!' 
    : 'Failed to parse token'
}

const checkAuth = async () => {
  try {
    const isValid = await authStore.checkAuth()
    refreshResult.value = isValid 
      ? 'Auth is valid' 
      : 'Auth is invalid'
  } catch (error) {
    refreshResult.value = `Error checking auth: ${error.message}`
  }
}
</script>