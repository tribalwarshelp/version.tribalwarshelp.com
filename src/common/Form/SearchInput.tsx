import React, { useRef } from 'react';

import {
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from '@material-ui/core';
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons';

export type Props = TextFieldProps & {
  onResetValue?: () => void;
};

function SearchInput({ value, onResetValue, style, ...rest }: Props) {
  const input = useRef<HTMLInputElement | null>(null);

  return (
    <TextField
      {...rest}
      value={value}
      inputRef={input}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', ...(style ? style : {}) }}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            onClick={() => {
              if (input.current) {
                input.current.focus();
              }
            }}
          >
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              type="button"
              disabled={typeof value === 'string' && value === ''}
              onClick={() => {
                if (!value && input.current) {
                  input.current.value = '';
                } else if (onResetValue) {
                  onResetValue();
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
        ...(rest.InputProps ?? {}),
      }}
    />
  );
}

export default SearchInput;
