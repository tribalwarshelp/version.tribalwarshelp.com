import React from 'react';
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
  IconButton,
  AppBarProps,
} from '@material-ui/core';
import { Input as InputIcon } from '@material-ui/icons';
import Link from '@common/Link/Link';
import VersionSelector from '@common/VersionSelector/VersionSelector';
import SearchInput from './SearchInput';

export interface Props {
  showLinkToHomePage?: boolean;
  hideVersionSelectorOnMobile?: boolean;
  defaultQ?: string;
  appBarProps?: AppBarProps;
}

export default function Header({
  showLinkToHomePage = true,
  hideVersionSelectorOnMobile = false,
  defaultQ = '',
  appBarProps = {},
}: Props) {
  const { t } = useTranslation(NAMESPACES.COMMON);
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
            <SearchInput defaultQ={defaultQ} />
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
