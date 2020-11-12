import React from 'react';
import clsx from 'clsx';
import { generatePath } from 'react-router';
import { TFunction } from 'i18next';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import useStyles from './useStyles';
import * as ROUTES from '@config/routes';
import { Route } from './components/Nav/types';

import { useTheme } from '@material-ui/core/styles';
import {
  Divider,
  SwipeableDrawer,
  DrawerProps,
  Toolbar,
} from '@material-ui/core';
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
  const theme = useTheme();

  const routes: Route[] = [
    {
      name: t('pageLayout.sidebar.routes.dashboard'),
      to: generatePath(ROUTES.SERVER_PAGE.INDEX_PAGE, {
        key: key,
      }),
      Icon: <DashboardIcon color="inherit" />,
    },
  ];

  return (
    <SwipeableDrawer
      anchor="left"
      classes={{ paper: classes.drawerPaper }}
      ModalProps={{ style: { zIndex: theme.zIndex.appBar - 1 } }}
      onClose={onClose}
      onOpen={onOpen}
      open={open}
      variant={variant}
    >
      <Toolbar />
      <div className={clsx(classes.root, className)}>
        <ServerInfo t={t} />
        <Divider />
        <Nav routes={routes} />
      </div>
    </SwipeableDrawer>
  );
};

export default Sidebar;
