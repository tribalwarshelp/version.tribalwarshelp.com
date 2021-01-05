import React from 'react';
import { DATE_FORMAT } from '@config/app';
import useI18N from './useI18N';

import {
  DateTimePicker as MUIDateTimePicker,
  DateTimePickerProps,
} from '@material-ui/pickers';

function DateTimePicker({
  ampm = false,
  format = DATE_FORMAT.HOUR_MINUTES_DAY_MONTH_AND_YEAR,
  ...props
}: DateTimePickerProps) {
  const translations = useI18N();
  return (
    <MUIDateTimePicker
      {...props}
      ampm={ampm}
      format={format}
      {...translations}
    />
  );
}

export default DateTimePicker;
