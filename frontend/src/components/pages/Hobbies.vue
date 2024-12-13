<script setup lang="ts">
import { ref } from 'vue';
import HobbyTable from '@/components/fragments/HobbyTable.vue';
import HobbyModal from '@/components/ui/HobbyModal.vue';
import { createHobby, updateHobby } from '@/services/hobbyService';
import type { Hobby } from '@/services/hobbyService';

const showModal = ref(false);
const editingHobby = ref<Hobby | null>(null);

const openModal = (hobby?: Hobby) => {
  editingHobby.value = hobby || null;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleFormSubmit = async (hobby: { name: string; description: string }) => {
  try {
    if (editingHobby.value) {
      await updateHobby(editingHobby.value.id, hobby);
    } else {
      await createHobby(hobby);
    }
    closeModal();
    window.location.reload(true)
  } catch (error) {
    console.error('Error saving hobby:', error);
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Hobbies</h1>
    <button @click="openModal()" class="mb-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Hobby</button>
    <HobbyTable @edit="openModal" />
    <HobbyModal v-if="showModal" :hobby="editingHobby" @submit="handleFormSubmit" @close="closeModal" />
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
