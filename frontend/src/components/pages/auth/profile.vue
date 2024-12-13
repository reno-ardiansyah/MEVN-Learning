<template>
  <div v-if="user" class="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
    <h2 class="text-xl font-semibold mb-4">Edit Profile</h2>

    <!-- Form Edit Profile -->
    <form @submit.prevent="handleEditProfile">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your name"
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          class="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your email"
        />
      </div>

      <div class="flex justify-between items-center">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>

  <!-- If no user is logged in, show message -->
  <div v-else class="text-center text-gray-500">
    <p>Please log in to edit your profile.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getProfile, editProfile } from '@/services/authService';

const name = ref('');
const email = ref('');
const password = ref('');
const user = ref<any>(null);

// Fungsi untuk memuat profil pengguna yang sedang login
const loadProfile = async () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    user.value = null; // Tidak ada token, berarti pengguna belum login
    return;
  }

  try {
    const profile = await getProfile();
    user.value = profile;
    name.value = profile.name;
    email.value = profile.email;
  } catch (error) {
    console.error('Error loading profile:', error);
    user.value = null;
  }
};

// Fungsi untuk mengedit profil
const handleEditProfile = async () => {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    console.error('User not logged in');
    return;
  }

  try {
    const updatedProfile = await editProfile(user.value.id, name.value, email.value, password.value);
    console.log('Profile updated successfully', updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

// Memuat profil pengguna saat halaman dimuat
onMounted(loadProfile);
</script>

<style scoped>
/* Styling tambahan jika diperlukan */
</style>
