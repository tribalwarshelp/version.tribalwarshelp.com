import React, { Fragment, useState, memo } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { Route } from './types';

import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem as MUIListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Link from '@common/Link/Link';
import clsx from 'clsx';

export interface Props {
  route: Route;
  nestedLevel: number;
}

function ListItem({ route, nestedLevel }: Props) {
  const classes = useStyles();
  const { pathname } = useLocation();
  const hasNested = Array.isArray(route.nested) && route.nested.length > 0;
  const isActive =
    !!route.to && !!matchPath(pathname, { path: route.to, exact: route.exact });
  const [open, setOpen] = useState(
    (hasNested && !route.isExpandable) || isActive
  );

  const getItem = () => {
    return (
      <MUIListItem
        onClick={
          hasNested && route.isExpandable ? () => setOpen(!open) : undefined
        }
        disableGutters
        button
        style={{ paddingLeft: `${nestedLevel * 8}px` }}
      >
        <ListItemIcon
          className={clsx({
            [classes.activeLink]: isActive,
          })}
        >
          {route.Icon}
        </ListItemIcon>
        <ListItemText
          className={clsx({
            [classes.activeLink]: isActive,
          })}
          primary={route.name}
        />
        {hasNested && !!route.isExpandable && (
          <Fragment>{open ? <ExpandLess /> : <ExpandMore />}</Fragment>
        )}
      </MUIListItem>
    );
  };

  return (
    <Fragment>
      {!hasNested && route.to ? (
        <Link to={route.to} params={route.params} color="inherit">
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

const useStyles = makeStyles(theme => ({
  link: {
    display: 'block',
    width: '100%',
  },
  activeLink: {
    color: theme.palette.secondary.main,
  },
}));

export default memo(ListItem);
