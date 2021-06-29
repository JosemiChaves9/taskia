import { requestWithTimeout } from '../../../../utils/timeout';
import { DbUser } from '../../../../DbTypes';
import { dbService } from '../../../../services/DbService';

export const getUserByEmail = (_source: any, { email }: { email: string }) => {
  return requestWithTimeout<DbUser>(5000, dbService.getUserByEmail(email));
};
