import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from './contants';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: DRAWER_WIDTH,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px) !important',
    },
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));
export default useStyles;
