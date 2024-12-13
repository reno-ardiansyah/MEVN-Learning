import axiosInstance from '../axios';

// Fungsi untuk login
export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', { username, password });
    const { token, user } = response.data;

    // Simpan token dan data user ke localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data; // Mengembalikan data login (token dan user)
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Fungsi untuk registrasi
export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/register', { name, email, password });
    return response.data; // Mengembalikan data registrasi
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

// Fungsi untuk logout
export const logout = () => {
  // Hapus token dan data user dari localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};

// Fungsi untuk mendapatkan profil pengguna
export const getProfile = async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!user || !user._id) throw new Error('User not logged in');

  try {
    const response = await axiosInstance.get(`/auth/${user._id}`);
    
    return response.data; // Mengembalikan data profil
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// Fungsi untuk mengedit profil pengguna
export const editProfile = async (name: string, email: string, password?: string) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user || !user._id) throw new Error('User not logged in');

  const payload: { name: string; email: string; password?: string } = { name, email };
  if (password) {
    payload.password = password; // Hanya mengirim password jika ada
  }

  try {
    const response = await axiosInstance.put(`/auth/${user._id}`, payload);
    // Simpan data user yang baru setelah edit profil
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data; // Mengembalikan data profil yang telah diperbarui
  } catch (error) {
    console.error('Error editing profile:', error);
    throw error;
  }
};

