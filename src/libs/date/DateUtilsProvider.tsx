import React, { useMemo } from 'react';
import useVersion from '@libs/VersionContext/useVersion';
import { getLocale } from './locales';
import DateUtils from './DateUtils';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Context from './context';

export interface Props {
  children: React.ReactNode;
}

function DateUtilsProvider({ children }: Props) {
  const version = useVersion();
  const locale = useMemo(() => {
    return getLocale(version.code);
  }, [version.code]);
  const dateUtils = useMemo(() => {
    DateUtils.timezone = version.timezone;
    return new DateUtils({ locale });
  }, [version.timezone, locale]);

  return (
    <MuiPickersUtilsProvider utils={DateUtils}>
      <Context.Provider value={dateUtils}>{children}</Context.Provider>
    </MuiPickersUtilsProvider>
  );
}

export default DateUtilsProvider;
