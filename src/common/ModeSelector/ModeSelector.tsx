import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonProps, Toolbar } from '@material-ui/core';

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
    <Toolbar className={classes.container} style={style}>
      {modes.map(m => {
        return (
          <div key={m.name}>
            <Button
              size="small"
              fullWidth
              {...buttonProps}
              variant={m.selected ? 'contained' : 'outlined'}
              onClick={() => {
                if (onSelect) {
                  onSelect(m);
                }
              }}
            >
              {m.label ?? m.name}
            </Button>
          </div>
        );
      })}
    </Toolbar>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    minHeight: 'auto',
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
        paddingLeft: 0,
        paddingRight: 0,
        width: '100%',
      },
    },
  },
}));

export default ModeSelector;
