import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { TFunction } from 'i18next';
import useServer from 'features/ServerPage/libs/ServerContext/useServer';
import useStyles from './useStyles';
import * as ROUTES from 'config/routes';
import { Route } from './components/Nav/types';

import { useTheme } from '@material-ui/core/styles';
import {
  Divider,
  SwipeableDrawer,
  DrawerProps,
  Toolbar,
  Box,
  Hidden,
} from '@material-ui/core';
import {
  Dashboard as DashboardIcon,
  Map as MapIcon,
  Grade as GradeIcon,
  Beenhere as BeenhereIcon,
  Fireplace as FireplaceIcon,
} from '@material-ui/icons';
import DevNote from 'common/DevNote/DevNote';
import SearchInput from 'libs/GlobalSearch/SearchInput';
import Nav from './components/Nav/Nav';
import ServerInfo from './components/ServerInfo/ServerInfo';

export interface Props {
  t: TFunction;
  className?: string;
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
  variant?: DrawerProps['variant'];
}

const Sidebar = ({ t, className, open, variant, onClose, onOpen }: Props) => {
  const classes = useStyles();
  const { key } = useServer();
  const theme = useTheme();
  const { pathname } = useLocation();
  const routes: Route[] = [
    {
      name: t('pageLayout.sidebar.routes.dashboard'),
      to: ROUTES.SERVER_PAGE.INDEX_PAGE,
      params: { key },
      Icon: <DashboardIcon color="inherit" />,
      exact: true,
    },
    {
      name: t('pageLayout.sidebar.routes.rankings.name'),
      Icon: <GradeIcon color="inherit" />,
      to: ROUTES.SERVER_PAGE.RANKING_PAGE.BASE,
      isExpandable: true,
      nested: [
        {
          name: t('pageLayout.sidebar.routes.rankings.player.index'),
          to: ROUTES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.INDEX_PAGE,
          params: { key },
          Icon: <GradeIcon color="inherit" />,
          exact: true,
        },
        {
          name: t('pageLayout.sidebar.routes.rankings.player.od'),
          to: ROUTES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.OD_PAGE,
          params: { key },
          Icon: <GradeIcon color="inherit" />,
          exact: true,
        },
        {
          name: t('pageLayout.sidebar.routes.rankings.player.daily'),
          to: ROUTES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.DAILY_PAGE,
          params: { key },
          Icon: <GradeIcon color="inherit" />,
          exact: true,
        },
        {
          name: t('pageLayout.sidebar.routes.rankings.player.archive'),
          to: ROUTES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.ARCHIVE_PAGE,
          params: { key },
          Icon: <GradeIcon color="inherit" />,
          exact: true,
        },
        {
          name: t('pageLayout.sidebar.routes.rankings.tribe.index'),
          to: ROUTES.SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.INDEX_PAGE,
          params: { key },
          Icon: <GradeIcon color="inherit" />,
          exact: true,
        },
        {
          name: t('pageLayout.sidebar.routes.rankings.tribe.od'),
          to: ROUTES.SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.OD_PAGE,
          params: { key },
          Icon: <GradeIcon color="inherit" />,
          exact: true,
        },
        {
          name: t('pageLayout.sidebar.routes.rankings.tribe.daily'),
          to: ROUTES.SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.DAILY_PAGE,
          params: { key },
          Icon: <GradeIcon color="inherit" />,
          exact: true,
        },
        {
          name: t('pageLayout.sidebar.routes.rankings.tribe.archive'),
          to: ROUTES.SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.ARCHIVE_PAGE,
          params: { key },
          Icon: <GradeIcon color="inherit" />,
          exact: true,
        },
      ],
    },
    {
      name: t('pageLayout.sidebar.routes.ennoblements'),
      to: ROUTES.SERVER_PAGE.ENNOBLEMENTS_PAGE,
      params: { key },
      Icon: <BeenhereIcon color="inherit" />,
      exact: true,
    },
    {
      name: t('pageLayout.sidebar.routes.map'),
      to: ROUTES.SERVER_PAGE.MAP_PAGE,
      params: { key },
      Icon: <MapIcon color="inherit" />,
      exact: true,
    },
    {
      name: t('pageLayout.sidebar.routes.warStats'),
      to: ROUTES.SERVER_PAGE.WAR_STATS_PAGE,
      params: { key },
      Icon: <FireplaceIcon color="inherit" />,
      exact: true,
    },
  ];

  useEffect(() => {
    onClose(); // eslint-disable-next-line
  }, [pathname]);

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
        <Hidden mdUp implementation="css">
          <Box padding={1} paddingBottom={0} component="form">
            <SearchInput />
          </Box>
        </Hidden>
        <ServerInfo t={t} />
        <Divider />
        <Nav routes={routes} />
        <Divider />
        <Box padding={1}>
          <DevNote />
        </Box>
      </div>
    </SwipeableDrawer>
  );
};

export default Sidebar;
