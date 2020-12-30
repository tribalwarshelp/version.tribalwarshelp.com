import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Popper,
  TextField,
  ClickAwayListener,
  TextFieldProps,
} from '@material-ui/core';
import { BlockPicker, BlockPickerProps, ColorResult } from 'react-color';

export interface Props
  extends Pick<
    TextFieldProps,
    'label' | 'fullWidth' | 'variant' | 'id' | 'name'
  > {
  color: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, color: string) => void;
  style?: React.CSSProperties;
  colors?: BlockPickerProps['colors'];
}

const DEFAULT_COLORS: string[] = [
  '#000000',
  '#001784',
  '#0037ff',
  '#008000',
  '#008381',
  '#008aff',
  '#00ff00',
  '#00ff75',
  '#00ffff',
  '#880000',
  '#870083',
  '#812fff',
  '#827e00',
  '#808080',
  '#7a88ff',
  '#65fe00',
  '#62ff74',
  '#59ffff',
  '#ff0000',
  '#ff0081',
  '#ff00ff',
  '#ff7400',
  '#ff767d',
  '#ff7fff',
  '#fffa00',
  '#fffb71',
  '#fefefe',
  '#ffffff',
];

function ColorInput({
  color,
  onChange,
  style,
  colors = DEFAULT_COLORS,
  ...rest
}: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const handleClickAway = () => {
    if (anchorEl) {
      setAnchorEl(null);
    }
  };

  const handleChangeComplete = (
    result: ColorResult,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(e, result.hex);
  };

  return (
    <div style={style}>
      <TextField {...rest} type="color" value={color} onClick={handleClick} />
      <Popper
        open={open}
        className={classes.popper}
        transition
        anchorEl={anchorEl}
        placement="bottom"
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <BlockPicker
            color={color}
            triangle="hide"
            onChangeComplete={handleChangeComplete}
            colors={colors}
          />
        </ClickAwayListener>
      </Popper>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  popper: {
    zIndex: theme.zIndex.appBar + 1,
    '& .block-picker': {
      backgroundColor: `${theme.palette.background.paper} !important`,
      boxShadow: `${theme.shadows[4]} !important`,
    },
  },
}));

export default ColorInput;
