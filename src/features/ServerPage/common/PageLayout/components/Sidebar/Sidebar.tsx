import React from 'react';
import clsx from 'clsx';
import { generatePath } from 'react-router';
import { TFunction } from 'i18next';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import useStyles from './useStyles';
import * as ROUTES from '@config/routes';
import { Route } from './components/Nav/types';

import { Divider, SwipeableDrawer, DrawerProps } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';

import Nav from './components/Nav/Nav';
import ServerInfo from './components/ServerInfo/ServerInfo';

export interface Props {
  t: TFunction;
  className?: string;
  open: boolean;
  onClose: React.ReactEventHandler<{}>;
  onOpen: React.ReactEventHandler<{}>;
  variant?: DrawerProps['variant'];
}

const Sidebar = ({ t, className, open, variant, onClose, onOpen }: Props) => {
  const classes = useStyles();
  const { key } = useServer();

  const routes: Route[] = [
    {
      name: t('pageLayout.sidebar.routes.dashboard'),
      to: generatePath(ROUTES.SERVER_PAGE.INDEX_PAGE, {
        key: key,
      }),
      Icon: <DashboardIcon />,
    },
  ];

  return (
    <SwipeableDrawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      variant={variant}
      disableBackdropTransition
    >
      <div className={clsx(classes.root, className)}>
        <ServerInfo t={t} />
        <Divider />
        <Nav routes={routes} />
      </div>
    </SwipeableDrawer>
  );
};

export default Sidebar;
