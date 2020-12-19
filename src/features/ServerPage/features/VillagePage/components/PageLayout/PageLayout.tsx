import React, { useMemo } from 'react';
import clsx from 'clsx';
import randomInteger from '@utils/randomInteger';
import { TFunction } from 'i18next';
import { Village } from '../../types';

import { makeStyles } from '@material-ui/core/styles';

import { Toolbar, Typography } from '@material-ui/core';
import ServerPageLayout from '@features/ServerPage/common/PageLayout/PageLayout';
import PlayerProfileLink from '@features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';

import background1 from './backgrounds/bg-1-dark.jpg';
import background2 from './backgrounds/bg-2-dark.jpg';
import background3 from './backgrounds/bg-3-dark.jpg';

export interface Props {
  children: React.ReactNode;
  village: Village;
  server: string;
  t: TFunction;
}

function PageLayout({ children, village, server, t }: Props) {
  const classes = useStyles();
  const bg = useMemo(() => {
    return randomInteger(1, 3);
  }, []);
  return (
    <ServerPageLayout noPadding>
      <header className={clsx(classes.header, 'bg-' + bg)}>
        <Toolbar className={classes.toolbar}>
          <div>
            <Typography variant="h3">
              {village.fullName} (
              {t('pageLayout.points', {
                points: village.points.toLocaleString(),
              })}
              )
            </Typography>
            {village.player && (
              <Typography variant="h4">
                <PlayerProfileLink server={server} player={village.player} />
              </Typography>
            )}
          </div>
        </Toolbar>
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
  toolbar: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    '& > div': {
      width: '100%',
      marginBottom: theme.spacing(1),
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
