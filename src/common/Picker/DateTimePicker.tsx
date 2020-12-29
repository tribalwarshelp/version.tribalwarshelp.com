import React from 'react';
import clsx from 'clsx';
import {
  DateTimePicker as MUIDateTimePicker,
  DateTimePickerProps,
} from '@material-ui/pickers';
import useI18N from './useI18N';
import useDialogStyles from './useDialogStyles';

function DateTimePicker({
  className,
  ampm = false,
  ...props
}: DateTimePickerProps) {
  const classes = useDialogStyles();
  const translations = useI18N();
  return (
    <MUIDateTimePicker
      {...props}
      ampm={ampm}
      DialogProps={{ className: clsx(className, classes.dialog) }}
      okLabel={translations.okLabel}
      cancelLabel={translations.cancelLabel}
    />
  );
}

export default DateTimePicker;
