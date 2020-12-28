import { Locale as DFLocale } from 'date-fns';
import pl from 'date-fns/locale/pl';
import enGB from 'date-fns/locale/en-GB';

export type Locales = {
  pl: DFLocale;
  en: DFLocale;
};
export type Locale = keyof Locales;

const locales: Locales = {
  pl,
  en: enGB,
};

export default locales;
