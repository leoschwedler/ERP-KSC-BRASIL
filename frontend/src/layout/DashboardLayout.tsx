import { ReactNode } from 'react';
import { DashboardSidebar } from '../components/DashboardSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-1 ml-64 min-h-screen bg-slate-50">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};
