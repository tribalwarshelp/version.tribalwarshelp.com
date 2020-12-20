import React, { useState } from 'react';
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
  Container,
  Button,
  Hidden,
  Link,
} from '@material-ui/core';
import VersionSelector from '@common/VersionSelector/VersionSelector';
import SearchInput from '@common/Form/SearchInput';

export default function Header() {
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
            <SearchInput
              fullWidth
              variant="outlined"
              placeholder={t<string>('header.search')}
              value={q}
              onChange={e => {
                setQ(e.target.value);
              }}
              onResetValue={() => setQ('')}
              size="small"
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
