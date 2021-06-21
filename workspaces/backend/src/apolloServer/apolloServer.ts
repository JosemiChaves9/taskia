import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { logger } from '../logger/logger';

export const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  logger.info(`🚀  Server ready at ${url}`);
});
