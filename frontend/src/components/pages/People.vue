<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PeopleTable from '@/components/fragments/PeopleTable.vue';
import PeopleModal from '@/components/ui/PeopleModal.vue';
import { addPerson, updatePerson } from '@/services/peopleService';
import type { People } from '@/services/peopleService';
import type { Hobby } from '@/services/hobbyService';

const showModal = ref(false);
const editingPerson = ref<People | null>(null);
const allHobbies = ref<Hobby[]>([]);  // Menyimpan daftar hobby yang bisa dipilih

// Mengambil data hobby untuk dipilih
onMounted(async () => {
  try {

  } catch (error) {
    console.error('Error fetching hobbies:', error);
  }
});

// Fungsi untuk membuka modal, untuk menambah atau mengedit orang
const openModal = (person?: People) => {
  // console.log(person);
  
  editingPerson.value = person || null;
  showModal.value = true;
};

// Fungsi untuk menutup modal
const closeModal = () => {
  showModal.value = false;
};

// Fungsi untuk menangani submit form
const handleFormSubmit = async (person: { name: string; age: number; hobbies: string[] }) => {
  try {
    const personData = {
      name: person.name, // pastikan ini hanya nama sebagai string
      age: person.age,   // ini adalah usia
      hobbies: person.hobbies, // pastikan ini adalah array ID hobby
    };

    if (editingPerson.value) {
      await updatePerson(editingPerson.value.id, personData.name, personData.age, personData.hobbies);
    } else {
      await addPerson(personData.name, personData.age, personData.hobbies);
    }
    closeModal();
    window.location.reload();
  } catch (error) {
    console.error('Error saving person:', error);
  }
};

</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">People</h1>
    <button 
      @click="openModal()" 
      class="mb-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Add Person
    </button>
    <PeopleTable @edit="openModal" />
    <PeopleModal 
      v-if="showModal" 
      :person="editingPerson" 
      @submit="handleFormSubmit" 
      @close="closeModal" 
    />
  </div>
</template>
