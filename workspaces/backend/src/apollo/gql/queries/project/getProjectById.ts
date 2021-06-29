import { DbProject } from '../../../../DbTypes';
import { dbService } from '../../../../services/DbService';
import { requestWithTimeout } from '../../../../utils/timeout';

export const getProjectById = (
  _source: any,
  { projectId }: { projectId: string }
) => {
  return requestWithTimeout<DbProject>(
    5000,
    dbService.getProjectById(projectId)
  );
};
