import React from 'react';
import useDateUtils from 'libs/date/useDateUtils';
import { AUTHOR } from 'config/app';

import useStyles from './styles';
import { AppBar, Toolbar, Container, Typography } from '@material-ui/core';

export default function Header() {
  const dateUtils = useDateUtils();
  const classes = useStyles();

  return (
    <AppBar position="static" component="footer">
      <Container>
        <Toolbar disableGutters className={classes.toolbar}>
          <Typography align="center" className={classes.copyright}>
            &copy; {dateUtils.getYear(dateUtils.date())} {AUTHOR}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
