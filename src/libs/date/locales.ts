import { Locale as DFLocale } from 'date-fns';
import pl from 'date-fns/locale/pl';
import enGB from 'date-fns/locale/en-GB';
import { DEFAULT_LANGUAGE } from '@config/app';

export type Locales = {
  pl: DFLocale;
  en: DFLocale;
};
export type Locale = keyof Locales;

const locales: Locales = {
  pl,
  en: enGB,
};

export const getLocale = (lang: string): DFLocale => {
  return lang in locales
    ? locales[lang as Locale]
    : locales[DEFAULT_LANGUAGE as Locale];
};

export default locales;
