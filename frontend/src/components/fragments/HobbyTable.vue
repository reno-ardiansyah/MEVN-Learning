<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getHobbies, deleteHobby } from '@/services/hobbyService';
import type { Hobby } from '@/services/hobbyService';

const hobbies = ref<Hobby[]>([]);
const loading = ref(true);
const currentPage = ref(1);
const perPage = ref(10);
const totalPages = ref(1);

const fetchHobbies = async (page = 1) => {
  try {
    loading.value = true;
    const response = await getHobbies(page, perPage.value);
    hobbies.value = response.data;
    totalPages.value = Math.ceil(response.totalCount / perPage.value);
  } catch (error) {
    console.error('Error fetching hobbies:', error);
  } finally {
    loading.value = false;
  }
};

const handleDelete = async (id: string) => {
  try {
    await deleteHobby(id);
    fetchHobbies(currentPage.value); // Refresh data setelah delete
  } catch (error) {
    console.error('Error deleting hobby:', error);
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchHobbies(page);
};

onMounted(() => fetchHobbies(currentPage.value));
</script>

<template>
  <div v-if="loading" class="text-center py-6 h-[56.5vh] content-center">Loading...</div>

  <table v-else class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="(hobby, index) in hobbies" :key="hobby.id">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ index + 1 }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ hobby.name }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ hobby.description }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ hobby.createdAt }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ hobby.updatedAt }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button @click="$emit('edit', hobby)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
          <button @click="handleDelete(hobby.id)" class="ml-4 text-red-600 hover:text-red-900">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Pagination -->
  <div class="flex justify-center mt-4">
    <button 
      @click="handlePageChange(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
    >
      Previous
    </button>
    <span class="px-4 py-2 text-gray-600">Page {{ currentPage }} of {{ totalPages }}</span>
    <button 
      @click="handlePageChange(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
/* Additional styles if needed */
button:disabled {
  cursor: not-allowed;
}
</style>
