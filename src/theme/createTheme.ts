import './font.css';
import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
} from '@material-ui/core/styles';

const createTheme = (): Theme => {
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
