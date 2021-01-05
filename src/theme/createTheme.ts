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
        primary: {
          main: '#BB86FC',
          contrastText: '#000',
        },
        secondary: {
          main: '#03DAC6',
          contrastText: '#000',
        },
      },
      typography: {
        h2: {
          fontWeight: 400,
        },
      },
      props: {
        MuiTextField: {
          variant: 'outlined',
          color: 'primary',
        },
        MuiAppBar: {
          color: 'default',
        },
        MuiLink: {
          underline: 'none',
        },
      },
      overrides: {
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
