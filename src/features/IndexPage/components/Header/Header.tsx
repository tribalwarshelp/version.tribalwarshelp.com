import React from 'react';
import { useQueryParams, StringParam, withDefault } from 'use-query-params';
import { useDebouncedCallback } from 'use-debounce';
import { TWHELP } from '@config/app';

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
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar disableGutters className={classes.toolbar}>
          <div className={classes.searchInputWrapper}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search"
              defaultValue={query.q}
              size="small"
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
          <Hidden xsDown implementation="css">
            <Link href={TWHELP} underline="none">
              <Button>TWHelp</Button>
            </Link>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
