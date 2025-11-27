import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:1337/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface AdhesionFormData {
  name: string;
  email: string;
  comment?: string;
  receiveInfo: boolean;
}

export interface Adhesion {
  id: number;
  name: string;
  email: string;
  comment: string | null;
  newsletter: boolean;
  created_at: string;
}

export interface PaginatedAdhesions {
  data: Adhesion[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const submitAdhesion = async (formData: AdhesionFormData) => {
  try {
    console.log(formData);
    const response = await apiClient.post('/v1/adhesions', {
      name: formData.name,
      email: formData.email,
      comment: formData.comment,
      receiveInfo: formData.receiveInfo,
    });
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error submitting adhesion:', error.response?.data ?? error.message);
      throw error;
    }
    console.error('Error submitting adhesion:', error);
    throw error;
  }
};

export const getAdhesions = async (credentials: string, page: number = 1, limit: number = 10): Promise<PaginatedAdhesions> => {
  try {
    const response = await apiClient.get('/v1/adhesions', {
      params: { page, limit },
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching adhesions:', error.response?.data ?? error.message);
      throw error;
    }
    console.error('Error fetching adhesions:', error);
    throw error;
  }
};

export default apiClient;