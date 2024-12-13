import axios from 'axios';
import type { AxiosInstance } from 'axios';

// Membuat instance axios dengan konfigurasi dasar
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // Menggunakan variabel env dengan import.meta.env
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT, 10),  // Menggunakan variabel env
  headers: {
    'Content-Type': 'application/json',
  },
});

// Menambahkan interceptor untuk menangani request dan menambahkan token Bearer
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');  // Mengambil token dari localStorage
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Menambahkan token ke header
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);  // Menangani error jika ada
  }
);

// Menambahkan interceptor untuk menangani response dan error
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error);  // Menangani error API
    return Promise.reject(error);
  }
);

export default axiosInstance;
