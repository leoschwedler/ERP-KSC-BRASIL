import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';
import { AuthLayout } from '../layout/AuthLayout';
import { Button } from '../components/ui/Button';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const { mutate, isPending, error, reset } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const apiErrorMessage =
    (error as any)?.response?.data?.message ||
    (error ? 'Email ou senha incorretos. Tente novamente.' : null);

  const onSubmit = (data: LoginFormData) => {
    reset(); // limpa erro anterior antes de tentar
    mutate(data);
  };

  const loginAsAdmin = () => {
    reset();
    mutate({ email: 'admin@erp.com', password: 'admin123' });
  };

  const loginAsUser = () => {
    reset();
    mutate({ email: 'user@erp.com', password: 'user123' });
  };

  return (
    <AuthLayout>
      {/* Ícone e título */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl shadow-lg mb-4">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Entrar no sistema</h2>
        <p className="text-slate-500 text-sm mt-1">Use suas credenciais para acessar</p>
      </div>

      {/* Banner de erro da API — visível e claro */}
      {apiErrorMessage && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-300 rounded-xl px-4 py-3 mb-4 animate-pulse-once">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-red-700 font-semibold text-sm">Acesso negado</p>
            <p className="text-red-600 text-sm mt-0.5">{apiErrorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Campo Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all
              ${errors.email || apiErrorMessage
                ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200'
                : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
              }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.email.message}
            </p>
          )}
        </div>

        {/* Campo Senha */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              {...register('password')}
              className={`w-full px-4 py-2.5 pr-10 rounded-lg border text-sm outline-none transition-all
                ${errors.password || apiErrorMessage
                  ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200'
                  : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
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
            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.password.message}
            </p>
          )}
        </div>

        {/* Botão entrar */}
        <Button type="submit" className="w-full" isLoading={isPending}>
          {isPending ? 'Entrando...' : 'Entrar'}
        </Button>

        {/* Divisor */}
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-slate-400">ou acesse com demo</span>
          </div>
        </div>

        {/* Credenciais demo */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-slate-700 mb-2">Credenciais de demonstração:</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={loginAsAdmin}
              disabled={isPending}
              className="text-left px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all disabled:opacity-50"
            >
              <p className="font-semibold text-slate-800">👑 Admin</p>
              <p className="text-slate-500">admin@erp.com</p>
              <p className="text-slate-500">admin123</p>
            </button>
            <button
              type="button"
              onClick={loginAsUser}
              disabled={isPending}
              className="text-left px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all disabled:opacity-50"
            >
              <p className="font-semibold text-slate-800">👤 Usuário</p>
              <p className="text-slate-500">user@erp.com</p>
              <p className="text-slate-500">user123</p>
            </button>
          </div>
        </div>

        {/* Link cadastro */}
        <p className="text-center text-sm text-slate-600 pt-1">
          Não tem conta?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            Cadastre-se gratuitamente
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
