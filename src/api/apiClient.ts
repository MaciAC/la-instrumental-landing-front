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

export default apiClient;