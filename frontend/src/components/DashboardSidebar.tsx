import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  LogOut,
  ChevronRight,
  Home,
  Settings,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const DashboardSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/products', label: 'Produtos', icon: Package },
    ...(isAdmin ? [{ path: '/users', label: 'Usuários', icon: Users }] : []),
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white h-screen flex flex-col fixed left-0 top-0 shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg">ERP System</h1>
            <p className="text-xs text-slate-400">Gestão Empresarial</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>
        <div className="mt-3 inline-block px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-semibold">
          {user?.role === 'ADMIN' ? '👑 Admin' : '👤 Usuário'}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <p className="text-xs font-semibold text-slate-400 px-3 py-2">MENU</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                active
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {active && <ChevronRight className="w-5 h-5" />}
            </button>
          );
        })}

        <p className="text-xs font-semibold text-slate-400 px-3 py-2 mt-6">CONTA</p>
        <button
          onClick={() => navigate('/profile')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700/50 transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          <span className="flex-1 text-left font-medium">Configurações</span>
        </button>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600/20 text-red-300 hover:bg-red-600/30 transition-all duration-200 font-semibold"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
        <p className="text-xs text-slate-500 text-center">v1.0.0</p>
      </div>
    </div>
  );
};
