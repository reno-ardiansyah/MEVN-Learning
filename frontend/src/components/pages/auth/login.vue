<template>
  <div class="login-container">
    <h1 class="text-2xl font-bold">Login</h1>
    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="username" class="block text-sm">Username</label>
        <input v-model="username" id="username" type="text" placeholder="Enter username" class="border p-2 w-full"/>
      </div>
      <div>
        <label for="password" class="block text-sm">Password</label>
        <input v-model="password" id="password" type="password" placeholder="Enter password" class="border p-2 w-full"/>
      </div>
      <div class="text-center">
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
      </div>
    </form>
    <div class="text-center mt-4">
      <p>Don't have an account? <router-link to="/register" class="text-blue-500">Register</router-link></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/services/authService';

const router = useRouter();
const username = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    const response = await login(username.value, password.value);
    // Setelah login berhasil, arahkan ke halaman dashboard atau halaman lain
    router.push('/');
  } catch (error) {
    console.error('Login failed:', error);
    alert('Login failed! Please try again.');
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
