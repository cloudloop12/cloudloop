import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'horizontal' | 'vertical';
  className?: string;
  imgClassName?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'horizontal', 
  className = '', 
  imgClassName = '',
  onClick 
}) => {
  return (
    <Link 
      to="/" 
      onClick={onClick}
      className={`inline-flex items-center group focus:outline-none shrink-0 p-0 m-0 border-none leading-none ${className}`}
      aria-label="Cloudloop Group Home"
    >
      <img
        src="/logo.png"
        alt="Cloudloop Group Logo"
        className={`object-contain transition-all duration-300 ease-in-out group-hover:scale-[1.03] transform-gpu p-0 m-0 block leading-none ${
          imgClassName ? imgClassName : (
            variant === 'vertical' 
              ? 'h-14 sm:h-16 w-auto max-w-full' 
              : 'h-9 sm:h-11 w-auto max-w-[200px] sm:max-w-[240px]'
          )
        }`}
      />
    </Link>
  );
};

