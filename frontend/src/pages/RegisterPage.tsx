import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRegister } from '../hooks/useRegister';
import { AuthLayout } from '../layout/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const { mutate, isPending, error } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    mutate({ name: data.name, email: data.email, password: data.password });
  };

  const apiError =
    (error as any)?.response?.data?.message ||
    (error as any)?.response?.data ||
    null;

  return (
    <AuthLayout>
      {/* Cabeçalho */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-lg mb-4">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Criar conta</h2>
        <p className="text-slate-500 text-sm mt-1">Preencha os dados para se cadastrar</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Erro da API */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700 flex items-start gap-2">
            <span className="text-red-500 font-bold mt-0.5">✕</span>
            <span>{typeof apiError === 'string' ? apiError : 'Erro ao criar conta. Tente novamente.'}</span>
          </div>
        )}

        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Nome completo
          </label>
          <input
            type="text"
            placeholder="João Silva"
            {...register('name')}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all
              ${errors.name
                ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200'
                : 'border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all
              ${errors.email
                ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200'
                : 'border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Senha */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Mínimo 6 caracteres"
              {...register('password')}
              className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm outline-none transition-all
                ${errors.password
                  ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirmar senha */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Confirmar senha
          </label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Repita a senha"
              {...register('confirmPassword')}
              className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm outline-none transition-all
                ${errors.confirmPassword
                  ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Info de perfil */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm text-blue-700">
          Novos usuários são cadastrados com perfil <strong>Usuário</strong>. Apenas administradores podem promover perfis.
        </div>

        {/* Botão */}
        <Button type="submit" className="w-full" isLoading={isPending}>
          {isPending ? 'Criando conta...' : 'Criar conta'}
        </Button>

        {/* Link para login */}
        <p className="text-center text-sm text-slate-600">
          Já tem uma conta?{' '}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
          >
            Fazer login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
