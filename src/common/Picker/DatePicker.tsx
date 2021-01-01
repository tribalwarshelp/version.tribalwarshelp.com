import React from 'react';
import clsx from 'clsx';
import {
  DatePicker as MUIDatePicker,
  DatePickerProps,
} from '@material-ui/pickers';
import { DATE_FORMAT } from '@config/app';
import useI18N from './useI18N';
import useDialogStyles from './useDialogStyles';

function DatePicker({
  className,
  format = DATE_FORMAT.DAY_MONTH_AND_YEAR,
  ...props
}: DatePickerProps) {
  const classes = useDialogStyles();
  const translations = useI18N();
  return (
    <MUIDatePicker
      {...props}
      format={format}
      DialogProps={{ className: clsx(className, classes.dialog) }}
      {...translations}
    />
  );
}

export default DatePicker;
