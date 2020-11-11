import React, { Fragment, useState } from 'react';
import { Route } from './types';

import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem as MUIListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  Box,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Link from '@common/Link/Link';

export interface Props {
  route: Route;
  nestedLevel: number;
}

const useStyles = makeStyles(theme => ({
  link: {
    display: 'block',
    width: '100%',
  },
}));

function ListItem({ route, nestedLevel }: Props) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const hasNested = Array.isArray(route.nested) && route.nested.length > 0;

  const getItem = () => {
    return (
      <MUIListItem
        onClick={hasNested ? () => setOpen(!open) : undefined}
        disableGutters
        button
        component={Box}
        pl={nestedLevel}
        dense
      >
        <ListItemIcon>{route.Icon}</ListItemIcon>
        <ListItemText primary={route.name} />
        {hasNested && (
          <Fragment>{open ? <ExpandLess /> : <ExpandMore />}</Fragment>
        )}
      </MUIListItem>
    );
  };

  return (
    <Fragment>
      {!hasNested ? (
        <Link to={route.to} className={classes.link} color="inherit">
          {getItem()}
        </Link>
      ) : (
        getItem()
      )}
      {hasNested && (
        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {route.nested?.map(route => {
              return (
                <ListItem
                  route={route}
                  nestedLevel={nestedLevel + 1}
                  key={route.name}
                />
              );
            })}
          </List>
        </Collapse>
      )}
    </Fragment>
  );
}

export default ListItem;
