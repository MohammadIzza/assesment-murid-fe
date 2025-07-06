<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const route = useRoute();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { logout } = authStore;

const showUserMenu = ref(false);
const mobileMenuOpen = ref(false);

const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value;
}

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
}

const handleLogout = async () => {
    await logout();
}

// Menu navigasi utama
const mainMenuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'dashboard' },
    { name: 'Data Guru', path: '/admin/guru', icon: 'users' },
    { name: 'Data Siswa', path: '/admin/siswa', icon: 'academic-cap' },
    { name: 'Penilaian', path: '/admin/assessment', icon: 'clipboard-list' },
    { name: 'Laporan', path: '/admin/reports', icon: 'chart-bar' }
];

// Mendapatkan breadcrumb berdasarkan route
const breadcrumbs = computed(() => {
    const pathSegments = route.path.split('/').filter(segment => segment);
    const breadcrumbItems = [];
    
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
        currentPath += '/' + segment;
        
        let name = segment;
        if (segment === 'admin') name = 'Admin';
        else if (segment === 'guru') name = 'Data Guru';
        else if (segment === 'siswa') name = 'Data Siswa';
        else if (segment === 'dashboard') name = 'Dashboard';
        else if (segment === 'assessment') name = 'Penilaian';
        else if (segment === 'reports') name = 'Laporan';
        else name = segment.charAt(0).toUpperCase() + segment.slice(1);
        
        breadcrumbItems.push({
            name,
            path: currentPath,
            isLast: index === pathSegments.length - 1
        });
    });
    
    return breadcrumbItems;
});

const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().substring(0, 2);
};

const getIcon = (iconName) => {
    const icons = {
        dashboard: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z M8 13v4M12 9v8M16 11v6',
        users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
        'academic-cap': 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
        'clipboard-list': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
        'chart-bar': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    };
    return icons[iconName] || icons.dashboard;
};
</script>

<template>
    <!-- Main Navbar -->
    <nav class="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <!-- Logo & Brand -->
                <div class="flex items-center">
                    <router-link to="/admin/dashboard" class="flex items-center group">
                        <div class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mr-3 group-hover:shadow-lg transition-all duration-300">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <div>
                            <span class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Assessment Murid</span>
                            <div class="text-xs text-gray-500 font-medium">Management System</div>
                        </div>
                    </router-link>
                </div>

                <!-- Desktop Navigation Menu -->
                <div class="hidden lg:flex items-center space-x-1">
                    <div v-for="item in mainMenuItems" :key="item.path" class="relative">
                        <router-link
                            :to="item.path"
                            class="flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group"
                            :class="[
                                route.path.startsWith(item.path) 
                                    ? 'bg-blue-50 text-blue-700 shadow-sm' 
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            ]"
                        >
                            <svg class="w-4 h-4 mr-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIcon(item.icon)"></path>
                            </svg>
                            {{ item.name }}
                            
                            <!-- Active indicator -->
                            <div v-if="route.path.startsWith(item.path)" 
                                class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full">
                            </div>
                        </router-link>
                    </div>
                </div>

                <!-- Right Side -->
                <div class="flex items-center space-x-4">
                    <!-- Notifications -->
                    <button class="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5-5-5 5h5zm-5-8a3 3 0 106 0 3 3 0 00-6 0z M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"></path>
                        </svg>
                        <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                            <span class="w-1.5 h-1.5 bg-white rounded-full"></span>
                        </span>
                    </button>

                    <!-- User Menu -->
                    <div class="relative">
                        <button @click="toggleUserMenu()"
                            class="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 group">
                            <div class="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full ring-2 ring-white shadow-sm">
                                <span class="text-sm font-bold text-white">
                                    {{ getInitials(user?.name) }}
                                </span>
                            </div>
                            <div class="hidden sm:block text-left">
                                <div class="text-sm font-semibold text-gray-900">{{ user?.name || 'User' }}</div>
                                <div class="text-xs text-gray-500">{{ user?.role || 'Administrator' }}</div>
                            </div>
                            <svg class="w-4 h-4 text-gray-500 transition-transform duration-200 group-hover:text-gray-700" 
                                :class="{ 'rotate-180': showUserMenu }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        
                        <!-- Dropdown Menu -->
                        <transition
                            enter-active-class="transition ease-out duration-200"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95"
                        >
                            <div v-if="showUserMenu"
                                class="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                                <!-- User Info -->
                                <div class="px-4 py-3 border-b border-gray-100">
                                    <div class="flex items-center space-x-3">
                                        <div class="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full">
                                            <span class="text-sm font-bold text-white">{{ getInitials(user?.name) }}</span>
                                        </div>
                                        <div>
                                            <p class="text-sm font-semibold text-gray-900">{{ user?.name || 'User' }}</p>
                                            <p class="text-xs text-gray-500">{{ user?.email || 'user@email.com' }}</p>
                                            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                                                <span class="w-1 h-1 bg-green-500 rounded-full mr-1"></span>
                                                Online
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Menu Items -->
                                <div class="py-1">
                                    <button class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <svg class="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                        </svg>
                                        Profil Saya
                                    </button>
                                    <button class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                        <svg class="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        Pengaturan
                                    </button>
                                    <hr class="my-1 border-gray-100">
                                    <button @click="handleLogout"
                                        class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                        <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                        </svg>
                                        Keluar
                                    </button>
                                </div>
                            </div>
                        </transition>
                    </div>

                    <!-- Mobile menu button -->
                    <button @click="toggleMobileMenu" 
                        class="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                :d="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
        >
            <div v-if="mobileMenuOpen" class="lg:hidden bg-white border-t border-gray-200 shadow-lg">
                <div class="px-4 py-2 space-y-1">
                    <router-link
                        v-for="item in mainMenuItems"
                        :key="item.path"
                        :to="item.path"
                        @click="mobileMenuOpen = false"
                        class="flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors"
                        :class="[
                            route.path.startsWith(item.path) 
                                ? 'bg-blue-50 text-blue-700' 
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        ]"
                    >
                        <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIcon(item.icon)"></path>
                        </svg>
                        {{ item.name }}
                    </router-link>
                </div>
            </div>
        </transition>
    </nav>

    <!-- Breadcrumb Navigation -->
    <div v-if="breadcrumbs.length > 1" class="bg-gray-50 border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center py-3">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="flex items-center space-x-2">
                        <li v-for="(crumb, index) in breadcrumbs" :key="crumb.path" class="flex items-center">
                            <router-link
                                v-if="!crumb.isLast"
                                :to="crumb.path"
                                class="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                {{ crumb.name }}
                            </router-link>
                            <span v-else class="text-sm font-semibold text-gray-900">
                                {{ crumb.name }}
                            </span>
                            
                            <svg v-if="!crumb.isLast" class="w-4 h-4 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</template>