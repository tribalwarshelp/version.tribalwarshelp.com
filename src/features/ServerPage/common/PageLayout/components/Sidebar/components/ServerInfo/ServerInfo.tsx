import React from 'react';
import { TFunction } from 'i18next';
import useServer from '@features/ServerPage/libs/ServerContext/useServer';
import useStyles from './useStyles';
import formatDistanceToNow from '@libs/date/formatDistanceToNow';
import { Locale } from '@libs/date/locales';
import extractVersionCodeFromHostname from '@utils/extractVersionCodeFromHostname';

import { Typography } from '@material-ui/core';

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
          num: numberOfPlayers.toLocaleString(),
          count: numberOfPlayers,
        })}
      </Typography>
      <Typography>
        {t('pageLayout.sidebar.serverInfo.numberOfTribes', {
          num: numberOfTribes.toLocaleString(),
          count: numberOfTribes,
        })}
      </Typography>
      <Typography>
        {t('pageLayout.sidebar.serverInfo.numberOfVillages', {
          num: numberOfVillages.toLocaleString(),
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
