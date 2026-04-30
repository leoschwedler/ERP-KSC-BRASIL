import React from 'react';
import { LucideIcon, ChevronRight } from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  icon: Icon,
  onClick,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100/50 hover:to-blue-100 border-blue-200',
    green: 'from-green-50 to-green-100/50 hover:to-green-100 border-green-200',
    purple: 'from-purple-50 to-purple-100/50 hover:to-purple-100 border-purple-200',
    orange: 'from-orange-50 to-orange-100/50 hover:to-orange-100 border-orange-200',
  };

  const iconColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-6 rounded-xl border transition-all duration-200 text-left bg-gradient-to-br ${colorClasses[color]} hover:shadow-md group`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg bg-white/50 ${iconColorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-600 mt-1">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
      </div>
    </button>
  );
};
