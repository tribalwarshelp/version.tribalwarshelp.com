import { DEFAULT_LANGUAGE } from '@config/app';

const extractVersionCodeFromHostname = (hostname = '') => {
  return hostname.substring(0, hostname.lastIndexOf('.')) || DEFAULT_LANGUAGE;
};

export default extractVersionCodeFromHostname;
