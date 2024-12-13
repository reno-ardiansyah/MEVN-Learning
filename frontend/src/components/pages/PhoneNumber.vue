<script setup lang="ts">
import { ref } from 'vue';
import PhoneNumberTable from '@/components/fragments/PhoneNumberTable.vue';
import PhoneNumberModal from '@/components/ui/PhoneNumberModal.vue';
import { createPhoneNumber, updatePhoneNumber } from '@/services/phoneNumberService';
import type { PhoneNumber } from '@/services/phoneNumberService';

const showModal = ref(false);
const editingPhoneNumber = ref<PhoneNumber | null>(null);

const openModal = (phoneNumber?: PhoneNumber) => {
  editingPhoneNumber.value = phoneNumber || null;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleFormSubmit = async (phoneNumber: { number: string; type: string; peopleId: string; peopleName: string }) => {
  try {
    if (editingPhoneNumber.value) {
      await updatePhoneNumber(editingPhoneNumber.value.id, phoneNumber);
    } else {
      await createPhoneNumber(phoneNumber);
    }
    closeModal();
    window.location.reload(true); // Refresh the page to show the updated list
  } catch (error) {
    console.error('Error saving phone number:', error);
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Phone Numbers</h1>
    <button @click="openModal()" class="mb-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      Add Phone Number
    </button>
    <PhoneNumberTable @edit="openModal" />
    <PhoneNumberModal v-if="showModal" :phoneNumber="editingPhoneNumber" @submit="handleFormSubmit" @close="closeModal" />
  </div>
</template>

<style scoped>
/* Additional styles if needed */
</style>
