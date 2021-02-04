import React from 'react';
import { SERVER_PAGE } from 'config/routes';
import Link from 'common/Link/Link';

export interface Tribe {
  id: number;
  tag: string;
}

export interface Player {
  id: number;
  name: string;
  tribe?: Tribe;
}

export interface Props {
  player: Player;
  server: string;
  tribe?: Tribe;
}

function PlayerProfileLink({ player, server, tribe }: Props) {
  const t = tribe ? tribe : player.tribe ? player.tribe : undefined;
  return (
    <span>
      <Link
        to={SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE}
        params={{ key: server, id: player.id }}
      >
        {player.name}
      </Link>
      {t && (
        <span>
          {` (`}
          <Link
            to={SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
            params={{ key: server, id: t.id }}
          >
            {t.tag}
          </Link>
          )
        </span>
      )}
    </span>
  );
}

export default PlayerProfileLink;
