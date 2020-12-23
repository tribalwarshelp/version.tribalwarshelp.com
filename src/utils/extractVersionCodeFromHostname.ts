import { DEFAULT_LANGUAGE } from '@config/app';

const extractVersionCodeFromHostname = (hostname = '') => {
  return hostname.substring(0, hostname.indexOf('.')) || DEFAULT_LANGUAGE;
};

export default extractVersionCodeFromHostname;
