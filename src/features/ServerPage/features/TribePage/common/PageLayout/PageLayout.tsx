import React, { Fragment, useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import useTribe from '../../libs/TribePageContext/useTribe';
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

export interface Props {
  children: React.ReactNode;
}

function PageLayout({ children }: Props) {
  const classes = useStyles();
  const tribe = useTribe();
  const server = useServer();
  const loc = useLocation();
  const { t } = useTranslation(NAMESPACES.SERVER_PAGE.TRIBE_PAGE.COMMON);
  const tabs = useMemo(() => {
    return [
      {
        to: ROUTES.SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE,
        label: t('pageLayout.tabs.indexPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.TRIBE_PAGE.MEMBERS_PAGE,
        label: t('pageLayout.tabs.membersPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.TRIBE_PAGE.HISTORY_PAGE,
        label: t('pageLayout.tabs.historyPage'),
      },
      {
        to: ROUTES.SERVER_PAGE.TRIBE_PAGE.TRIBE_CHANGES_PAGE,
        label: t('pageLayout.tabs.tribeChanges'),
      },
      {
        to: ROUTES.SERVER_PAGE.TRIBE_PAGE.ENNOBLEMENTS_PAGE,
        label: t('pageLayout.tabs.ennoblementsPage'),
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
            <div className={classes.tribeNameContainer}>
              <Typography variant="h3">{tribe.tag}</Typography>
              <div className={classes.chipContainer}>
                {!tribe.exists ? (
                  <Chip {...chipProps} label={t('pageLayout.noLongerExists')} />
                ) : (
                  <Fragment>
                    {[1, 2, 3].includes(tribe.rank) && (
                      <Chip
                        {...chipProps}
                        label={t('pageLayout.achievements.tribeRank', {
                          rank: tribe.rank,
                        })}
                      />
                    )}
                    {[1, 2, 3].includes(tribe.rankAtt) && (
                      <Chip
                        {...chipProps}
                        label={t('pageLayout.achievements.odaRank', {
                          rank: tribe.rankAtt,
                        })}
                      />
                    )}
                    {[1, 2, 3].includes(tribe.rankDef) && (
                      <Chip
                        {...chipProps}
                        label={t('pageLayout.achievements.oddRank', {
                          rank: tribe.rankDef,
                        })}
                      />
                    )}
                    {[1, 2, 3].includes(tribe.rankTotal) && (
                      <Chip
                        {...chipProps}
                        label={t('pageLayout.achievements.odRank', {
                          rank: tribe.rankTotal,
                        })}
                      />
                    )}
                  </Fragment>
                )}
              </div>
            </div>
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
                    params={{ key: server.key, id: tribe.id }}
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
      <div className={classes.content}>{children}</div>
    </ServerPageLayout>
  );
}

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
  tribeNameContainer: {
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
