import { requestWithTimeout } from '../../../../utils/timeout';
import { DbUser } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { publishChangesInProject } from '../../subscriptions/changesInProject';

export const getUserByEmail = (_source: any, { email }: { email: string }) => {
  publishChangesInProject();
  return requestWithTimeout<DbUser>(
    5000,
    DbServiceSingleton.getInstance().getUserByEmail(email)
  );
};
