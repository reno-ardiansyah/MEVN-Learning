<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPhoneNumbers, deletePhoneNumber } from '@/services/phoneNumberService';
import type { PhoneNumber } from '@/services/phoneNumberService';

const phoneNumbers = ref<PhoneNumber[]>([]);
const loading = ref(true);
const currentPage = ref(1);
const perPage = ref(10);
const totalPages = ref(1);

const fetchPhoneNumbers = async (page = 1) => {
  try {
    loading.value = true;
    const response = await getPhoneNumbers(page, perPage.value);
    phoneNumbers.value = response.phoneNumbers;
    totalPages.value = Math.ceil(response.totalCount / perPage.value);
  } catch (error) {
    console.error('Error fetching phone numbers:', error);
  } finally {
    loading.value = false;
  }
};

const handleDelete = async (id: string) => {
  try {
    await deletePhoneNumber(id);
    fetchPhoneNumbers(currentPage.value); // Refresh data after delete
  } catch (error) {
    console.error('Error deleting phone number:', error);
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
  fetchPhoneNumbers(page);
};

onMounted(() => fetchPhoneNumbers(currentPage.value));
</script>

<template>
  <div v-if="loading" class="text-center py-6 h-[56.5vh] content-center">Loading...</div>

  <table v-else class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Person</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="(phoneNumber, index) in phoneNumbers" :key="phoneNumber.id">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ index + 1 }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ phoneNumber.number }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ phoneNumber.type }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ phoneNumber.people.name }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ phoneNumber.createdAt }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ phoneNumber.updatedAt }}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button @click="$emit('edit', phoneNumber)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
          <button @click="handleDelete(phoneNumber.id)" class="ml-4 text-red-600 hover:text-red-900">Delete</button>
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
