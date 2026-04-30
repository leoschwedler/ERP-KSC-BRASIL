import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../lib/utils';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const navItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    ...(isAdmin
      ? [
          { label: 'Produtos', href: '/products', icon: Package },
          { label: 'Usuários', href: '/users', icon: Users },
        ]
      : []),
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-bold">ERP</h2>
        <p className="text-slate-400 text-sm">System</p>
      </div>

      <nav className="mt-8 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
