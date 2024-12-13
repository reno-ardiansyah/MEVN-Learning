import axiosInstance from '../axios';

// Interceptor untuk menambahkan header Authorization
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const editProfile = async (id: string, name: string, email: string, password?: string) => {
  const payload: { name: string; email: string; password?: string } = { name, email };
  if (password) {
    payload.password = password;
  }
  const response = await axiosInstance.put(`/auth/${id}`, payload);
  return response.data;
};

export const getProfile = async (id: string) => {
  const response = await axiosInstance.get(`/auth/${id}`);
  return response.data;
};
