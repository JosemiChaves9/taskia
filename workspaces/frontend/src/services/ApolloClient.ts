import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { EnviromentVariables } from './EnviromentVariablesService';

const wsLink = new WebSocketLink({
  uri: EnviromentVariables.getUriForWsServer(),
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({
  uri: EnviromentVariables.getUriForHttpServer(),
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
