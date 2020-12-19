import { useQuery } from '@apollo/client';
import { VERSIONS } from './queries';
import { VersionsQueryVariables } from '@libs/graphql/types';
import { VersionList, Version } from './types';

export type QueryResult = {
  versions: Version[];
  loading: boolean;
};

const useVersions = (versionCode: string): QueryResult => {
  const { data, loading } = useQuery<VersionList, VersionsQueryVariables>(
    VERSIONS,
    {
      fetchPolicy: 'cache-first',
      variables: {
        sort: ['code ASC'],
        filter: {
          codeNEQ: [versionCode],
        },
      },
    }
  );
  return {
    versions: data?.versions?.items ?? [],
    loading,
  };
};

export default useVersions;
