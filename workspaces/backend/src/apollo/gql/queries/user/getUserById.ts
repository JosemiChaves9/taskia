import { DbUser } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';

export const getUserById = (_source: any, { userId }: { userId: string }) => {
  return requestWithTimeout<DbUser>(
    5000,
    DbServiceSingleton.getInstance().getUserById(userId)
  );
};
