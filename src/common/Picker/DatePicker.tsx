import React from 'react';
import {
  DatePicker as MUIDatePicker,
  DatePickerProps,
} from '@material-ui/pickers';
import { DATE_FORMAT } from '@config/app';
import useI18N from './useI18N';

function DatePicker({
  format = DATE_FORMAT.DAY_MONTH_AND_YEAR,
  ...props
}: DatePickerProps) {
  const translations = useI18N();
  return <MUIDatePicker {...props} format={format} {...translations} />;
}

export default DatePicker;
