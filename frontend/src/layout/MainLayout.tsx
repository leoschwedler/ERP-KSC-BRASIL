import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from '../components/DashboardSidebar';

export const MainLayout: React.FC = () => {
  return (
    <div className="flex bg-slate-50">
      <DashboardSidebar />
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
