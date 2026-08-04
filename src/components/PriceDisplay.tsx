import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

interface PriceDisplayProps {
  price: string | number; // e.g. "AED 2,500" or 2500 or "Starting at AED 350"
  variant?: 'inline' | 'stacked' | 'large' | 'compact';
  className?: string;
  aedClassName?: string;
  convertedClassName?: string;
  showPrefix?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  variant = 'stacked',
  className = '',
  aedClassName = '',
  convertedClassName = '',
}) => {
  const { formatPrice, selectedCountry } = useCurrency();
  const { aedFormatted, convertedFormatted } = formatPrice(price);

  if (selectedCountry.currency === 'AED' || !convertedFormatted) {
    return <span className={`${aedClassName} ${className}`}>{aedFormatted}</span>;
  }

  if (variant === 'inline') {
    return (
      <span className={`inline-flex items-baseline gap-2 flex-wrap ${className}`}>
        <span className={aedClassName}>{aedFormatted}</span>
        <span
          className={`text-sky-400/90 font-medium text-xs sm:text-sm tracking-wide transition-opacity duration-300 ${convertedClassName}`}
        >
          ({convertedFormatted})
        </span>
      </span>
    );
  }

  if (variant === 'large') {
    return (
      <div className={`flex flex-col ${className}`}>
        <span className={`text-3xl sm:text-4xl font-extrabold text-sky-400 ${aedClassName}`}>
          {aedFormatted}
        </span>
        <span
          className={`text-xs sm:text-sm text-slate-400 font-semibold mt-0.5 tracking-wide flex items-center gap-1 ${convertedClassName}`}
        >
          <span className="text-sky-400 font-bold">{selectedCountry.flag}</span> {convertedFormatted}
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${className}`}>
        <span className={aedClassName}>{aedFormatted}</span>
        <span className={`text-[11px] text-sky-400 font-medium ${convertedClassName}`}>
          [{convertedFormatted}]
        </span>
      </span>
    );
  }

  // Default: stacked
  return (
    <div className={`inline-flex flex-col ${className}`}>
      <span className={aedClassName}>{aedFormatted}</span>
      <span
        className={`text-xs font-semibold text-sky-400/90 tracking-tight transition-all duration-300 ${convertedClassName}`}
      >
        {convertedFormatted}
      </span>
    </div>
  );
};
