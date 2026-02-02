
import React from 'react';

interface BadgeProps {
  text: string;
  color: 'blue' | 'purple' | 'gray' | 'green' | 'red';
}

export const Badge: React.FC<BadgeProps> = ({ text, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    gray: 'bg-slate-100 text-slate-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colorClasses[color]}`}>
      {text}
    </span>
  );
};