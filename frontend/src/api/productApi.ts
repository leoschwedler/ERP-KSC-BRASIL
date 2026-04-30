import { axiosInstance } from './axiosInstance';
import { ProductDTO, CreateProductRequest } from '../types/product';

export const productApi = {
  getAll: (): Promise<ProductDTO[]> => {
    return axiosInstance.get('/products').then((res) => res.data);
  },

  getById: (id: number): Promise<ProductDTO> => {
    return axiosInstance.get(`/products/${id}`).then((res) => res.data);
  },

  create: (data: CreateProductRequest): Promise<ProductDTO> => {
    return axiosInstance.post('/products', data).then((res) => res.data);
  },

  update: (id: number, data: CreateProductRequest): Promise<ProductDTO> => {
    return axiosInstance.put(`/products/${id}`, data).then((res) => res.data);
  },

  delete: (id: number): Promise<void> => {
    return axiosInstance.delete(`/products/${id}`).then(() => undefined);
  },
};
