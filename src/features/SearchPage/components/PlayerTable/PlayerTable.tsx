import React from 'react';
import usePlayers from './usePlayers';
import { COLUMNS } from './constants';

import Table from 'common/Table/Table';
import { Props as TableFooterProps } from 'common/Table/TableFooter';
import PlayerProfileLink from 'features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';

import { TFunction } from 'i18next';
import { FoundPlayer } from 'libs/graphql/types';

export interface Props {
  t: TFunction;
  page: number;
  limit: number;
  q: string;
  onChangePage: TableFooterProps['onChangePage'];
  onChangeRowsPerPage: TableFooterProps['onChangeRowsPerPage'];
  version: string;
}

function PlayerTable({
  t,
  q,
  limit,
  page,
  onChangePage,
  onChangeRowsPerPage,
  version,
}: Props) {
  const { players, total, loading } = usePlayers(version, page, limit, q);

  return (
    <Table
      columns={COLUMNS.map((column, index) => ({
        ...column,
        valueFormatter:
          index === 1
            ? (player: FoundPlayer) => (
                <PlayerProfileLink
                  player={player}
                  tribe={
                    player.tribeID && player.tribeTag
                      ? { id: player.tribeID, tag: player.tribeTag }
                      : undefined
                  }
                  server={player.server}
                />
              )
            : column.valueFormatter,
        label: column.label ? t<string>(column.label) : '',
      }))}
      loading={loading}
      data={players}
      size="small"
      getIDFieldName={(row: FoundPlayer) => row.server + row.id}
      footerProps={{
        page,
        rowsPerPage: limit,
        count: total,
        onChangePage,
        onChangeRowsPerPage,
      }}
    />
  );
}

export default PlayerTable;
