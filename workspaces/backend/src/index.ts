require('dotenv').config();

import { server } from './apollo/apolloServer';
import { logger } from './logger/logger';
import { dbService } from './services/DbService';

Promise.all([dbService.connect(), server.listen()]).then(() => {
  logger.info('🚀 Database and Server started');
});
