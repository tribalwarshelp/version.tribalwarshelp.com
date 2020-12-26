import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    width: '40%',
    [theme.breakpoints.between('xs', 'sm')]: {
      width: '60%',
    },
    [theme.breakpoints.down('xs')]: {
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
