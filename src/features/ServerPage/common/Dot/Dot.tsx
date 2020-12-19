import React from 'react';
import { Property } from 'csstype';

import { makeStyles } from '@material-ui/core/styles';

interface Props {
  backgroundColor?: Property.BackgroundColor;
}

function Dot({ backgroundColor = 'green' }: Props) {
  const classes = useStyles();
  return <div className={classes.dot} style={{ backgroundColor }} />;
}

const useStyles = makeStyles(theme => ({
  dot: {
    borderRadius: '50%',
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
}));

export default Dot;
