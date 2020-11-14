import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, ToolbarProps } from '@material-ui/core';

export type Props = {
  children?: React.ReactNode;
} & ToolbarProps;

const useStyles = makeStyles(theme => {
  return {
    toolbar: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  };
});

function TableToolbar({ children, className, ...rest }: Props) {
  const classes = useStyles();
  return (
    <Toolbar {...rest} className={clsx(classes.toolbar, className)}>
      {children}
    </Toolbar>
  );
}

export default TableToolbar;
