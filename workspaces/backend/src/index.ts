require('dotenv').config();

import { server } from './apollo/apolloServer';
import { logger } from './logger/logger';
import { DbServiceSingleton } from './services/DbServiceSingleton';

Promise.all([DbServiceSingleton.getInstance().connect(), server.listen()]).then(
  () => {
    logger.info('🚀 Database and Server started');
  },
  (err) => {
    throw new Error(err);
  }
);
