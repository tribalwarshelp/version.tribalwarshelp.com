import React, { Fragment, useMemo } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import usePlayer from '../../libs/PlayerPageContext/usePlayer';
import useTabs from './useTabs';
import randomInteger from '@utils/randomInteger';
import * as NAMESPACES from '@config/namespaces';
import * as ROUTES from '@config/routes';

import { makeStyles } from '@material-ui/core/styles';

import { Chip, Toolbar, Typography, Tabs, ChipProps } from '@material-ui/core';
import Link from '@common/Link/Link';
import TabLink from '@common/Link/TabLink';
import ServerPageLayout from '@features/ServerPage/common/PageLayout/PageLayout';

import background1 from './backgrounds/bg-1-dark.png';
import background2 from './backgrounds/bg-2-dark.jpg';
import background3 from './backgrounds/bg-3-dark.jpg';

export interface Props {
  children: React.ReactNode;
}

function PageLayout({ children }: Props) {
  const classes = useStyles();
  const player = usePlayer();
  const server = useServer();
  const { t } = useTranslation(NAMESPACES.SERVER_PAGE.PLAYER_PAGE.COMMON);
  const { currentTab, tabs } = useTabs(t);
  const bg = useMemo(() => {
    return randomInteger(1, 3);
  }, []);
  const chipProps: ChipProps = {
    color: 'secondary',
    size: 'small',
  };
  return (
    <ServerPageLayout noPadding>
      <header className={clsx(classes.header, 'bg-' + bg)}>
        <Toolbar className={classes.toolbar}>
          <div style={{ width: '100%' }}>
            <div className={classes.playerNameContainer}>
              <Typography variant="h3">{player.name}</Typography>
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
              <Typography variant="h4">
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
              <TabLink
                key={to}
                linkProps={{
                  to: to,
                  color: 'inherit',
                  params: { key: server.key, id: player.id },
                }}
                label={label}
              />
            );
          })}
        </Tabs>
      </header>
      <div className={classes.content}>{children}</div>
    </ServerPageLayout>
  );
}

const useStyles = makeStyles(theme => ({
  header: {
    width: '100%',
    paddingTop: theme.spacing(2),
    minHeight: theme.spacing(30),
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    boxShadow: theme.shadows[4],
    '&.bg-1': {
      backgroundImage: `url(${background1})`,
    },
    '&.bg-2': {
      backgroundImage: `url(${background2})`,
    },
    '&.bg-3': {
      backgroundPosition: '50% 80%',
      backgroundImage: `url(${background3})`,
    },
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
        marginRight: `0 !important`,
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
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  content: {
    height: '100%',
    padding: theme.spacing(3, 0),
    '&.no-padding': {
      padding: '0 0',
    },
  },
}));

export default PageLayout;
