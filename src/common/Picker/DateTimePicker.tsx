import React from 'react';
import clsx from 'clsx';
import {
  DateTimePicker as MUIDateTimePicker,
  DateTimePickerProps,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

function DateTimePicker({
  className,
  ampm = false,
  ...props
}: DateTimePickerProps) {
  const classes = useStyles();
  return (
    <MUIDateTimePicker
      {...props}
      ampm={ampm}
      DialogProps={{ className: clsx(className, classes.dialog) }}
    />
  );
}

const useStyles = makeStyles(theme => ({
  dialog: {
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.secondary.main,
    },
    '& .MuiPickersDay-daySelected': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    '& .MuiPickersDay-current': {
      color: theme.palette.secondary.main,
    },
    '& .MuiDialogActions-root .MuiButton-root': {
      color: theme.palette.secondary.contrastText,
    },
  },
}));

export default DateTimePicker;
