import { ApolloServer } from 'apollo-server';
import { typeDefs } from './gql/typeDefs';
import { resolvers } from './gql/resolvers';
import { DbService } from './services/dbService';

DbService.connect().then(() => {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
