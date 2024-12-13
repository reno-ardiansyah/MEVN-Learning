<template>
  <div class="register-container">
    <h1 class="text-2xl font-bold">Register</h1>
    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label for="name" class="block text-sm">Name</label>
        <input v-model="name" id="name" type="text" placeholder="Enter your name" class="border p-2 w-full"/>
      </div>
      <div>
        <label for="email" class="block text-sm">Email</label>
        <input v-model="email" id="email" type="email" placeholder="Enter your email" class="border p-2 w-full"/>
      </div>
      <div>
        <label for="password" class="block text-sm">Password</label>
        <input v-model="password" id="password" type="password" placeholder="Enter password" class="border p-2 w-full"/>
      </div>
      <div class="text-center">
        <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded">Register</button>
      </div>
    </form>
    <div class="text-center mt-4">
      <p>Already have an account? <router-link to="/login" class="text-blue-500">Login</router-link></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register } from '@/services/authService';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');

const handleRegister = async () => {
  try {
    await register(name.value, email.value, password.value);
    // Setelah registrasi berhasil, arahkan ke halaman login
    router.push('/login');
  } catch (error) {
    console.error('Registration failed:', error);
    alert('Registration failed! Please try again.');
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
