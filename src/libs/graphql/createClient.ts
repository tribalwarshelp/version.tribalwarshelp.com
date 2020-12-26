import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

const createClient = (uri: string): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri: uri,
    cache: new InMemoryCache({
      typePolicies: {
        FoundPlayer: {
          keyFields: ['server', 'id'],
        },
        FoundTribe: {
          keyFields: ['server', 'id'],
        },
      },
    }),
  });
};

export default createClient;
