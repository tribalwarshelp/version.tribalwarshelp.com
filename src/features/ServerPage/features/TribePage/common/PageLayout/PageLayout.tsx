import React, { Fragment, useMemo } from 'react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import useTribe from '../../libs/TribePageContext/useTribe';
import useTabs from './useTabs';
import randomInteger from '@utils/randomInteger';
import * as NAMESPACES from '@config/namespaces';

import { makeStyles } from '@material-ui/core/styles';

import { Chip, Toolbar, Typography, Tabs, ChipProps } from '@material-ui/core';
import Content from '@common/Content/Content';
import TabLink from '@common/Link/TabLink';

import background1 from './backgrounds/bg-1-dark.jpg';
import background2 from './backgrounds/bg-2-dark.jpg';
import background3 from './backgrounds/bg-3-dark.jpg';

export interface Props {
  children: React.ReactNode;
}

function PageLayout({ children }: Props) {
  const classes = useStyles();
  const tribe = useTribe();
  const server = useServer();
  const { t } = useTranslation(NAMESPACES.SERVER_PAGE.TRIBE_PAGE.COMMON);
  const { tabs, currentTab } = useTabs(t);
  const bg = useMemo(() => {
    return randomInteger(1, 3);
  }, []);
  const chipProps: ChipProps = {
    color: 'secondary',
    size: 'small',
  };
  return (
    <div>
      <header className={clsx(classes.header, 'bg-' + bg)}>
        <Toolbar className={classes.toolbar}>
          <div style={{ width: '100%' }}>
            <Typography variant="h3">{tribe.name}</Typography>
            <div className={classes.tribeTagContainer}>
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
              <TabLink
                key={to}
                linkProps={{
                  to: to,
                  color: 'inherit',
                  params: { key: server.key, id: tribe.id },
                }}
                label={label}
              />
            );
          })}
        </Tabs>
      </header>
      <Content minHeight={false} component="div">
        {children}
      </Content>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  header: {
    width: '100%',
    minHeight: theme.spacing(30),
    paddingTop: theme.spacing(2),
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
      backgroundImage: `url(${background3})`,
    },
  },
  tribeTagContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      '& > *': {
        marginRight: `0 !important`,
      },
    },
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(2),
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
}));

export default PageLayout;
