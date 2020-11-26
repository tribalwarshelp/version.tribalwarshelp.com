import React, { Fragment, useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import usePlayer from '../../libs/PlayerPageContext/usePlayer';
import * as NAMESPACES from '@config/namespaces';
import * as ROUTES from '@config/routes';

import { makeStyles } from '@material-ui/core/styles';

import {
  Chip,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  ChipProps,
} from '@material-ui/core';
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
    boxShadow: theme.shadows[4],
  },
  playerNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& > *': {
        marginRight: 0,
        marginBottom: theme.spacing(1),
      },
    },
  },
  toolbar: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center',
    },
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
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
  }, [t]);
  const currentTab = useMemo(
    () =>
      tabs.findIndex(({ to }) => {
        return matchPath(loc.pathname, { exact: true, path: to });
      }),
    [loc.pathname, tabs]
  );
  const chipProps: ChipProps = {
    color: 'secondary',
    size: 'small',
  };
  return (
    <ServerPageLayout noPadding>
      <header className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <div style={{ width: '100%' }}>
            <div className={classes.playerNameContainer}>
              <Typography variant="h4">{player.name}</Typography>
              <div className={classes.chipContainer}>
                {!player.exists ? (
                  <Chip {...chipProps} label={t('pageLayout.noLongerExists')} />
                ) : (
                  <Fragment>
                    {[1, 2, 3].includes(player.rank) && (
                      <Chip
                        {...chipProps}
                        label={t('pageLayout.achievements.playerRank', {
                          rank: player.rank,
                        })}
                      />
                    )}
                    {[1, 2, 3].includes(player.rankAtt) && (
                      <Chip
                        {...chipProps}
                        label={t('pageLayout.achievements.odaRank', {
                          rank: player.rankAtt,
                        })}
                      />
                    )}
                    {[1, 2, 3].includes(player.rankDef) && (
                      <Chip
                        {...chipProps}
                        label={t('pageLayout.achievements.oddRank', {
                          rank: player.rankDef,
                        })}
                      />
                    )}
                    {[1, 2, 3].includes(player.rankSup) && (
                      <Chip
                        {...chipProps}
                        label={t('pageLayout.achievements.odsRank', {
                          rank: player.rankSup,
                        })}
                      />
                    )}
                    {[1, 2, 3].includes(player.rankTotal) && (
                      <Chip
                        {...chipProps}
                        label={t('pageLayout.achievements.odRank', {
                          rank: player.rankTotal,
                        })}
                      />
                    )}
                  </Fragment>
                )}
              </div>
            </div>
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
                    style={{ width: '100%', height: '100%' }}
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
