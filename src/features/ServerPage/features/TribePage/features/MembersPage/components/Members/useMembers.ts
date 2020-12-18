import { useRef, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { PLAYERS_AND_DAILY_PLAYER_STATS } from './queries';

import {
  PlayersAndDailyPlayerStatsQueryResult,
  PlayersAndDailyPlayerStatsQueryVariables,
} from './types';
import { subDays } from 'date-fns';

const useMembers = (
  tribeID: number,
  server: string,
  howManyDaysBack: number
) => {
  const createDateGTE = useRef(subDays(new Date(), howManyDaysBack));
  const { data: queryData, loading: queryLoading } = useQuery<
    PlayersAndDailyPlayerStatsQueryResult,
    PlayersAndDailyPlayerStatsQueryVariables
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
  const members = useMemo(() => {
    const members = queryData?.players?.items ?? [];
    const dailyPlayerStatsRecords = [
      ...(queryData?.dailyPlayerStats?.items ?? []),
    ].reverse();
    return members.map(p => {
      return {
        ...p,
        dailyPlayerStatsRecords: dailyPlayerStatsRecords.filter(
          record => record.player.id === p.id
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
