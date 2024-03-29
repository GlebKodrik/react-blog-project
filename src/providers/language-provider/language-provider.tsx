import '../../configs/i18next';
import React, {
  useCallback, useEffect,
} from 'react';
import { LOCAL_STORAGE_KEYS } from 'constants/local-storage-keys';
import { useLanguage } from 'hooks/use-language';
import { TLanguages } from 'types/languages';
import { TLanguagesProvider } from './types';

export const LanguageProvider: React.FC<TLanguagesProvider> = ({ children }: TLanguagesProvider) => {
  const { changeLanguage } = useLanguage();

  const handlerLocalStorage = useCallback((event: StorageEvent) => {
    if (event.key === LOCAL_STORAGE_KEYS.LANG) {
      if (changeLanguage) {
        changeLanguage(event.newValue as TLanguages);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('storage', handlerLocalStorage);
    return () => {
      window.removeEventListener('storage', handlerLocalStorage);
    };
  }, []);

  return (
    <>
      { children }
    </>
  );
};
