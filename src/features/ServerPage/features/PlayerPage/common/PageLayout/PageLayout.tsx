import React, { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import usePlayer from '../../libs/PlayerPageContext/usePlayer';
import * as NAMESPACES from '@config/namespaces';
import * as ROUTES from '@config/routes';

import { makeStyles } from '@material-ui/core/styles';

import { Badge, Toolbar, Typography, Tabs, Tab } from '@material-ui/core';
import Link from '@common/Link/Link';
import ServerPageLayout from '@features/ServerPage/common/PageLayout/PageLayout';

import background from './profile-background-dark.png';

const useStyles = makeStyles(theme => ({
  header: {
    width: '100%',
    minHeight: theme.spacing(30),
    backgroundPosition: 'center',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
}));

export interface Props {
  children: React.ReactNode;
}

function PageLayout({ children }: Props) {
  const classes = useStyles();
  const player = usePlayer();
  const server = useServer();
  const loc = useLocation();
  const { t } = useTranslation(NAMESPACES.SERVER_PAGE.PLAYER_PAGE.COMMON);

  const title = <Typography variant="h4">{player.name}</Typography>;
  const tabs = useMemo(() => {
    return [
      {
        to: ROUTES.SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE,
        label: t('pageLayout.tabs.indexPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.PLAYER_PAGE.HISTORY_PAGE,
        label: t('pageLayout.tabs.historyPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.PLAYER_PAGE.TRIBE_CHANGES_PAGE,
        label: t('pageLayout.tabs.tribeChanges'),
      },
      {
        to: ROUTES.SERVER_PAGE.PLAYER_PAGE.CONQUERS_PAGE,
        label: t('pageLayout.tabs.conquersPage'),
      },
    ];
  }, []);
  const currentTab = useMemo(
    () =>
      tabs.findIndex(({ to }) => {
        return matchPath(loc.pathname, { exact: true, path: to });
      }),
    [loc.pathname, tabs]
  );
  return (
    <ServerPageLayout noPadding>
      <header className={classes.header}>
        <Toolbar>
          <div>
            {player.exists ? (
              title
            ) : (
              <Badge
                color="error"
                badgeContent={t('pageLayout.noLongerExists')}
              >
                {title}
              </Badge>
            )}
            {player.tribe && (
              <Typography variant="h5">
                <Link
                  to={ROUTES.SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
                  params={{ key: server.key, id: player.tribe.id }}
                >
                  {player.tribe.tag}
                </Link>
              </Typography>
            )}
          </div>
        </Toolbar>
        <Tabs
          variant="scrollable"
          value={currentTab}
          selectionFollowsFocus={false}
        >
          {tabs.map(({ to, label }) => {
            return (
              <Tab
                key={to}
                label={
                  <Link
                    to={to}
                    color="inherit"
                    params={{ key: server.key, id: player.id }}
                  >
                    {label}
                  </Link>
                }
              />
            );
          })}
        </Tabs>
      </header>
      {children}
    </ServerPageLayout>
  );
}

export default PageLayout;
