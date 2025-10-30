"use client";

import { useTranslation } from 'react-i18next';

export const useI18n = () => {
  const { t, i18n } = useTranslation('common');
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguage = () => {
    return i18n.language;
  };

  const isLanguage = (lng: string) => {
    return i18n.language === lng;
  };

  // Helper functions for common translations
  const tNav = (key: string) => t(`navigation.${key}`);
  const tAuth = (key: string) => t(`auth.${key}`);
  const tGame = (key: string) => t(`game.${key}`);
  const tSettings = (key: string) => t(`settings.${key}`);
  const tCommon = (key: string) => t(`common.${key}`);

  return {
    t,
    changeLanguage,
    getCurrentLanguage,
    isLanguage,
    // Helper functions
    tNav,
    tAuth,
    tGame,
    tSettings,
    tCommon,
    // Language info
    currentLanguage: i18n.language,
    isReady: i18n.isInitialized,
  };
};

// Type-safe translation keys (optional - for better TypeScript support)
export type TranslationKey = 
  | `navigation.${string}`
  | `auth.${string}`
  | `game.${string}`
  | `settings.${string}`
  | `common.${string}`;