import { formatDistanceToNow } from 'date-fns';
import locales, { Locale } from './locales';

export type Options = {
  includeSeconds?: boolean;
  addSuffix?: boolean;
  locale: Locale;
};

const _formatDistanceToNow = (date: Date | number, opts: Options) => {
  return formatDistanceToNow(date, {
    ...opts,
    locale: locales[opts.locale] ?? locales.en,
  });
};

export default _formatDistanceToNow;
