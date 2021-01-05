import React from 'react';
import { TFunction } from 'i18next';
import formatNumber from '@utils/formatNumber';
import { Village } from '../../types';

import { makeStyles } from '@material-ui/core/styles';

import { Toolbar, Typography } from '@material-ui/core';
import Content from '@common/Content/Content';
import WordWrap from '@common/WordWrap/WordWrap';
import PlayerProfileLink from '@features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';

import background from './backgrounds/bg-1-dark.jpg';

export interface Props {
  children: React.ReactNode;
  village: Village;
  server: string;
  t: TFunction;
}

function PageLayout({ children, village, server, t }: Props) {
  const classes = useStyles();
  return (
    <div>
      <header className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <div>
            <Typography variant="h3">
              <WordWrap>{village.fullName}</WordWrap> (
              {t('pageLayout.points', {
                points: formatNumber('commas', village.points),
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
    backgroundImage: `url(${background})`,
    boxShadow: theme.shadows[4],
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
}));

export default PageLayout;
