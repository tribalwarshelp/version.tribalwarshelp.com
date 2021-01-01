import React from 'react';
import { Route } from './types';

import { List } from '@material-ui/core';
import ListItem from './ListItem';

export interface Props {
  routes: Route[];
}

const Nav = ({ routes }: Props) => {
  return (
    <List>
      {routes.map(route => (
        <ListItem nestedLevel={1} route={route} key={route.name} />
      ))}
    </List>
  );
};

export default Nav;
