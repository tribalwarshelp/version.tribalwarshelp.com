export const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE ?? 'en';

export const NAME = 'TWHelp';

export type ServerStatus = 'open' | 'closed';

export const SERVER_STATUS = {
  CLOSED: 'closed' as ServerStatus,
  OPEN: 'open' as ServerStatus,
};

export const TWHELP = process.env.TWHelp ?? 'https://tribalwarshelp.com';

export const AUTHOR = 'Dawid Wysokiński';

export const DATE_FORMAT = {
  MONTH_AND_YEAR: 'yyyy-MM',
  DAY_MONTH_AND_YEAR: 'yyyy-MM-dd',
  HOUR_MINUTES_DAY_MONTH_AND_YEAR: 'yyyy-MM-dd HH:mm',
  HOUR_MINUTES_SECONDS_DAY_MONTH_AND_YEAR: 'yyyy-MM-dd HH:mm:ss',
};
