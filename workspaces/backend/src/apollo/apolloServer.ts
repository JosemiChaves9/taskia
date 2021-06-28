import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { handleErrorsPlugin } from './gql/plugins/handleErrorsPlugin';
import { debugPlugin } from './gql/plugins/debugPlugin';

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [handleErrorsPlugin, debugPlugin],
});
