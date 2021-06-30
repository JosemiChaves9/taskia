import { DbProject } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';

export const getAllUserProjects = (
  _source: any,
  { userId }: { userId: string }
) => {
  return requestWithTimeout<DbProject[]>(
    5000,
    DbServiceSingleton.getInstance().getAllUserProjects(userId)
  );
};
