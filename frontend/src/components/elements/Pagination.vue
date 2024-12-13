<template>
  <div class="flex justify-center mt-4">
    <button 
      @click="handlePageChange(current - 1)"
      :disabled="current === 1"
      class="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
    >
      Previous
    </button>
    <span class="px-4 py-2 text-gray-600">Page {{ current }} of {{ total }}</span>
    <button 
      @click="handlePageChange(current + 1)"
      :disabled="current === total"
      class="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, emit } from 'vue';
import { useRouter } from 'vue-router';

// Props untuk menerima halaman saat ini dan total halaman
const props = defineProps({
  current: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

// Router untuk memperbarui URL
const router = useRouter();

// Fungsi untuk menangani perubahan halaman
const handlePageChange = (newPage: number) => {
  if (newPage > 0 && newPage <= props.total) {
    // Update URL dengan query parameter page
    router.push({ query: { page: newPage.toString() } });
  }
};
</script>
