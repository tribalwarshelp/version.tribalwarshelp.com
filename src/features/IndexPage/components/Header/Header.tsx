import React from 'react';
import { useQueryParams, StringParam, withDefault } from 'use-query-params';
import { useDebouncedCallback } from 'use-debounce';

import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Container,
} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import VersionSelector from '@common/VersionSelector/VersionSelector';

export default function Header() {
  const [query, setQuery] = useQueryParams({
    q: withDefault(StringParam, ''),
  });
  const debouncedSetQuery = useDebouncedCallback(
    value => setQuery({ q: value }),
    1000
  );

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div></div>
          <div style={{ width: '40%' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search"
              defaultValue={query.q}
              onChange={e => {
                debouncedSetQuery.callback(e.target.value);
              }}
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <VersionSelector />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
