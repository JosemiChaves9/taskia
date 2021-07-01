import { requestWithTimeout } from '../../../../utils/timeout';
import { DbUser } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';

export const getUserByEmail = (_source: any, { email }: { email: string }) => {
  return requestWithTimeout<DbUser>(
    5000,
    DbServiceSingleton.getInstance().getUserByEmail(email)
  );
};
