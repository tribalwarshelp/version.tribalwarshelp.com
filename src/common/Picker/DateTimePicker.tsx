import React from 'react';
import clsx from 'clsx';
import { DATE_FORMAT } from '@config/app';
import useI18N from './useI18N';
import useDialogStyles from './useDialogStyles';

import {
  DateTimePicker as MUIDateTimePicker,
  DateTimePickerProps,
} from '@material-ui/pickers';

function DateTimePicker({
  className,
  ampm = false,
  format = DATE_FORMAT.HOUR_MINUTES_DAY_MONTH_AND_YEAR,
  ...props
}: DateTimePickerProps) {
  const classes = useDialogStyles();
  const translations = useI18N();
  return (
    <MUIDateTimePicker
      {...props}
      ampm={ampm}
      format={format}
      DialogProps={{ className: clsx(className, classes.dialog) }}
      {...translations}
    />
  );
}

export default DateTimePicker;
