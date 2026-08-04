export interface CountryCurrency {
  code: string;       // Country Code e.g. "AE"
  name: string;       // Country Name e.g. "United Arab Emirates"
  flag: string;       // Flag Emoji e.g. "🇦🇪"
  currency: string;   // Currency Code e.g. "AED"
  symbol: string;     // Currency Symbol e.g. "AED", "$", "£"
  locale?: string;    // Locale e.g. "en-AE"
}

export const COUNTRIES_DATA: CountryCurrency[] = [
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'AED', symbol: 'AED', locale: 'ar-AE' },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', symbol: '$', locale: 'en-US' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£', locale: 'en-GB' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', currency: 'PKR', symbol: 'Rs', locale: 'ur-PK' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currency: 'INR', symbol: '₹', locale: 'hi-IN' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', symbol: 'CA$', locale: 'en-CA' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', symbol: 'A$', locale: 'en-AU' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', symbol: '€', locale: 'de-DE' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', symbol: '€', locale: 'fr-FR' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currency: 'EUR', symbol: '€', locale: 'it-IT' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currency: 'EUR', symbol: '€', locale: 'es-ES' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currency: 'SAR', symbol: 'SR', locale: 'ar-SA' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', currency: 'QAR', symbol: 'QR', locale: 'ar-QA' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', currency: 'OMR', symbol: 'OMR', locale: 'ar-OM' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', currency: 'KWD', symbol: 'KD', locale: 'ar-KW' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', currency: 'BHD', symbol: 'BD', locale: 'ar-BH' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currency: 'CHF', symbol: 'CHF', locale: 'de-CH' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', symbol: 'S$', locale: 'en-SG' },
  { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY', symbol: '¥', locale: 'zh-CN' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currency: 'JPY', symbol: '¥', locale: 'ja-JP' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', currency: 'EGP', symbol: 'E£', locale: 'ar-EG' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', currency: 'PHP', symbol: '₱', locale: 'en-PH' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currency: 'NGN', symbol: '₦', locale: 'en-NG' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES', symbol: 'KSh', locale: 'sw-KE' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', currency: 'BDT', symbol: '৳', locale: 'bn-BD' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', currency: 'MYR', symbol: 'RM', locale: 'ms-MY' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', currency: 'IDR', symbol: 'Rp', locale: 'id-ID' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', currency: 'TRY', symbol: '₺', locale: 'tr-TR' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currency: 'ZAR', symbol: 'R', locale: 'en-ZA' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', currency: 'RUB', symbol: '₽', locale: 'ru-RU' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', currency: 'NZD', symbol: 'NZ$', locale: 'en-NZ' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currency: 'BRL', symbol: 'R$', locale: 'pt-BR' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', currency: 'MXN', symbol: 'Mex$', locale: 'es-MX' },
];

export const DEFAULT_COUNTRY: CountryCurrency = COUNTRIES_DATA[0]; // UAE

// Realistic fallback exchange rates relative to 1 AED
export const FALLBACK_RATES_BASE_AED: Record<string, number> = {
  AED: 1,
  USD: 0.272294,
  GBP: 0.2154,
  EUR: 0.2512,
  PKR: 75.82,
  INR: 22.85,
  CAD: 0.3715,
  AUD: 0.4120,
  SAR: 1.0211,
  QAR: 0.9912,
  OMR: 0.1048,
  KWD: 0.0837,
  BHD: 0.1026,
  CHF: 0.2395,
  SGD: 0.3650,
  CNY: 1.9680,
  JPY: 41.25,
  EGP: 13.25,
  PHP: 15.65,
  NGN: 410.5,
  KES: 35.20,
  BDT: 32.70,
  MYR: 1.215,
  IDR: 4320.0,
  TRY: 9.35,
  ZAR: 4.95,
  RUB: 24.80,
  NZD: 0.452,
  BRL: 1.485,
  MXN: 5.15,
};
