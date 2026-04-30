import { axiosInstance } from './axiosInstance';
import { UserDTO } from '../types/user';
import { CreateUserRequest } from '../types/user';

export const userApi = {
  getAll: (): Promise<UserDTO[]> => {
    return axiosInstance.get('/users').then((res) => res.data);
  },

  getById: (id: number): Promise<UserDTO> => {
    return axiosInstance.get(`/users/${id}`).then((res) => res.data);
  },

  create: (data: CreateUserRequest): Promise<UserDTO> => {
    return axiosInstance.post('/users', data).then((res) => res.data);
  },

  update: (id: number, data: CreateUserRequest): Promise<UserDTO> => {
    return axiosInstance.put(`/users/${id}`, data).then((res) => res.data);
  },

  delete: (id: number): Promise<void> => {
    return axiosInstance.delete(`/users/${id}`).then(() => undefined);
  },
};
