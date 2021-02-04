import { Locale as DFLocale } from 'date-fns';
import pl from 'date-fns/locale/pl';
import enGB from 'date-fns/locale/en-GB';
import pt from 'date-fns/locale/pt';
import ptBR from 'date-fns/locale/pt-BR';
import { DEFAULT_LANGUAGE } from 'config/app';

export type Locales = {
  pl: DFLocale;
  en: DFLocale;
  pt: DFLocale;
  br: DFLocale;
};
export type Locale = keyof Locales;

const locales: Locales = {
  pl,
  en: enGB,
  pt,
  br: ptBR,
};

export const getLocale = (lang: string): DFLocale => {
  return lang in locales
    ? locales[lang as Locale]
    : locales[DEFAULT_LANGUAGE as Locale];
};

export default locales;
