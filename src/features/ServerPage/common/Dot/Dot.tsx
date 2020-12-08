import React from 'react';
import { Property } from 'csstype';

import { makeStyles } from '@material-ui/core/styles';

interface UseStylesProps {
  backgroundColor?: Property.BackgroundColor;
}

interface Props extends UseStylesProps {}

function Dot({ backgroundColor }: Props) {
  const classes = useStyles();
  return (
    <div
      className={classes.dot}
      style={{ backgroundColor: backgroundColor ?? 'green' }}
    />
  );
}

const useStyles = makeStyles(theme => ({
  dot: {
    borderRadius: '50%',
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));

export default Dot;
