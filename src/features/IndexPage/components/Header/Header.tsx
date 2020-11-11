import React, { useState, useRef } from 'react';
import { useQueryParams, StringParam, withDefault } from 'use-query-params';
import { useDebouncedCallback } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import useUpdateEffect from '@libs/useUpdateEffect';
import { TWHELP, NAME } from '@config/app';
import * as NAMESPACES from '@config/namespaces';

import useStyles from './styles';
import {
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Container,
  Button,
  Hidden,
  Link,
  IconButton,
} from '@material-ui/core';
import { Search as SearchIcon, Close as CloseIcon } from '@material-ui/icons';
import VersionSelector from '@common/VersionSelector/VersionSelector';

export default function Header() {
  const input = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useQueryParams({
    q: withDefault(StringParam, ''),
  });
  const [q, setQ] = useState(query.q);
  const debouncedSetQuery = useDebouncedCallback(
    value => setQuery({ q: value }),
    1000
  );
  useUpdateEffect(() => {
    debouncedSetQuery.callback(q);
  }, [q]);
  const { t } = useTranslation(NAMESPACES.INDEX_PAGE);
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar disableGutters className={classes.toolbar}>
          <div className={classes.searchInputWrapper}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={t<string>('header.search')}
              value={q}
              inputRef={input}
              size="small"
              onChange={e => {
                setQ(e.target.value);
              }}
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
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
                      disabled={q === ''}
                      onClick={() => setQ('')}
                    >
                      <CloseIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <VersionSelector />
          </div>
          <Hidden xsDown implementation="css">
            <Link href={TWHELP} underline="none">
              <Button>{NAME}</Button>
            </Link>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
