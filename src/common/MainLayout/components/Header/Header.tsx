import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TWHELP, NAME } from '@config/app';
import * as ROUTES from '@config/routes';
import * as NAMESPACES from '@config/namespaces';

import useStyles from './styles';
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Hidden,
  Link as MUILink,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Search as SearchIcon, Input as InputIcon } from '@material-ui/icons';
import Link from '@common/Link/Link';
import VersionSelector from '@common/VersionSelector/VersionSelector';
import SearchInput from '@common/Form/SearchInput';

export interface Props {
  showLinkToHomePage?: boolean;
  hideVersionSelectorOnMobile?: boolean;
  defaultQ?: string;
}

export default function Header({
  showLinkToHomePage = true,
  hideVersionSelectorOnMobile = false,
  defaultQ = '',
}: Props) {
  const [q, setQ] = useState<string>(defaultQ);
  const { t } = useTranslation(NAMESPACES.COMMON);
  const classes = useStyles();
  const trimmedQLength = q.trim().length;

  const iconButton = (
    <IconButton size="small" type="submit" disabled={trimmedQLength === 0}>
      <SearchIcon />
    </IconButton>
  );
  const versionSelector = (
    <div>
      <VersionSelector />
    </div>
  );
  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar disableGutters className={classes.toolbar}>
          <form className={classes.form}>
            <SearchInput
              fullWidth
              variant="outlined"
              placeholder={t<string>('mainLayout.header.search')}
              value={q}
              onChange={e => {
                setQ(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {trimmedQLength ? (
                      <Link
                        to={ROUTES.SEARCH_PAGE + `?q=${encodeURIComponent(q)}`}
                      >
                        {iconButton}
                      </Link>
                    ) : (
                      iconButton
                    )}
                  </InputAdornment>
                ),
              }}
              onResetValue={() => setQ('')}
              size="small"
            />
          </form>
          {showLinkToHomePage && (
            <Link to={ROUTES.INDEX_PAGE}>
              <Hidden xsDown implementation="css">
                <Button startIcon={<InputIcon />}>
                  {t('mainLayout.header.home')}
                </Button>
              </Hidden>
              <Hidden smUp implementation="css">
                <IconButton>
                  <InputIcon />
                </IconButton>
              </Hidden>
            </Link>
          )}
          {hideVersionSelectorOnMobile ? (
            <Hidden xsDown implementation="css">
              {versionSelector}
            </Hidden>
          ) : (
            versionSelector
          )}
          <Hidden xsDown implementation="css">
            <MUILink href={TWHELP} underline="none">
              <Button>{NAME}</Button>
            </MUILink>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
