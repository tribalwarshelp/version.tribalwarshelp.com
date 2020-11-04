import { makeStyles } from '@material-ui/core/styles';
import { heights } from '@theme/toolbar';

const useStyles = makeStyles(theme => {
  return {
    main: {
      padding: theme.spacing(3, 0),
      minHeight: `calc(100vh - ${heights.tabletDesktop * 2}px)`,
      [`${theme.breakpoints.down('xs')} and (orientation: landscape)`]: {
        minHeight: `calc(100vh - ${heights.mobileLandscape * 2}px)`,
      },
      [theme.breakpoints.down('xs')]: {
        minHeight: `calc(100vh - ${heights.mobilePortrait * 2}px)`,
      },
    },
  };
});

export default useStyles;
