import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitAdhesion = async (formData) => {
  try {
    const response = await apiClient.post('/adhesions', {
      name: formData.name,
      email: formData.email,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error submitting adhesion:', error.response?.data || error);
    throw error;
  }
};

export default apiClient;