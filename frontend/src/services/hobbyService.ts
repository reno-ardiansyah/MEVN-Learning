import axiosInstance from '../axios';

export interface Hobby {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface HobbyResponse {
  status: string;
  currentPage: number;
  perPage: number;
  totalCount: number;
  data: Hobby[];
}

const INITIALISASI_URL = "/hobbies";

// Existing function for paginated hobbies
export const getHobbies = async (page = 1, limit = 10): Promise<HobbyResponse> => {
  try {
    const response = await axiosInstance.get<HobbyResponse>(INITIALISASI_URL, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching hobbies:', error);
    throw error;
  }
};

// New function to fetch all hobbies
export const getAllHobbies = async (): Promise<Hobby[]> => {
  try {
    const response = await axiosInstance.get<HobbyResponse>(`${INITIALISASI_URL}/all`, {
      params: { page: 1, limit: 1000 }, // Adjust limit to a large value to fetch all hobbies
    });
    return response.data.data; // Return the list of hobbies
  } catch (error) {
    console.error('Error fetching all hobbies:', error);
    throw error;
  }
};

export const createHobby = async (hobby: { name: string; description: string }): Promise<Hobby> => {
  try {
    const response = await axiosInstance.post<Hobby>(INITIALISASI_URL, hobby);
    return response.data;
  } catch (error) {
    console.error('Error creating hobby:', error);
    throw error;
  }
};

export const getHobbyById = async (id: string): Promise<Hobby> => {
  try {
    const response = await axiosInstance.get<Hobby>(`${INITIALISASI_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hobby by ID:', error);
    throw error;
  }
};

export const updateHobby = async (
  id: string,
  hobby: { name: string; description: string }
): Promise<Hobby> => {
  try {
    const response = await axiosInstance.put<Hobby>(`${INITIALISASI_URL}/${id}`, hobby);
    return response.data;
  } catch (error) {
    console.error('Error updating hobby:', error);
    throw error;
  }
};

export const deleteHobby = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${INITIALISASI_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting hobby:', error);
    throw error;
  }
};
