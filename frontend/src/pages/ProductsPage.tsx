import { useState } from 'react';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../hooks/useProducts';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Button } from '../components/ui/Button';
import { ProductForm } from '../components/ProductForm';
import { ProductDTO, CreateProductRequest } from '../types/product';

export const ProductsPage: React.FC = () => {
  const { data: products = [], isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDTO | null>(null);

  const handleCreate = (data: CreateProductRequest) => {
    createProduct.mutate(data, {
      onSuccess: () => {
        setShowForm(false);
      },
    });
  };

  const handleUpdate = (data: CreateProductRequest) => {
    if (editingProduct) {
      updateProduct.mutate(
        { id: editingProduct.id, data },
        {
          onSuccess: () => {
            setEditingProduct(null);
          },
        }
      );
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct.mutate(id);
    }
  };

  const handleEdit = (product: ProductDTO) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-600 mt-2">Manage your product catalog</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdate : handleCreate}
            onCancel={handleCloseForm}
            isLoading={createProduct.isPending || updateProduct.isPending}
          />
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {products.length === 0 ? (
          <div className="p-8 text-center text-slate-600">
            <p>No products found. Create one to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {product.description?.substring(0, 50)}...
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 text-right font-medium">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 text-right">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(product)}
                        className="text-blue-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
