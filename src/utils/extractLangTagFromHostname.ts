import { DEFAULT_LANGUAGE } from '@config/app';

const extractLangTagFromHostname = (hostname = '') => {
  return hostname.substring(0, hostname.lastIndexOf('.')) || DEFAULT_LANGUAGE;
};

export default extractLangTagFromHostname;
