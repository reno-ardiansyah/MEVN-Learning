<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPeople, deletePerson } from '@/services/peopleService';
import type { Person } from '@/services/personService';

const people = ref<Person[]>([]);
const loading = ref(true);
const currentPage = ref(1);
const perPage = ref(10);
const totalPages = ref(1);

const fetchPeople = async (page = 1) => {
  try {
    loading.value = true;
    const response = await getPeople(page, perPage.value);
    people.value = response.data;
    totalPages.value = Math.ceil(response.totalCount / perPage.value);
  } catch (error) {
    console.error('Error fetching people:', error);
  } finally {
    loading.value = false;
  }
};

const handleDelete = async (id: string) => {
  try {
    await deletePerson(id);
    fetchPeople(currentPage.value); // Refresh data after delete
  } catch (error) {
    console.error('Error deleting person:', error);
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchPeople(page);
};

onMounted(() => fetchPeople(currentPage.value));
</script>

<template>
  <div v-if="loading" class="text-center py-6 h-[56.5vh] content-center">Loading...</div>

  <table v-else class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">hobby</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="(person, index) in people" :key="person.id">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ index + 1 }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ person.name }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ person.age }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <span class="bg-orange-400 rounded mr-2 p-2 text-white" v-if="person.hobbies.length" v-for="(hobby, index) in person.hobbies" :key="index">{{ hobby.name }}</span>
          <span class="bg-red-400 rounded p-2 text-white" v-else>No Hobby</span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ person.createdAt }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ person.updatedAt }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button @click="$emit('edit', person)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
          <button @click="handleDelete(person.id)" class="ml-4 text-red-600 hover:text-red-900">Delete</button>
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
