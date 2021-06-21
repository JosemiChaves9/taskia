require('dotenv').config();
import { server } from './apolloServer/apolloServer';
import { DbService } from './services/DbService';

// TODO: implement logging

Promise.all([DbService.connect(), server]);
