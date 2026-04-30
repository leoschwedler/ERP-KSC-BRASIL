import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 text-blue-600 bg-blue-500/10',
    green: 'from-green-50 to-green-100 text-green-600 bg-green-500/10',
    purple: 'from-purple-50 to-purple-100 text-purple-600 bg-purple-500/10',
    orange: 'from-orange-50 to-orange-100 text-orange-600 bg-orange-500/10',
    red: 'from-red-50 to-red-100 text-red-600 bg-red-500/10',
  };

  const iconColorClasses = {
    blue: 'text-blue-500 opacity-15',
    green: 'text-green-500 opacity-15',
    purple: 'text-purple-500 opacity-15',
    orange: 'text-orange-500 opacity-15',
    red: 'text-red-500 opacity-15',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-slate-600 text-sm font-medium">{title}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-4xl font-bold text-slate-900">{value}</p>
            {trend && (
              <div
                className={`text-sm font-semibold ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}%
              </div>
            )}
          </div>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className={`w-8 h-8 ${iconColorClasses[color]}`} />
        </div>
      </div>
    </div>
  );
};
