import { createContext } from 'react';
import DateUtils from './DateUtils';

const ctx = createContext<DateUtils>(new DateUtils());
ctx.displayName = 'DateUtilsProvider';

export default ctx;
