<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
    @click="closeModal"
  >
    <div
      class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-300 scale-100 hover:scale-105"
      @click.stop
    >
      <h2 class="text-2xl font-semibold text-center mb-6 text-gray-800">{{ props.person ? 'Edit Person' : 'Add Person' }}</h2>
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- Name Field -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            class="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <!-- Age Field -->
        <div>
          <label for="age" class="block text-sm font-medium text-gray-700">Age:</label>
          <input
            id="age"
            v-model="age"
            type="number"
            required
            class="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <!-- Hobbies Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Hobbies:</label>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="hobby in hobbiesList" :key="hobby.id" class="flex items-center space-x-2">
              <input
                type="checkbox"
                :value="hobby.id"
                v-model="selectedHobbies"
                :checked="selectedHobbies.includes(hobby.id)"
                class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label :for="`hobby-${hobby.id}`" class="text-sm text-gray-700">{{ hobby.name }}</label>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue'
import { getAllHobbies } from '@/services/hobbyService'
import type { Hobby } from '@/services/hobbyService'

const props = defineProps<{ person?: { name: string; age: number; hobbies: Hobby[] } }>()
const emits = defineEmits(['submit', 'close'])

const name = ref(props.person?.name || '')
const age = ref(props.person?.age || 0)

// Mengubah data hobbies menjadi hanya ID saat edit
const selectedHobbies = ref<string[]>(props.person?.hobbies.map(hobby => hobby.id) || [])
const hobbiesList = ref<Hobby[]>([])

// Mengambil data hobbies dari API saat komponen dimuat
onMounted(async () => {
  try {
    const response = await getAllHobbies()
    hobbiesList.value = response
  } catch (error) {
    console.error('Error fetching hobbies:', error)
  }
})

// Submit form
const submitForm = () => {
  emits('submit', {
    name: name.value,
    age: age.value,
    hobbies: selectedHobbies.value, // Mengirim ID hobbies
  })
  emits('close')
}

// Close modal
const closeModal = () => {
  emits('close')
}
</script>

<style scoped>
/* Menambahkan transisi animasi untuk efek pembesaran modal */
.fixed {
  animation: fadeIn 0.3s ease-in-out;
}

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
</style>
