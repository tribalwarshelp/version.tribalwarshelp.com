import React from 'react';
import { useQueryParams, StringParam, withDefault } from 'use-query-params';
import { useDebouncedCallback } from 'use-debounce';
import useLanguage from '@libs/i18n/useLanguage';

import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Container,
  Button,
} from '@material-ui/core';
import {
  Search as SearchIcon,
  Language as LanguageIcon,
} from '@material-ui/icons';

export default function Header() {
  const [query, setQuery] = useQueryParams({
    q: withDefault(StringParam, ''),
  });
  const debouncedSetQuery = useDebouncedCallback(
    value => setQuery({ q: value }),
    1000
  );
  const language = useLanguage();

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
            <Button startIcon={<LanguageIcon />}>{language}</Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
