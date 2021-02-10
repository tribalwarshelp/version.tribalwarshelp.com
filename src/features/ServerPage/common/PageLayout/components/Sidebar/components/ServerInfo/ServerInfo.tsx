import React, { useState, useEffect } from 'react';
import useDateUtils from 'libs/date/useDateUtils';
import useServer from 'features/ServerPage/libs/ServerContext/useServer';
import useStyles from './useStyles';
import formatNumber from 'utils/formatNumber';

import { Typography } from '@material-ui/core';

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
  const dateUtils = useDateUtils();
  const classes = useStyles();

  const getDataUpdatedAtText = () => {
    return t('pageLayout.sidebar.serverInfo.dataUpdatedAt', {
      date: dateUtils.formatDistanceToNow(new Date(dataUpdatedAt), {
        addSuffix: true,
      }),
    });
  };
  const [dataUpdatedAtText, setDataUpdatedAtText] = useState<string>(
    getDataUpdatedAtText()
  );
  useEffect(() => {
    const intervalID = setInterval(() => {
      setDataUpdatedAtText(getDataUpdatedAtText());
    }, 30000);
    return () => {
      clearInterval(intervalID);
    }; // eslint-disable-next-line
  }, [dataUpdatedAt, t, dateUtils]);

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
      <Typography>{dataUpdatedAtText}</Typography>
    </div>
  );
};

export default ServerInfo;
