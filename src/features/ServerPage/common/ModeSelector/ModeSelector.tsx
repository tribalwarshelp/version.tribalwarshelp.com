import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonProps } from '@material-ui/core';

export type Mode = {
  name: string;
  label?: string;
  selected?: boolean;
};

export interface Props {
  modes: Mode[];
  onSelect?: (m: Mode) => void;
  buttonProps?: ButtonProps;
  style?: React.CSSProperties;
}

function ModeSelector({ modes, onSelect, buttonProps = {}, style }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container} style={style}>
      {modes.map(m => {
        return (
          <div key={m.name}>
            <Button
              {...buttonProps}
              variant={m.selected ? 'contained' : 'outlined'}
              onClick={() => {
                if (onSelect) {
                  onSelect(m);
                }
              }}
              size="small"
              fullWidth
            >
              {m.label ?? m.name}
            </Button>
          </div>
        );
      })}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1, 0),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      padding: theme.spacing(0.5),
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& > *': {
        width: '100%',
      },
    },
  },
}));

export default ModeSelector;
