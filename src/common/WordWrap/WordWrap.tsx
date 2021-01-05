import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

interface Props {
  children?: React.ReactNode;
}

function WordWrap({ children }: Props) {
  const classes = useStyles();
  return <span className={classes.wordWrap}>{children}</span>;
}

const useStyles = makeStyles(() => ({
  wordWrap: {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    '-ms-word-break': 'break-all',
    wordBreak: 'break-word',
    '-ms-hyphens': 'auto',
    '-moz-hyphens': 'auto',
    '-webkit-hyphens': 'auto',
    hyphens: 'auto',
  },
}));

export default WordWrap;
