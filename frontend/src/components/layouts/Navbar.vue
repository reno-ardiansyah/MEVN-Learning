<template>
  <nav class="flex justify-between items-center px-6 py-4 bg-gray-100 shadow">
    <NavbarBrand>MEVN <span class="text-orange-500">Learning</span></NavbarBrand>
    <NavbarLinks>
      <router-link to="/">Home</router-link>
      <router-link to="/hobbies">Hobbies</router-link>
      <router-link to="/people">People</router-link>
      <router-link to="/phone-number">Phone Number</router-link>
    </NavbarLinks>
    <!-- Jika ada token, tampilkan tombol "Edit Account" atau tombol "Logout", jika tidak tampilkan tombol "Sign In" -->
    <div>
      <template v-if="isAuthenticated">
        <!-- Tombol Edit Account -->
        <router-link to="/account/edit">
          <ui-button variant="primary">Edit Account</ui-button>
        </router-link>
        <!-- Tombol Logout -->
        <button class="bg-red-500 p-2 ms-2 rounded text-white" @click="logout">Logout</button>
      </template>
      <template v-else>
        <router-link to="/auth/login">
          <ui-button variant="primary">Sign In</ui-button>
        </router-link>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import NavbarBrand from '@/components/fragments/NavbarBrand.vue';
import NavbarLinks from '@/components/fragments/NavbarLinks.vue';
import UiButton from '@/components/ui/Button.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

// Periksa apakah ada token di localStorage
const isAuthenticated = computed(() => {
  return localStorage.getItem('authToken') !== null;
});

// Router instance untuk redirect
const router = useRouter();

// Fungsi logout
const logout = () => {
  // Hapus token dari localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user'); // Jika perlu menghapus data pengguna lain
  
  // Redirect ke halaman login setelah logout
  router.push('/auth/login');
};
</script>

<style scoped> 
/* Additional styles if needed */
</style>
