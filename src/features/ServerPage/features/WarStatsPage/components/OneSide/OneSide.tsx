import React, { useState, useEffect } from 'react';
import { isNil } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useApolloClient } from '@apollo/client';
import { useDebouncedCallback } from 'use-debounce';
import { SERVER_PAGE } from '@config/namespaces';
import { PLAYERS, TRIBES } from '../../queries';

import { Typography, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  PlayersQueryVariables,
  TribesQueryVariables,
} from '@libs/graphql/types';
import { Player, Tribe, PlayerList, TribeList } from '../../types';

interface HasID {
  id: number;
}

export interface Props {
  title: string;
  players: Player[];
  tribes: Tribe[];
  onChangePlayers: (
    _e: React.ChangeEvent<{}>,
    players: Player[] | null
  ) => void;
  onChangeTribes: (_e: React.ChangeEvent<{}>, tribes: Tribe[] | null) => void;
  server: string;
  playerIDNEQ: number[];
  tribeIDNEQ: number[];
  className?: string;
}

function OneSide({
  title,
  players,
  tribes,
  onChangePlayers,
  onChangeTribes,
  server,
  tribeIDNEQ,
  playerIDNEQ,
  className,
}: Props) {
  const client = useApolloClient();
  const { t } = useTranslation(SERVER_PAGE.WAR_STATS_PAGE);
  const [loading, setLoading] = useState<boolean>(false);
  const [playerSuggestions, setPlayerSuggsetions] = useState<Player[]>([]);
  const [tribeSuggestions, setTribeSuggsetions] = useState<Tribe[]>([]);

  useEffect(() => {
    searchPlayers('');
    searchTribes(''); // eslint-disable-next-line
  }, []);

  const isArray = <T,>(arr: any): arr is T[] => {
    return Array.isArray(arr);
  };

  const handleChangePlayers = (
    e: React.ChangeEvent<{}>,
    players: Player | Player[] | null
  ) => {
    const p = isArray<Player>(players)
      ? players
      : isNil(players)
      ? players
      : [players];
    onChangePlayers(e, p);
  };

  const handleChangeTribes = (
    e: React.ChangeEvent<{}>,
    tribes: Tribe | Tribe[] | null
  ) => {
    const t = isArray<Tribe>(tribes)
      ? tribes
      : isNil(tribes)
      ? tribes
      : [tribes];
    onChangeTribes(e, t);
  };

  const searchPlayers = async (searchValue: string): Promise<void> => {
    let players: Player[] = [];
    setLoading(true);
    try {
      const { data } = await client.query<PlayerList, PlayersQueryVariables>({
        query: PLAYERS,
        variables: {
          limit: 10,
          filter: {
            exists: true,
            nameIEQ: searchValue + '%',
            idNEQ: playerIDNEQ,
          },
          server,
          offset: 0,
          sort: ['points DESC'],
        },
        fetchPolicy: 'network-only',
      });
      players = data.players?.items ?? [];
    } catch (error) {}
    setPlayerSuggsetions(players);
    setLoading(false);
  };
  const debouncedSearchPlayers = useDebouncedCallback(searchPlayers, 500, {
    maxWait: 1000,
  });

  const searchTribes = async (searchValue: string): Promise<void> => {
    let tribes: Tribe[] = [];
    setLoading(true);
    try {
      const { data } = await client.query<TribeList, TribesQueryVariables>({
        query: TRIBES,
        variables: {
          limit: 10,
          filter: {
            exists: true,
            tagIEQ: searchValue + '%',
            idNEQ: tribeIDNEQ,
          },
          server,
          offset: 0,
          sort: ['points DESC'],
        },
        fetchPolicy: 'network-only',
      });
      tribes = data.tribes?.items ?? [];
    } catch (error) {}
    setTribeSuggsetions(tribes);
    setLoading(false);
  };
  const debouncedSearchTribes = useDebouncedCallback(searchTribes, 500, {
    maxWait: 1000,
  });

  const getOptionSelected = (v1: HasID, v2: HasID) => {
    return v1 && v2 ? v1.id === v2.id : false;
  };

  const isDisabled = (id: number, blacklist: number[]) => {
    return blacklist.some(id2 => id === id2);
  };

  const autocompleteProps = {
    limitTags: 1,
    multiple: true,
    loadingText: t('loading'),
    noOptionsText: t('noOptions'),
    getOptionSelected,
    loading,
  };
  return (
    <div className={className}>
      <Typography variant="h4" align="center" gutterBottom>
        {title}
      </Typography>
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          {t('oneSide.players')}
        </Typography>
        <Autocomplete
          {...autocompleteProps}
          value={players}
          options={[...playerSuggestions, ...players]}
          getOptionLabel={opt => {
            return opt ? opt.name : '';
          }}
          getOptionDisabled={opt => isDisabled(opt.id, playerIDNEQ)}
          onChange={handleChangePlayers}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              onChange={e => {
                debouncedSearchPlayers.callback(e.target.value);
              }}
            />
          )}
        />
      </div>
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          {t('oneSide.tribes')}
        </Typography>
        <Autocomplete
          {...autocompleteProps}
          value={tribes}
          options={[...tribeSuggestions, ...tribes]}
          getOptionDisabled={opt => isDisabled(opt.id, tribeIDNEQ)}
          getOptionLabel={opt => {
            return opt ? opt.tag : '';
          }}
          onChange={handleChangeTribes}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              onChange={e => {
                debouncedSearchTribes.callback(e.target.value);
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

export default OneSide;
