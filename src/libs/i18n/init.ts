import i18n, { i18n as i18nT } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import pl from './pl';
import en from './en';
import { DEFAULT_LANGUAGE } from '@config/app';

const init = (): i18nT => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      fallbackLng: DEFAULT_LANGUAGE,
      debug: false,
      load: 'languageOnly',
      detection: {
        order: ['subdomain'],
      },
      resources: {
        en,
        pl,
      },
      defaultNS: 'common',
      react: {
        useSuspense: false,
      },
      interpolation: {
        escapeValue: false,
      },
    });
  return i18n;
};

export default init;
