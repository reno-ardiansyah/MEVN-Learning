import axiosInstance from '../axios';

export interface PhoneNumber {
  id: string;
  number: string;
  type: string;
  people: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface PhoneNumberResponse {
  status: string;
  currentPage: number;
  perPage: number;
  totalCount: number;
  phoneNumbers: PhoneNumber[];
}

const PHONE_NUMBER_URL = "/phone-number";

// Function to fetch all phone numbers with pagination
export const getPhoneNumbers = async (page = 1, limit = 10): Promise<PhoneNumberResponse> => {
  try {
    const response = await axiosInstance.get<PhoneNumberResponse>(`${PHONE_NUMBER_URL}/paginated`, {
      params: { page, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching phone numbers:', error);
    throw error;
  }
};

// Function to fetch all phone numbers (no pagination)
export const getAllPhoneNumbers = async (): Promise<PhoneNumber[]> => {
  try {
    const response = await axiosInstance.get<PhoneNumberResponse>(`${PHONE_NUMBER_URL}/all`, {
      params: { page: 1, limit: 1000 }, // Adjust limit to a large value to fetch all phone numbers
    });
    return response.data.phoneNumbers;
  } catch (error) {
    console.error('Error fetching all phone numbers:', error);
    throw error;
  }
};

// Function to create a new phone number
export const createPhoneNumber = async (phoneNumber: { number: string; type: string; peopleId: string }): Promise<PhoneNumber> => {
  try {
    const response = await axiosInstance.post<PhoneNumber>(PHONE_NUMBER_URL, phoneNumber);
    return response.data;
  } catch (error) {
    console.error('Error creating phone number:', error);
    throw error;
  }
};

// Function to fetch a phone number by ID
export const getPhoneNumberById = async (id: string): Promise<PhoneNumber> => {
  try {
    const response = await axiosInstance.get<PhoneNumber>(`${PHONE_NUMBER_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching phone number by ID:', error);
    throw error;
  }
};

// Function to update a phone number
export const updatePhoneNumber = async (
  id: string,
  phoneNumber: { number: string; type: string; peopleId: string }
): Promise<PhoneNumber> => {
  try {
    const response = await axiosInstance.put<PhoneNumber>(`${PHONE_NUMBER_URL}/${id}`, phoneNumber);
    return response.data;
  } catch (error) {
    console.error('Error updating phone number:', error);
    throw error;
  }
};

// Function to delete a phone number
export const deletePhoneNumber = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`${PHONE_NUMBER_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting phone number:', error);
    throw error;
  }
};
