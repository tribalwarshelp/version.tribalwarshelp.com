import React from 'react';
import formatNumber from 'utils/formatNumber';
import * as ROUTES from 'config/routes';

import { Typography } from '@material-ui/core';
import Link from 'common/Link/Link';
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
          {data.players.map((player, index) => (
            <span key={player.id}>
              <Link
                to={ROUTES.SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE}
                params={{ id: player.id, key: server }}
              >
                {player.name}
              </Link>
              {index !== data.players.length - 1 ? ', ' : ''}
            </span>
          ))}
        </Typography>
      )}
      {data.tribes.length > 0 && (
        <Typography>
          {t('tribes')}:{' '}
          {data.tribes.map((tribe, index) => (
            <span key={tribe.id}>
              <Link
                to={ROUTES.SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
                params={{ id: tribe.id, key: server }}
              >
                {tribe.tag}
              </Link>
              {index !== data.tribes.length - 1 ? ', ' : ''}
            </span>
          ))}
        </Typography>
      )}
      <Typography>
        {t('results.villages')}:{' '}
        <strong>{formatNumber('commas', data.totalVillages)}</strong>
      </Typography>
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
