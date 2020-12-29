import React from 'react';
import clsx from 'clsx';
import {
  DatePicker as MUIDatePicker,
  DatePickerProps,
} from '@material-ui/pickers';
import useI18N from './useI18N';
import useDialogStyles from './useDialogStyles';

function DatePicker({ className, ...props }: DatePickerProps) {
  const classes = useDialogStyles();
  const translations = useI18N();
  return (
    <MUIDatePicker
      {...props}
      DialogProps={{ className: clsx(className, classes.dialog) }}
      okLabel={translations.okLabel}
      cancelLabel={translations.cancelLabel}
    />
  );
}

export default DatePicker;
