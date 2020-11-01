import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

const createClient = (uri: string): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    uri: uri,
    cache: new InMemoryCache(),
  });
};

export default createClient;
