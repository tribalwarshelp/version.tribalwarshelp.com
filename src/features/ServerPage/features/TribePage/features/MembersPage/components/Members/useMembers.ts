import { useRef, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { subDays } from 'date-fns';
import { PLAYERS_AND_DAILY_PLAYER_STATS } from './queries';

import { Player as _Player, DailyPlayerStatsRecord } from 'libs/graphql/types';
import {
  PlayersAndDailyPlayerStatsQueryResult,
  PlayersAndQueryDailyPlayerStatsArgs,
} from './types';

export type Player = _Player & { stats: DailyPlayerStatsRecord[] };

export type QueryResult = {
  members: Player[];
  dailyPlayerStats: DailyPlayerStatsRecord[];
  loading: boolean;
};

const useMembers = (
  tribeID: number,
  server: string,
  howManyDaysBack: number
): QueryResult => {
  const createDateGTE = useRef(subDays(new Date(), howManyDaysBack));
  const { data: queryData, loading: queryLoading } = useQuery<
    PlayersAndDailyPlayerStatsQueryResult,
    PlayersAndQueryDailyPlayerStatsArgs
  >(PLAYERS_AND_DAILY_PLAYER_STATS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      playersSort: ['rank ASC'],
      playerFilter: {
        tribeID: [tribeID],
      },
      dailyPlayerStatsFilter: {
        playerFilter: {
          tribeID: [tribeID],
        },
        createDateGT: createDateGTE.current,
      },
      dailyPlayerStatsSort: ['createDate DESC'],
      server,
    },
  });
  const members: Player[] = useMemo(() => {
    const members = queryData?.players?.items ?? [];
    const dailyPlayerStatsRecords = [
      ...(queryData?.dailyPlayerStats?.items ?? []),
    ].reverse();
    return members.map(p => {
      return {
        ...p,
        stats: dailyPlayerStatsRecords.filter(
          record => record.player?.id === p.id
        ),
      };
    });
  }, [queryData]);

  const loading = members.length === 0 && queryLoading;

  return {
    members,
    loading,
    dailyPlayerStats: queryData?.dailyPlayerStats?.items ?? [],
  };
};

export default useMembers;
