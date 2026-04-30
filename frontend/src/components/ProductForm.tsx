import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { ProductDTO, CreateProductRequest } from '../types/product';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string(),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  quantity: z.coerce.number().min(0, 'Quantity cannot be negative'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: ProductDTO | null;
  onSubmit: (data: CreateProductRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        {product ? 'Edit Product' : 'Create Product'}
      </h2>

      <Input
        label="Product Name"
        placeholder="Enter product name"
        error={errors.name?.message}
        {...register('name')}
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Description
        </label>
        <textarea
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product description"
          rows={3}
          {...register('description')}
        />
      </div>

      <Input
        label="Price"
        type="number"
        step="0.01"
        placeholder="0.00"
        error={errors.price?.message}
        {...register('price')}
      />

      <Input
        label="Quantity"
        type="number"
        placeholder="0"
        error={errors.quantity?.message}
        {...register('quantity')}
      />

      <div className="flex gap-3 pt-4">
        <Button type="submit" isLoading={isLoading} className="flex-1">
          {product ? 'Update' : 'Create'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};
