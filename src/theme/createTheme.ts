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
      },
      overrides: {
        MuiTableContainer: {
          root: {
            overflow: 'auto',
          },
        },
      },
    })
  );
};

export default createTheme;
