import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, PaperProps } from '@material-ui/core';

export type Props = {
  size?: 'small' | 'medium' | 'large';
} & PaperProps;

const useStyles = makeStyles(theme => ({
  paper: {
    overflow: 'auto',
    maxHeight: '200px',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      maxHeight: 'none !important',
    },
    '&.is-medium': {
      maxHeight: '500px',
    },
    '&.is-large': {
      maxHeight: '700px',
    },
  },
}));

function EnhancedPaper({
  children,
  className,
  size = 'medium',
  ...rest
}: Props) {
  const classes = useStyles();

  return (
    <Paper
      {...rest}
      className={clsx(classes.paper, className, {
        'is-large': size === 'large',
        'is-medium': size === 'medium',
      })}
    >
      {children}
    </Paper>
  );
}

export default EnhancedPaper;
