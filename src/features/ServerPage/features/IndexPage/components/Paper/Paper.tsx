import React from 'react';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { Paper, PaperProps } from '@material-ui/core';

export type Props = {
  size?: 'small' | 'medium' | 'large';
} & PaperProps;

const useStyles = makeStyles(() => ({
  paper: {
    overflow: 'auto',
    maxHeight: '200px',
    height: '100%',
    '&.is-medium': {
      maxHeight: '400px',
    },
    '&.is-large': {
      maxHeight: '600px',
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
  console.log(size);
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
