import { requestWithTimeout } from '../../../../../utils/timeout';
import { dbService } from '../../../../services/DbService';

export const getUserByEmail = (_source: any, { email }: { email: string }) => {
  return requestWithTimeout(5000, dbService.getUserByEmail(email));
};
