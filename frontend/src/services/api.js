import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const optimizeProduct = async (asin) => {
  const response = await api.post('/products/optimize', { asin });
  return response.data;
};

export const getProductHistory = async (asin) => {
  const response = await api.get(`/products/history/${asin}`);
  return response.data;
};

export const getAllHistory = async () => {
  const response = await api.get('/products/history');
  return response.data;
};

export default api;