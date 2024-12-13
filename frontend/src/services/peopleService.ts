import axiosInstance from '../axios';

// Fungsi untuk mendapatkan semua orang (people)
export const getPeople = async (page: string, limit: string) => {
  try {
    const response = await axiosInstance.get(`/people?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching people:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan data orang berdasarkan ID
export const getPersonById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/people/${id}`);
    return response.data; // Mengembalikan data orang berdasarkan ID
  } catch (error) {
    console.error('Error fetching person:', error);
    throw error;
  }
};

// Fungsi untuk menambahkan orang baru
export const addPerson = async (name: string, age: number, hobbies: string[]) => {
  try {
    const response = await axiosInstance.post('/people', { name, age, hobbies });
    return response.data; // Mengembalikan data orang yang baru ditambahkan
  } catch (error) {
    console.error('Error adding person:', error);
    throw error;
  }
};

// Fungsi untuk memperbarui data orang
export const updatePerson = async (id: string, name: string, age: number, hobbies: string[]) => {
  try {
    const response = await axiosInstance.put(`/people/${id}`, { name, age, hobbies });
    return response.data; // Mengembalikan data orang yang telah diperbarui
  } catch (error) {
    console.error('Error updating person:', error);
    throw error;
  }
};

// Fungsi untuk menghapus data orang
export const deletePerson = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/people/${id}`);
    return response.data; // Mengembalikan konfirmasi penghapusan
  } catch (error) {
    console.error('Error deleting person:', error);
    throw error;
  }
};
