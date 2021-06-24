require('dotenv').config();

import { server } from './apollo/apolloServer';
// path path.join(__dirname, '../.env')
// node has some global variables for knowing current path (__dirname) https://nodejs.org/api/globals.html

//import { server } from './apollo/apolloServer';
import { logger } from './logger/logger';
import { dbService } from './services/DbService';

Promise.all([dbService.connect(), server.listen()]).then(() => {
  logger.info('🚀 Database and Server started');
});
