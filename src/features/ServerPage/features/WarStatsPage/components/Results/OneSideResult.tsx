import React from 'react';
import formatNumber from '@utils/formatNumber';
import * as ROUTES from '@config/routes';

import { Typography } from '@material-ui/core';
import Link from '@common/Link/Link';
import { TFunction } from 'i18next';
import { SideResult } from '../../types';

export interface Props {
  data: SideResult;
  t: TFunction;
  server: string;
  title: string;
}

function OneSideResult({ data, t, server, title }: Props) {
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      {data.players.length > 0 && (
        <Typography>
          {t('players')}:{' '}
          {data.players.map(player => (
            <Link
              key={player.id}
              to={ROUTES.SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE}
              params={{ id: player.id, key: server }}
            >
              {player.name}{' '}
            </Link>
          ))}
        </Typography>
      )}
      {data.tribes.length > 0 && (
        <Typography>
          {t('tribes')}:{' '}
          {data.tribes.map(tribe => (
            <Link
              key={tribe.id}
              to={ROUTES.SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
              params={{ id: tribe.id, key: server }}
            >
              {tribe.tag}{' '}
            </Link>
          ))}
        </Typography>
      )}
      <Typography>
        {t('results.gained')}:{' '}
        <strong>{formatNumber('commas', data.gained)}</strong>
      </Typography>
      <Typography>
        {t('results.lost')}:{' '}
        <strong>{formatNumber('commas', data.lost)}</strong>
      </Typography>
      <Typography>
        {t('results.difference')}:{' '}
        <strong>{formatNumber('commas', data.difference)}</strong>
      </Typography>
    </div>
  );
}

export default OneSideResult;
