import React, { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

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
  color: string;
}

function MarkerField<T extends object>({
  onDelete,
  onChange,
  loadSuggestions,
  onChangeColor,
  getOptionSelected,
  getOptionLabel,
  loadingText,
  color,
}: Props<T>) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
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
  useEffect(() => {
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
        onChange={onChange}
        loadingText={loadingText}
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
