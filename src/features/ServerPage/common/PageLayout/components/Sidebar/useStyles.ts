import { makeStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from './contants';

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    zIndex: `${theme.zIndex.appBar - 1} !important` as any,
    width: DRAWER_WIDTH,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
}));
export default useStyles;
