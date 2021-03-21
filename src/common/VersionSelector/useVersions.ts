import { useQuery } from '@apollo/client';
import { VERSIONS } from './queries';
import {
  QueryVersionsArgs,
  VersionCode,
  Query,
  Version,
} from 'libs/graphql/types';

export type QueryResult = {
  versions: Version[];
  loading: boolean;
};

const useVersions = (versionCode: string): QueryResult => {
  const { data, loading } = useQuery<
    Pick<Query, 'versions'>,
    QueryVersionsArgs
  >(VERSIONS, {
    fetchPolicy: 'cache-first',
    variables: {
      sort: ['host ASC'],
      filter: {
        codeNEQ: [versionCode as VersionCode],
      },
    },
  });
  return {
    versions: data?.versions?.items ?? [],
    loading,
  };
};

export default useVersions;
