import './font.css';
import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
} from '@material-ui/core/styles';

const createTheme = (): Theme => {
  const defaultTheme = createMuiTheme();

  return responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: 'dark',
      },
      typography: {
        h2: {
          fontWeight: 400,
        },
      },
      props: {
        MuiTextField: {
          variant: 'outlined',
        },
        MuiAppBar: {
          color: 'default',
        },
        MuiLink: {
          color: 'secondary',
          underline: 'none',
        },
      },
      overrides: {
        MuiTooltip: {
          tooltipPlacementTop: {
            [defaultTheme.breakpoints.down('xs')]: {
              margin: defaultTheme.spacing(2, 0),
            },
          },
          tooltipPlacementBottom: {
            [defaultTheme.breakpoints.down('xs')]: {
              margin: defaultTheme.spacing(2, 0),
            },
          },
          tooltipPlacementLeft: {
            [defaultTheme.breakpoints.down('xs')]: {
              margin: defaultTheme.spacing(2, 0),
            },
          },
          tooltipPlacementRight: {
            [defaultTheme.breakpoints.down('xs')]: {
              margin: defaultTheme.spacing(2, 0),
            },
          },
        },
        MuiTab: {
          root: {
            whiteSpace: 'nowrap',
          },
        },
        MuiTableContainer: {
          root: {
            overflow: 'auto',
          },
        },
        MuiCssBaseline: {
          '@global': {
            '::-webkit-calendar-picker-indicator': {
              filter: 'invert(1)',
            },
          },
        },
      },
    })
  );
};

export default createTheme;
