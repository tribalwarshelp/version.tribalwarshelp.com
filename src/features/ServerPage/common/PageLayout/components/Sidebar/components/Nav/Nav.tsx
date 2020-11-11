import React from 'react';
import { Route } from './types';

import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import ListItem from './ListItem';

export interface Props {
  routes: Route[];
}

const useStyles = makeStyles(theme => ({
  root: {},
}));

const Nav = ({ routes }: Props) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {routes.map(route => (
        <ListItem nestedLevel={1} route={route} key={route.name} />
      ))}
    </List>
  );
};

export default Nav;
