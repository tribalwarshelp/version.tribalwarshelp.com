import { gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import buildVillageName from 'utils/buildVillageName';
import { QueryVillageArgs, Query } from 'libs/graphql/types';
import { Params, Village } from './types';

const QUERY = gql`
  query village($server: String!, $id: Int!) {
    village(server: $server, id: $id) {
      id
      name
      points
      x
      y
      bonus
      player {
        id
        name
        tribe {
          id
          tag
        }
      }
    }
  }
`;

export type QueryResult = {
  village?: Village;
  loading: boolean;
};

const useVillage = (): QueryResult => {
  const { key, id } = useParams<Params>();
  const { loading: loadingServers, data } = useQuery<
    Pick<Query, 'village'>,
    QueryVillageArgs
  >(QUERY, {
    fetchPolicy: 'cache-and-network',
    variables: {
      id: parseInt(id, 10),
      server: key,
    },
  });
  const village = data?.village ? data.village : undefined;
  const loading = loadingServers && !village;

  return {
    village: village
      ? {
          ...village,
          fullName: buildVillageName(village.name, village.x, village.y),
        }
      : undefined,
    loading,
  };
};

export default useVillage;
