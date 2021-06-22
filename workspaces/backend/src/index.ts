require('dotenv').config({
  path: '/home/josemichaves/git/taskia/workspaces/backend/src/.env',
});
import { server } from './apollo/apolloServer';
import { DbService } from './services/DbService';

Promise.all([DbService.connect(), server]);
