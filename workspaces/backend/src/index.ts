require('dotenv').config();

import { ApolloError } from 'apollo-server-errors';
import { server } from './apollo/apolloServer';
import { logger } from './logger/logger';
import { DbServiceSingleton } from './services/DbServiceSingleton';

Promise.all([
  DbServiceSingleton.getInstance().connect(),
  server.listen({ port: process.env.PORT }),
]).then(
  (e) => {
    logger.info(`🚀 Database and Server started in ${e[1].url}`);
  },
  (err) => {
    throw new ApolloError(err);
  }
);
