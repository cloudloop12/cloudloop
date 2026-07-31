import React from 'react';
import * as Icons from 'lucide-react';

interface ServiceIconProps {
  name: string;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, className = 'w-6 h-6' }) => {
  // @ts-ignore
  const IconComponent = Icons[name] || Icons.Briefcase;
  return <IconComponent className={className} />;
};
