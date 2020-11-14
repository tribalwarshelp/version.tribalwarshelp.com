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
import {
  Dashboard as DashboardIcon,
  Map as MapIcon,
  Grade as GradeIcon,
  Beenhere as BeenhereIcon,
} from '@material-ui/icons';

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
    {
      name: t('pageLayout.sidebar.routes.rankings.name'),
      Icon: <GradeIcon color="inherit" />,
      nested: [
        {
          name: t('pageLayout.sidebar.routes.rankings.player.index'),
          to: generatePath(
            ROUTES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.INDEX_PAGE,
            {
              key: key,
            }
          ),
          Icon: <GradeIcon color="inherit" />,
        },
        {
          name: t('pageLayout.sidebar.routes.rankings.player.od'),
          to: generatePath(
            ROUTES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.OD_PAGE,
            {
              key: key,
            }
          ),
          Icon: <GradeIcon color="inherit" />,
        },
        {
          name: t('pageLayout.sidebar.routes.rankings.player.archive'),
          to: generatePath(
            ROUTES.SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.ARCHIVE_PAGE,
            {
              key: key,
            }
          ),
          Icon: <GradeIcon color="inherit" />,
        },
        {
          name: t('pageLayout.sidebar.routes.rankings.tribe.index'),
          to: generatePath(
            ROUTES.SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.INDEX_PAGE,
            {
              key: key,
            }
          ),
          Icon: <GradeIcon color="inherit" />,
        },
        {
          name: t('pageLayout.sidebar.routes.rankings.tribe.od'),
          to: generatePath(ROUTES.SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.OD_PAGE, {
            key: key,
          }),
          Icon: <GradeIcon color="inherit" />,
        },
        {
          name: t('pageLayout.sidebar.routes.rankings.tribe.archive'),
          to: generatePath(
            ROUTES.SERVER_PAGE.RANKING_PAGE.TRIBE_PAGE.ARCHIVE_PAGE,
            {
              key: key,
            }
          ),
          Icon: <GradeIcon color="inherit" />,
        },
      ],
    },
    {
      name: t('pageLayout.sidebar.routes.ennoblements'),
      to: generatePath(ROUTES.SERVER_PAGE.ENNOBLEMENTS_PAGE, {
        key: key,
      }),
      Icon: <BeenhereIcon color="inherit" />,
    },
    {
      name: t('pageLayout.sidebar.routes.map'),
      to: generatePath(ROUTES.SERVER_PAGE.MAP_PAGE, {
        key: key,
      }),
      Icon: <MapIcon color="inherit" />,
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
