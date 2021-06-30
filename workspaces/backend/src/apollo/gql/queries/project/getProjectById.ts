import { DbProject } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';

export const getProjectById = (
  _source: any,
  { projectId }: { projectId: string }
) => {
  return requestWithTimeout<DbProject>(
    5000,
    DbServiceSingleton.getInstance().getProjectById(projectId)
  );
};
