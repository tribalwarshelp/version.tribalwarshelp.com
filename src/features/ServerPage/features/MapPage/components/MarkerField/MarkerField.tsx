import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import useUpdateEffect from '@libs/useUpdateEffect';

import { TextField, Box, IconButton } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Delete as DeleteIcon } from '@material-ui/icons';
import ColorInput from '@common/Form/ColorInput';

export interface Props<T> {
  onDelete: () => void;
  onChange: (e: React.ChangeEvent<{}>, value: T | null) => void;
  onChangeColor: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    color: string
  ) => void;
  getOptionLabel: (opt: T) => string;
  getOptionSelected: (opt: T, value: T) => boolean;
  loadSuggestions: (value: string) => Promise<T[]>;
  loadingText?: string;
  noOptionsText?: string;
  color: string;
  value: T | null;
}

function MarkerField<T extends object>({
  onDelete,
  onChange,
  loadSuggestions,
  onChangeColor,
  getOptionSelected,
  getOptionLabel,
  loadingText,
  noOptionsText,
  color,
  value,
}: Props<T>) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<T[]>(value ? [value] : []);
  const [loading, setLoading] = useState(false);
  const debouncedLoadSuggestions = useDebouncedCallback(
    (searchValue: string) => {
      setLoading(true);
      loadSuggestions(searchValue)
        .then(data => {
          setSuggestions(data);
        })
        .finally(() => setLoading(false));
    },
    1000
  );
  useUpdateEffect(() => {
    debouncedLoadSuggestions.callback(searchValue);
  }, [searchValue, debouncedLoadSuggestions]);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="flex-end">
      <Autocomplete
        options={suggestions}
        getOptionLabel={getOptionLabel}
        fullWidth
        autoSelect
        autoHighlight
        loading={loading}
        getOptionSelected={getOptionSelected}
        value={value}
        onChange={onChange}
        loadingText={loadingText}
        noOptionsText={noOptionsText}
        renderInput={params => {
          return (
            <TextField
              {...params}
              variant="standard"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <IconButton onClick={onDelete} size="small">
                    <DeleteIcon />
                  </IconButton>
                ),
              }}
              type="text"
              name="value"
              onChange={e => setSearchValue(e.target.value)}
            />
          );
        }}
      />
      <ColorInput
        style={{ width: '40%' }}
        name="color"
        variant="standard"
        fullWidth
        color={color}
        onChange={onChangeColor}
      />
    </Box>
  );
}

export default MarkerField;
