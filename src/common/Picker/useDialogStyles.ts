import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  dialog: {
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.secondary.main,
    },
    '& .MuiPickersDay-daySelected': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    '& .MuiPickersDay-current:not(.MuiPickersDay-daySelected)': {
      color: theme.palette.secondary.main,
    },
    '& .MuiDialogActions-root .MuiButton-root': {
      color: theme.palette.secondary.contrastText,
    },
  },
}));

export default useStyles;
