import { axiosInstance } from './axiosInstance';
import { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth';

export const authApi = {
  login: (credentials: LoginRequest): Promise<LoginResponse> => {
    return axiosInstance.post('/auth/login', credentials).then((res) => res.data);
  },

  register: (data: RegisterRequest): Promise<LoginResponse> => {
    return axiosInstance.post('/auth/register', data).then((res) => res.data);
  },
};
