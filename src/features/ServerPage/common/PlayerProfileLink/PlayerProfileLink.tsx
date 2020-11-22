import React from 'react';
import { SERVER_PAGE } from '@config/routes';
import Link from '@common/Link/Link';

export interface Player {
  id: number;
  name: string;
  tribe?: {
    id: number;
    tag: string;
  };
}

export interface Props {
  player: Player;
  server: string;
}

function PlayerProfileLink({ player, server }: Props) {
  return (
    <span>
      <Link
        to={SERVER_PAGE.PLAYER_PAGE.INDEX_PAGE}
        params={{ key: server, id: player.id }}
      >
        {player.name}
      </Link>
      {player.tribe && (
        <span>
          {` (`}
          <Link
            to={SERVER_PAGE.TRIBE_PAGE.INDEX_PAGE}
            params={{ key: server, id: player.tribe.id }}
          >
            {player.tribe.tag}
          </Link>
          )
        </span>
      )}
    </span>
  );
}

export default PlayerProfileLink;
