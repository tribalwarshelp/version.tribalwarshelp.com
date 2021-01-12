import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
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
  IconButton,
  AppBarProps,
} from '@material-ui/core';
import { Input as InputIcon } from '@material-ui/icons';
import Link from '@common/Link/Link';
import VersionSelector from '@common/VersionSelector/VersionSelector';
import SearchInput from '@libs/GlobalSearch/SearchInput';

export interface Props {
  appBarProps?: AppBarProps;
}

export default function Header({ appBarProps = {} }: Props) {
  const { t } = useTranslation(NAMESPACES.COMMON);
  const location = useLocation();
  const classes = useStyles();

  const versionSelector = (
    <div>
      <VersionSelector />
    </div>
  );
  return (
    <AppBar position="fixed" {...appBarProps}>
      <Container>
        <Toolbar disableGutters className={classes.toolbar}>
          <form className={classes.form}>
            <SearchInput />
          </form>
          {location.pathname !== ROUTES.INDEX_PAGE && (
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
          {location.pathname !== ROUTES.INDEX_PAGE ? (
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
