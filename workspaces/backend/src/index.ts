import { server } from './apolloServer/apolloServer';
import { DbService } from './services/DbService';

Promise.all([DbService.connect(), server]);
