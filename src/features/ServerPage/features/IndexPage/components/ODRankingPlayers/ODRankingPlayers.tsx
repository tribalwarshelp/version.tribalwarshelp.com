import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { SERVER_PAGE } from '@config/routes';
import { PLAYERS } from './queries';
import { COLUMNS, LIMIT } from './constants';

import { Typography } from '@material-ui/core';
import TableToolbar from '@common/Table/TableToolbar';
import Table from '@common/Table/Table';
import Link from '@common/Link/Link';
import PlayerProfileLink from '@features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';
import Paper from '../Paper/Paper';
import ModeSelector from '../ModeSelector/ModeSelector';

import { TFunction } from 'i18next';
import { PlayersQueryVariables } from '@libs/graphql/types';
import { PlayersList, Mode, Player } from './types';

export interface Props {
  server: string;
  t: TFunction;
}

function ODRankingPlayers({ server, t }: Props) {
  const [mode, setMode] = useState<Mode>('rankTotal');
  const { loading: loadingData, data } = useQuery<
    PlayersList,
    PlayersQueryVariables
  >(PLAYERS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: LIMIT,
      sort: [mode + ' ASC'],
      filter: {
        exists: true,
        [mode + 'GTE']: 1,
      },
      server,
    },
  });
  const items = data?.players?.items ?? [];
  const loading = loadingData && items.length === 0;

  const formatScore = (p: Player): string => {
    switch (mode) {
      case 'rankAtt':
        return p.scoreAtt.toLocaleString();
      case 'rankDef':
        return p.scoreDef.toLocaleString();
      case 'rankSup':
        return p.scoreSup.toLocaleString();
      case 'rankTotal':
        return p.scoreTotal.toLocaleString();
    }
  };

  return (
    <Paper>
      <TableToolbar>
        <Typography variant="h4">
          <Link
            to={SERVER_PAGE.RANKING_PAGE.PLAYER_PAGE.OD_PAGE}
            params={{ key: server }}
          >
            {t('odRankingPlayers.title')}
          </Link>
        </Typography>
      </TableToolbar>
      <ModeSelector
        buttonProps={{
          variant: 'outlined',
        }}
        onSelect={m => setMode(m.name as Mode)}
        modes={[
          {
            name: 'rankAtt',
            label: t('odRankingPlayers.modes.rankAtt'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'rankDef',
            label: t('odRankingPlayers.modes.rankDef'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'rankSup',
            label: t('odRankingPlayers.modes.rankSup'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'rankTotal',
            label: t('odRankingPlayers.modes.rankTotal'),
            get selected() {
              return this.name === mode;
            },
          },
        ]}
      />
      <Table
        columns={COLUMNS.map((column, index) => ({
          ...column,
          valueFormatter:
            index === 1
              ? (player: Player) => (
                  <PlayerProfileLink player={player} server={server} />
                )
              : index === 0
              ? (player: Player) => player[mode].toLocaleString()
              : index === 2
              ? formatScore
              : column.valueFormatter,
          label: column.label ? t<string>(column.label) : '',
        }))}
        loading={loading}
        data={items}
        size="small"
        hideFooter
        footerProps={{ rowsPerPage: LIMIT, rowsPerPageOptions: [LIMIT] }}
      />
    </Paper>
  );
}

export default ODRankingPlayers;
