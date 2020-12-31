import React, { useMemo, useState } from 'react';
import useDateUtils from '@libs/date/useDateUtils';
import useMembers from './useMembers';
import formatNumber from '@utils/formatNumber';
import { DATE_FORMAT } from '@config/app';
import { HOW_MANY_DAYS_BACK } from './contants';

import { Paper } from '@material-ui/core';
import Table from '@common/Table/Table';
import { Column } from '@common/Table/types';
import PlayerProfileLink from '@features/ServerPage/common/PlayerProfileLink/PlayerProfileLink';
import ModeSelector from '@common/ModeSelector/ModeSelector';
import ColouredNumber from './ColouredNumber';

import { TFunction } from 'i18next';
import { Player, Mode } from './types';

export interface Props {
  server: string;
  tribeID: number;
  t: TFunction;
}

function Members({ t, server, tribeID }: Props) {
  const [mode, setMode] = useState<Mode>('points');
  const { members, loading, dailyPlayerStats } = useMembers(
    tribeID,
    server,
    HOW_MANY_DAYS_BACK
  );
  const dateUtils = useDateUtils();
  const columns = useMemo<Column<Player>[]>(() => {
    const columns: Column<Player>[] = [
      {
        field: 'index',
        label: '',
        sortable: false,
        valueFormatter: (_p: Player, i: number) => {
          return i + 1 + '.';
        },
      },
      {
        field: 'name',
        label: t('members.columns.player'),
        sortable: false,
        valueFormatter: (p: Player) => {
          return <PlayerProfileLink player={p} server={server} />;
        },
      },
      {
        field: 'points',
        label: t('members.columns.points'),
        sortable: false,
        valueFormatter: (p: Player) => {
          return `${formatNumber('commas', p.points)} (#${p.rank})`;
        },
      },
      {
        field: 'totalVillages',
        label: t('members.columns.totalVillages'),
        sortable: false,
        valueFormatter: (p: Player) => {
          return formatNumber('commas', p.totalVillages);
        },
      },
    ];

    const maxDate =
      dailyPlayerStats.length > 0
        ? dateUtils.date(dailyPlayerStats[0].createDate)
        : null;
    const minDate =
      dailyPlayerStats.length > 0
        ? dateUtils.date(
            dailyPlayerStats[dailyPlayerStats.length - 1].createDate
          )
        : null;

    if (maxDate && minDate && dateUtils.isBefore(minDate, maxDate)) {
      let diff = dateUtils.differenceInDays(maxDate, minDate) + 1;
      if (diff <= HOW_MANY_DAYS_BACK) {
        for (let i = 0; i < diff; i++) {
          const date = dateUtils.addDays(minDate, i);
          const formatted = dateUtils.format(
            date,
            DATE_FORMAT.DAY_MONTH_AND_YEAR
          );
          columns.push({
            field: formatted,
            label: formatted,
            sortable: false,
            valueFormatter: (p: Player) => {
              const record = p.dailyPlayerStatsRecords
                ? p.dailyPlayerStatsRecords.find(
                    r =>
                      dateUtils.date(r.createDate).getTime() === date.getTime()
                  )
                : undefined;
              return <ColouredNumber num={record ? record[mode] : 0} />;
            },
          });
        }
        columns.push({
          field: 'total',
          label: t('members.columns.total'),
          sortable: false,
          valueFormatter: (p: Player) => {
            return (
              <ColouredNumber
                num={
                  p.dailyPlayerStatsRecords
                    ? p.dailyPlayerStatsRecords.reduce(function (a, b) {
                        return a + b[mode];
                      }, 0)
                    : 0
                }
                bold
              />
            );
          },
        });
      }
    }

    return columns;
  }, [dailyPlayerStats, t, server, mode, dateUtils]);

  return (
    <Paper>
      <ModeSelector
        onSelect={m => setMode(m.name as Mode)}
        buttonProps={{ size: 'medium' }}
        modes={[
          {
            name: 'points',
            label: t('members.modes.points'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'villages',
            label: t('members.modes.villages'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'scoreAtt',
            label: t('members.modes.scoreAtt'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'scoreDef',
            label: t('members.modes.scoreDef'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'scoreSup',
            label: t('members.modes.scoreSup'),
            get selected() {
              return this.name === mode;
            },
          },
          {
            name: 'scoreTotal',
            label: t('members.modes.scoreTotal'),
            get selected() {
              return this.name === mode;
            },
          },
        ]}
      />
      <Table
        columns={columns}
        loading={loading}
        data={members}
        size="small"
        hideFooter
      />
    </Paper>
  );
}

export default Members;
