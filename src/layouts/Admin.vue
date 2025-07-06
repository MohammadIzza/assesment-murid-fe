<script setup>
import Navbar from '@/components/admin/Navbar.vue'
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Navbar -->
        <Navbar />
        
        <!-- Main Content -->
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>