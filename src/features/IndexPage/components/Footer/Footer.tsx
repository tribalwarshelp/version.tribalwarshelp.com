import React from 'react';
import { AUTHOR } from '@config/app';

import useStyles from './styles';
import { AppBar, Toolbar, Container, Typography } from '@material-ui/core';

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" component="footer" elevation={0}>
      <Container>
        <Toolbar disableGutters className={classes.toolbar}>
          <Typography align="center" className={classes.copyright}>
            &copy; {new Date().getFullYear()} {AUTHOR}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
