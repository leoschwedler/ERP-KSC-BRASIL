export interface ProductDTO {
  id: number;
  name: string;
  description: string | null;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
}
