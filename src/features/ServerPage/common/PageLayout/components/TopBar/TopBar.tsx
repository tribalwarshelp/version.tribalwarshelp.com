import React from 'react';
import clsx from 'clsx';
import { TFunction } from 'i18next';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import * as ROUTES from '@config/routes';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Hidden,
  IconButton,
  Typography,
  Button,
  Tooltip,
  Container,
} from '@material-ui/core';
import { Menu as MenuIcon, Input as InputIcon } from '@material-ui/icons';
import VersionSelector from '@common/VersionSelector/VersionSelector';
import Link from '@common/Link/Link';

export interface Props {
  className?: string;
  t: TFunction;
  openSidebar?: () => void;
}

const TopBar = ({ className, openSidebar, t }: Props) => {
  const { key } = useServer();
  const classes = useStyles();

  return (
    <AppBar className={clsx(className)}>
      <Container maxWidth={false}>
        <Toolbar disableGutters className={classes.toolbar}>
          <div className={classes.leftSideContainer}>
            <Hidden lgUp>
              <IconButton color="inherit" onClick={openSidebar}>
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography variant="h4">
              <Link
                color="inherit"
                params={{ key }}
                to={ROUTES.SERVER_PAGE.INDEX_PAGE}
              >
                {key}
              </Link>
            </Typography>
          </div>
          <div className={classes.rightSideContainer}>
            <Link to={ROUTES.INDEX_PAGE} color="inherit">
              <Hidden xsDown>
                <Button startIcon={<InputIcon />}>
                  {t('pageLayout.topBar.home')}
                </Button>
              </Hidden>
              <Hidden smUp>
                <Tooltip
                  placement="bottom"
                  arrow
                  title={t<string>('pageLayout.topBar.home')}
                >
                  <IconButton color="inherit">
                    <InputIcon />
                  </IconButton>
                </Tooltip>
              </Hidden>
            </Link>
            <VersionSelector />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  toolbar: {
    justifyContent: 'space-between',
  },
  leftSideContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
  rightSideContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },
}));

export default TopBar;
