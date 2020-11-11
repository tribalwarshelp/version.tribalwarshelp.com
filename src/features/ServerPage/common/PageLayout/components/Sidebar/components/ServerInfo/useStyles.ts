import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content',
    textAlign: 'center',
    padding: theme.spacing(1),
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(0.5),
    },
  },
  status: {
    marginBottom: theme.spacing(1),
  },
}));

export default useStyles;
