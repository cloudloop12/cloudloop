import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { COUNTRIES_DATA, DEFAULT_COUNTRY, FALLBACK_RATES_BASE_AED, CountryCurrency } from '../data/countriesData';

const MANUAL_PREF_KEY = 'cloudloop_manual_country_pref';
const AUTO_COUNTRY_KEY = 'cloudloop_auto_country_cache';
const RATES_CACHE_KEY = 'cloudloop_rates_cache_v1';
const RATES_CACHE_TTL = 6 * 60 * 60 * 1000; // 6 hours

export interface ConvertedResult {
  aedAmount: number;
  convertedAmount: number;
  formattedConverted: string; // e.g. "$680" or "PKR 192,500"
  symbol: string;
  currencyCode: string;
  isSameCurrency: boolean;
}

interface CurrencyContextType {
  selectedCountry: CountryCurrency;
  rates: Record<string, number>;
  isLoadingRates: boolean;
  isLoadingLocation: boolean;
  isAutoDetected: boolean;
  changeCountry: (countryCode: string, isManual?: boolean) => void;
  resetToAutoDetect: () => void;
  convertAed: (aedAmount: number) => ConvertedResult;
  formatPrice: (priceInput: string | number) => {
    aedFormatted: string;
    convertedFormatted: string | null;
    rawAed: number;
    rawConverted: number;
    currencyCode: string;
  };
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCurrency>(DEFAULT_COUNTRY);
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES_BASE_AED);
  const [isLoadingRates, setIsLoadingRates] = useState<boolean>(true);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true);
  const [isAutoDetected, setIsAutoDetected] = useState<boolean>(true);

  // 1. Fetch live exchange rates against base currency AED
  const fetchLiveRates = useCallback(async () => {
    setIsLoadingRates(true);

    // Try reading valid cached rates first
    try {
      const cachedStr = localStorage.getItem(RATES_CACHE_KEY);
      if (cachedStr) {
        const cached = JSON.parse(cachedStr);
        if (Date.now() - cached.timestamp < RATES_CACHE_TTL && cached.rates && cached.rates.USD) {
          setRates({ ...FALLBACK_RATES_BASE_AED, ...cached.rates, AED: 1 });
          setIsLoadingRates(false);
          return;
        }
      }
    } catch {
      // Ignore cache parse error
    }

    // Fetch from Primary Live Rates API (open.er-api.com)
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/AED', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates) {
          const newRates = { ...FALLBACK_RATES_BASE_AED, ...data.rates, AED: 1 };
          setRates(newRates);
          localStorage.setItem(
            RATES_CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), rates: newRates })
          );
          setIsLoadingRates(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Primary exchange rates fetch failed, trying secondary fallback:', err);
    }

    // Secondary fallback (exchangerate-api.com)
    try {
      const res2 = await fetch('https://api.exchangerate-api.com/v4/latest/AED');
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2 && data2.rates) {
          const newRates2 = { ...FALLBACK_RATES_BASE_AED, ...data2.rates, AED: 1 };
          setRates(newRates2);
          localStorage.setItem(
            RATES_CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), rates: newRates2 })
          );
          setIsLoadingRates(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Secondary exchange rates fetch failed, using fallback rates:', err);
    }

    // Ultimate fallback to pre-defined realistic rates
    setRates(FALLBACK_RATES_BASE_AED);
    setIsLoadingRates(false);
  }, []);

  // 2. Auto Detect Visitor Country via IP
  const detectCountry = useCallback(async () => {
    setIsLoadingLocation(true);

    // Check if user set a manual override previously
    const manualCode = localStorage.getItem(MANUAL_PREF_KEY);
    if (manualCode) {
      const found = COUNTRIES_DATA.find((c) => c.code === manualCode.toUpperCase());
      if (found) {
        setSelectedCountry(found);
        setIsAutoDetected(false);
        setIsLoadingLocation(false);
        return;
      }
    }

    // Check cached auto-detection (valid 24h)
    try {
      const cachedAuto = localStorage.getItem(AUTO_COUNTRY_KEY);
      if (cachedAuto) {
        const parsed = JSON.parse(cachedAuto);
        if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000 && parsed.code) {
          const found = COUNTRIES_DATA.find((c) => c.code === parsed.code);
          if (found) {
            setSelectedCountry(found);
            setIsAutoDetected(true);
            setIsLoadingLocation(false);
            return;
          }
        }
      }
    } catch {
      // ignore
    }

    // Perform IP-based geo detection
    let detectedCode: string | null = null;

    try {
      // Attempt 1: ipwho.is (fast, free, no key needed)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500); // 2.5s timeout for high perf

      const res = await fetch('https://ipwho.is/', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.country_code) {
          detectedCode = data.country_code;
        }
      }
    } catch {
      // Backup attempt: freeipapi.com
      try {
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), 2000);
        const res2 = await fetch('https://freeipapi.com/api/json', { signal: controller2.signal });
        clearTimeout(timeoutId2);
        if (res2.ok) {
          const data2 = await res2.json();
          if (data2 && data2.countryCode) {
            detectedCode = data2.countryCode;
          }
        }
      } catch {
        // failed
      }
    }

    if (detectedCode) {
      const matched = COUNTRIES_DATA.find((c) => c.code === detectedCode);
      if (matched) {
        setSelectedCountry(matched);
        setIsAutoDetected(true);
        localStorage.setItem(
          AUTO_COUNTRY_KEY,
          JSON.stringify({ timestamp: Date.now(), code: matched.code })
        );
        setIsLoadingLocation(false);
        return;
      }
    }

    // Default Fallback: UAE
    setSelectedCountry(DEFAULT_COUNTRY);
    setIsAutoDetected(true);
    setIsLoadingLocation(false);
  }, []);

  useEffect(() => {
    fetchLiveRates();
    detectCountry();
  }, [fetchLiveRates, detectCountry]);

  // Handle Manual Country Selection
  const changeCountry = (countryCode: string, isManual = true) => {
    const found = COUNTRIES_DATA.find((c) => c.code === countryCode.toUpperCase());
    if (!found) return;

    setSelectedCountry(found);
    if (isManual) {
      setIsAutoDetected(false);
      localStorage.setItem(MANUAL_PREF_KEY, found.code);
    } else {
      setIsAutoDetected(true);
      localStorage.removeItem(MANUAL_PREF_KEY);
    }
  };

  // Reset to auto-detected location
  const resetToAutoDetect = () => {
    localStorage.removeItem(MANUAL_PREF_KEY);
    localStorage.removeItem(AUTO_COUNTRY_KEY);
    detectCountry();
  };

  // Convert AED amount to selected country currency
  const convertAed = (aedAmount: number): ConvertedResult => {
    const currencyCode = selectedCountry.currency;
    const isSameCurrency = currencyCode === 'AED';

    if (isSameCurrency || !rates[currencyCode]) {
      return {
        aedAmount,
        convertedAmount: aedAmount,
        formattedConverted: `AED ${aedAmount.toLocaleString('en-US')}`,
        symbol: 'AED',
        currencyCode: 'AED',
        isSameCurrency: true,
      };
    }

    const rate = rates[currencyCode] || 1;
    const convertedRaw = aedAmount * rate;

    // Formatting rules based on currency size (e.g. PKR/INR vs USD/EUR)
    let roundedAmount = Math.round(convertedRaw);
    if (convertedRaw < 100 && rate < 1) {
      roundedAmount = Math.round(convertedRaw * 10) / 10;
    }

    const formattedNum = roundedAmount.toLocaleString('en-US');
    const symbol = selectedCountry.symbol;

    return {
      aedAmount,
      convertedAmount: roundedAmount,
      formattedConverted: `${symbol} ${formattedNum}`,
      symbol,
      currencyCode,
      isSameCurrency: false,
    };
  };

  // Helper to parse strings like "AED 2,500" or "2500" or "3,500 AED" and produce clean dual pricing
  const formatPrice = (priceInput: string | number) => {
    if (typeof priceInput === 'number') {
      const conv = convertAed(priceInput);
      return {
        aedFormatted: `AED ${priceInput.toLocaleString('en-US')}`,
        convertedFormatted: conv.isSameCurrency ? null : `≈ ${conv.currencyCode} ${conv.convertedAmount.toLocaleString('en-US')}`,
        rawAed: priceInput,
        rawConverted: conv.convertedAmount,
        currencyCode: conv.currencyCode,
      };
    }

    const str = String(priceInput);
    // Extract first numeric group e.g. "AED 2,500" -> 2500
    const match = str.match(/[\d,]+/);
    if (!match) {
      return {
        aedFormatted: str,
        convertedFormatted: null,
        rawAed: 0,
        rawConverted: 0,
        currencyCode: selectedCountry.currency,
      };
    }

    const numericValue = parseFloat(match[0].replace(/,/g, ''));
    if (isNaN(numericValue) || numericValue === 0) {
      return {
        aedFormatted: str,
        convertedFormatted: null,
        rawAed: 0,
        rawConverted: 0,
        currencyCode: selectedCountry.currency,
      };
    }

    const conv = convertAed(numericValue);

    // Format converted text e.g. "≈ USD 680" or "≈ PKR 192,500"
    const convertedText = conv.isSameCurrency
      ? null
      : `≈ ${conv.currencyCode} ${conv.convertedAmount.toLocaleString('en-US')}`;

    return {
      aedFormatted: str.includes('AED') ? str : `AED ${str}`,
      convertedFormatted: convertedText,
      rawAed: numericValue,
      rawConverted: conv.convertedAmount,
      currencyCode: conv.currencyCode,
    };
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCountry,
        rates,
        isLoadingRates,
        isLoadingLocation,
        isAutoDetected,
        changeCountry,
        resetToAutoDetect,
        convertAed,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return ctx;
};
