import axios from 'axios';
import { useAuthStore } from '../store/authStore';

export const API_BASE_URL = '/api';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRoute = error.config?.url?.includes('/auth/');
    const hasToken = !!useAuthStore.getState().token;

    // Só redireciona para login se o usuário estava autenticado
    // e recebeu 401 em uma rota protegida (token expirado/inválido)
    if (error.response?.status === 401 && !isAuthRoute && hasToken) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
