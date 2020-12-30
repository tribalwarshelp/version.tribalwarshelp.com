import { useState, useEffect } from 'react';
import { useApolloClient, DocumentNode } from '@apollo/client';
import {
  useQueryParams,
  NumericArrayParam,
  withDefault,
} from 'use-query-params';
import { PLAYERS, TRIBES } from './queries';
import {
  PlayersQueryVariables,
  TribesQueryVariables,
} from '@libs/graphql/types';
import { Player, Tribe, PlayerList, TribeList } from './types';

const getParamName = (
  type: 'player' | 'tribe',
  paramNamePrefix: string
): string => {
  return type === 'player'
    ? `${paramNamePrefix}Player`
    : `${paramNamePrefix}Tribe`;
};

export type Options = {
  paramNamePrefix: string;
};

interface HasID {
  id: number;
}

export type Bag = {
  players: Player[];
  tribes: Tribe[];
  loading: boolean;
  handleChangePlayers: (
    _e: React.ChangeEvent<{}>,
    players: Player[] | null
  ) => void;
  handleChangeTribes: (
    _e: React.ChangeEvent<{}>,
    tribes: Tribe[] | null
  ) => void;
};

const useSide = (server: string, opts: Options): Bag => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [tribes, setTribes] = useState<Tribe[]>([]);
  const paramNamePlayer = getParamName('player', opts.paramNamePrefix);
  const paramNameTribe = getParamName('tribe', opts.paramNamePrefix);
  const [query, setQuery] = useQueryParams({
    [paramNamePlayer]: withDefault(NumericArrayParam, []),
    [paramNameTribe]: withDefault(NumericArrayParam, []),
  });
  const [loading, setLoading] = useState<boolean>(
    query[paramNamePlayer].length > 0 || query[paramNameTribe].length > 0
  );
  const client = useApolloClient();

  useEffect(() => {
    const validPlayerIDs = query[paramNamePlayer].filter(
      val => val && val > 0
    ) as number[];
    const validTribeIDs = query[paramNameTribe].filter(
      val => val && val > 0
    ) as number[];
    const promises: Promise<void>[] = [];

    if (validPlayerIDs.length > 0) {
      promises.push(
        loadData(PLAYERS, {
          server,
          filter: { exists: true, id: validPlayerIDs },
        })
      );
    }
    if (validTribeIDs.length > 0) {
      promises.push(
        loadData(TRIBES, {
          server,
          filter: { exists: true, id: validTribeIDs },
        })
      );
    }
    Promise.all(promises).finally(() => {
      setLoading(false);
    }); // eslint-disable-next-line
  }, []);

  const loadData = (
    query: DocumentNode,
    variables: PlayersQueryVariables | TribesQueryVariables
  ) => {
    return client
      .query<
        PlayerList | TribeList,
        PlayersQueryVariables | TribesQueryVariables
      >({
        query,
        variables,
        fetchPolicy: 'network-only',
      })
      .then(res => {
        if ('players' in res.data && res.data.players) {
          setPlayers(res.data.players.items);
        }
        if ('tribes' in res.data && res.data.tribes) {
          setTribes(res.data.tribes.items);
        }
      });
  };

  const getIDs = (arr: HasID[]) => {
    return arr.map(({ id }) => id);
  };

  const updateQueryParams = (key: string, ids: number[]) => {
    setQuery({ [key]: ids });
  };

  const handleChangePlayers = (
    _e: React.ChangeEvent<{}>,
    players: Player[] | null
  ) => {
    const p = players ?? [];
    setPlayers(p);
    updateQueryParams(paramNamePlayer, getIDs(p));
  };

  const handleChangeTribes = (
    _e: React.ChangeEvent<{}>,
    tribes: Tribe[] | null
  ) => {
    const t = tribes ?? [];
    setTribes(t);
    updateQueryParams(paramNameTribe, getIDs(t));
  };

  return {
    players,
    tribes,
    loading,
    handleChangePlayers,
    handleChangeTribes,
  };
};

export default useSide;
