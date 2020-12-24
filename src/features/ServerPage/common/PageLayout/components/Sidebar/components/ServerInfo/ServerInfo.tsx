import React from 'react';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import useStyles from './useStyles';
import formatDistanceToNow from '@libs/date/formatDistanceToNow';
import formatNumber from '@utils/formatNumber';
import extractVersionCodeFromHostname from '@utils/extractVersionCodeFromHostname';

import { Typography } from '@material-ui/core';

import { Locale } from '@libs/date/locales';
import { TFunction } from 'i18next';

export interface Props {
  t: TFunction;
}

const ServerInfo = ({ t }: Props) => {
  const {
    numberOfPlayers,
    numberOfTribes,
    dataUpdatedAt,
    numberOfVillages,
  } = useServer();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>
        {t('pageLayout.sidebar.serverInfo.numberOfPlayers', {
          num: formatNumber('commas', numberOfPlayers),
          count: numberOfPlayers,
        })}
      </Typography>
      <Typography>
        {t('pageLayout.sidebar.serverInfo.numberOfTribes', {
          num: formatNumber('commas', numberOfTribes),
          count: numberOfTribes,
        })}
      </Typography>
      <Typography>
        {t('pageLayout.sidebar.serverInfo.numberOfVillages', {
          num: formatNumber('commas', numberOfVillages),
          count: numberOfVillages,
        })}
      </Typography>
      <Typography>
        {t('pageLayout.sidebar.serverInfo.dataUpdatedAt', {
          date: formatDistanceToNow(new Date(dataUpdatedAt), {
            locale: extractVersionCodeFromHostname(
              window.location.hostname
            ) as Locale,
            addSuffix: true,
          }),
        })}
      </Typography>
    </div>
  );
};

export default ServerInfo;
