import { createContext } from 'react';
import { Version, VersionCode } from 'libs/graphql/types';

const ctx = createContext<Version>({
  code: VersionCode.PL,
  host: '',
  name: '',
  timezone: '',
});

export default ctx;
