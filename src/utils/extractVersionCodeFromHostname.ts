import { DEFAULT_LANGUAGE } from 'config/app';

const extractVersionCodeFromHostname = (hostname = ''): string => {
  let versionCode = hostname.substring(0, hostname.indexOf('.'));
  if (versionCode.length !== 2) {
    versionCode = DEFAULT_LANGUAGE;
  }
  return versionCode;
};

export default extractVersionCodeFromHostname;
