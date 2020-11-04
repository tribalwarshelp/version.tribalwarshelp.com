import pl from 'date-fns/locale/pl';
import enGB from 'date-fns/locale/en-GB';

export type Locale = 'pl' | 'en';

const locales = {
  pl,
  en: enGB,
};

export default locales;
