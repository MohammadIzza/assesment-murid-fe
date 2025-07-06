<script setup>
    // Tidak perlu auth store untuk demo
</script>

<template>
    <aside class="w-64 bg-white shadow-lg">
        <div class="p-6 border-b border-gray-100">
            <h1 class="text-2xl font-bold text-blue-600 flex items-center">
                <i data-feather="users" class="w-8 h-8 mr-2"></i>
                Guru Management
            </h1>
        </div>
        <nav class="mt-6">
            <RouterLink :to="{ name: 'guru-index' }"
                class="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-200"
                :class="{ 'bg-blue-50 border-l-4 border-blue-600': $route.name === 'guru-index' || $route.name === 'guru-list' || $route.name === 'guru-detail' }">
                <i data-feather="home" class="w-5 h-5 mr-3"></i>
                Dashboard
            </RouterLink>
            <RouterLink :to="{ name: 'guru-list' }"
                class="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:border-l-4 hover:border-gray-200"
                :class="{ 'bg-blue-50 border-l-4 border-blue-600': $route.name === 'guru-list' }">
                <i data-feather="list" class="w-5 h-5 mr-3"></i>
                Daftar Guru
            </RouterLink>
        </nav>
    </aside>
</template>