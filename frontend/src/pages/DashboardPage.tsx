import { useNavigate } from 'react-router-dom';
import {
  Package,
  Users,
  TrendingUp,
  ShoppingCart,
  UserPlus,
  Plus,
  Eye,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProducts } from '../hooks/useProducts';
import { useUsers } from '../hooks/useUsers';
import { StatCard } from '../components/StatCard';
import { QuickActionCard } from '../components/QuickActionCard';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const { data: products } = useProducts();
  const { data: users } = useUsers();

  const totalProducts = products?.length || 0;
  const totalUsers = users?.length || 0;
  const lowStockProducts = products?.filter((p) => (p.quantity || 0) < 10).length || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">
          Bem-vindo, {user?.name?.split(' ')[0]}! 👋
        </h1>
        <p className="text-slate-600">
          Aqui está um resumo do seu sistema ERP
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Produtos"
          value={totalProducts}
          icon={Package}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />

        {isAdmin && (
          <StatCard
            title="Total de Usuários"
            value={totalUsers}
            icon={Users}
            color="green"
          />
        )}

        <StatCard
          title="Produtos com Baixo Estoque"
          value={lowStockProducts}
          icon={ShoppingCart}
          color="orange"
        />

        <StatCard
          title="Seu Perfil"
          value={user?.role === 'ADMIN' ? '👑 Admin' : '👤 Usuário'}
          icon={BarChart3}
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <QuickActionCard
            title="Ver Produtos"
            description="Visualize todos os produtos cadastrados no sistema"
            icon={Eye}
            color="blue"
            onClick={() => navigate('/products')}
          />

          {isAdmin && (
            <>
              <QuickActionCard
                title="Novo Produto"
                description="Adicione um novo produto ao catálogo"
                icon={Plus}
                color="green"
                onClick={() => navigate('/products')}
              />

              <QuickActionCard
                title="Gerenciar Usuários"
                description="Adicione, edite ou remova usuários do sistema"
                icon={UserPlus}
                color="purple"
                onClick={() => navigate('/users')}
              />

              <QuickActionCard
                title="Relatórios"
                description="Visualize estatísticas e relatórios do sistema"
                icon={TrendingUp}
                color="orange"
                onClick={() => navigate('/dashboard')}
              />
            </>
          )}
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-slate-600 text-sm font-medium mb-2">Nome Completo</p>
            <p className="text-xl font-bold text-slate-900">{user?.name}</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm font-medium mb-2">Email</p>
            <p className="text-xl font-bold text-slate-900 break-all">{user?.email}</p>
          </div>
          <div>
            <p className="text-slate-600 text-sm font-medium mb-2">Permissão</p>
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold text-sm">
              {isAdmin ? '👑 Administrador' : '👤 Usuário Padrão'}
            </div>
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Recursos Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-lg">📦</span> Todos os Usuários
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span> Visualizar produtos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span> Ver detalhes de produtos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 font-bold">✓</span> Editar perfil pessoal
              </li>
            </ul>
          </div>

          {isAdmin && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-lg">👑</span> Apenas Administradores
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Criar/editar/deletar produtos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Gerenciar usuários do sistema
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500 font-bold">✓</span> Visualizar relatórios
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
