require('dotenv').config();
import { logger } from './logger/logger';
import { server } from './apolloServer/apolloServer';
import { DbService } from './services/DbService';

// TODO: implement logging

console.log(process.env.DB_NAME);
Promise.all([DbService.connect(), server]);
