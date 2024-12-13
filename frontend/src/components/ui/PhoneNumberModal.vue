<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPeople } from '@/services/peopleService'; // Import the getPeople function
import type { PhoneNumber } from '@/services/phoneNumberService';
import type { People } from '@/services/peopleService';

const props = defineProps<{ phoneNumber?: PhoneNumber | null }>();
const emits = defineEmits(['submit', 'close']);

const number = ref(props.phoneNumber?.number || '');
const type = ref(props.phoneNumber?.type || '');
const selectedPersonId = ref(props.phoneNumber?.people.id || ''); // Store selected person's ID
const peopleList = ref<People[]>([]);

const nameInput = ref<HTMLInputElement | null>(null);

// Fetch people when the modal is opened
onMounted(async () => {
  try {
    const peopleData = await getPeople(1, 100); // Get people (adjust pagination if needed)
    peopleList.value = peopleData.data; // Assuming the response has a `items` property for people
  } catch (error) {
    console.error('Error fetching people:', error);
  }

  if (nameInput.value) {
    nameInput.value.focus();
  }
});

// Submit the form
const submitForm = () => {
  const phoneNumberData = {
    number: number.value,
    type: type.value,
    peopleId: selectedPersonId.value, // Use the selected person's ID
    peopleName: peopleList.value.find(person => person.id === selectedPersonId.value)?.name || '',
  };

  emits('submit', phoneNumberData);
  emits('close');
};

// Close modal
const closeModal = () => {
  emits('close');
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    @click="closeModal"
  >
    <div
      class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 scale-100 hover:scale-105"
      @click.stop
    >
      <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">{{ props.phoneNumber ? 'Edit Phone Number' : 'Add Phone Number' }}</h2>
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Phone Number Field -->
        <div>
          <label for="number" class="block text-sm font-medium text-gray-700">Phone Number:</label>
          <input
            id="number"
            v-model="number"
            ref="nameInput"
            type="text"
            required
            class="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <!-- Phone Type Field -->
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700">Type:</label>
          <input
            id="type"
            v-model="type"
            type="text"
            required
            class="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <!-- Person Selection -->
        <div>
          <label for="person" class="block text-sm font-medium text-gray-700">Person:</label>
          <select
            id="person"
            v-model="selectedPersonId"
            required
            class="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="" disabled>Select a person</option>
            <option
              v-for="person in peopleList"
              :key="person.id"
              :value="person.id"
            >
              {{ person.name }}
            </option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="closeModal"
            class="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Animasi fade-in untuk modal */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Modal background dengan animasi fade-in */
.fixed {
  animation: fadeIn 0.3s ease-in-out;
}

/* Modal style untuk memberi efek shadow dan padding lebih besar */
.bg-white {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border-radius: 8px;
}

/* Menambahkan padding dan margin pada elemen input dan textarea */
input,
select {
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  transition: all 0.2s ease-in-out;
}

input:focus,
select:focus {
  border-color: #4c51bf;
  outline: none;
}

/* Membuat tombol lebih besar dan lebih mudah diakses */
button {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-weight: 500;
  border-radius: 0.375rem;
}

button:hover {
  background-color: #4c51bf;
}

/* Memastikan modal memiliki tampilan yang konsisten pada layar kecil */
@media (max-width: 640px) {
  .bg-white {
    padding: 1.5rem;
  }
}
</style>
