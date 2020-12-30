import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    [theme.breakpoints.down(750)]: {
      width: '100%',
    },
  },
  toolbar: {
    justifyContent: 'flex-end',
    position: 'relative',
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
}));

export default useStyles;
