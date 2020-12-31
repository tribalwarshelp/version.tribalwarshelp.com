import { createContext } from 'react';
import { Version } from './types';

const ctx = createContext<Version>({
  code: '',
  host: '',
  name: '',
  timezone: '',
});

export default ctx;
