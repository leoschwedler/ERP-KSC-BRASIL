import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { UserDTO, CreateUserRequest } from '../types/user';
import { Role } from '../types/auth';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  role: z.enum(['ADMIN', 'USER']),
});

type UserFormData = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: UserDTO | null;
  onSubmit: (data: CreateUserRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  user,
  onSubmit,
  onCancel,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user || { role: 'USER' },
  });

  const handleFormSubmit = (data: UserFormData) => {
    const submitData: CreateUserRequest = {
      name: data.name,
      email: data.email,
      password: data.password || 'default123',
      role: data.role as Role,
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        {user ? 'Edit User' : 'Create User'}
      </h2>

      <Input
        label="Full Name"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Email"
        type="email"
        placeholder="john@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label={user ? 'New Password (optional)' : 'Password'}
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Role
        </label>
        <select
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register('role')}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" isLoading={isLoading} className="flex-1">
          {user ? 'Update' : 'Create'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};
