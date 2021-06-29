import { DbProject } from '../../../../DbTypes';
import { dbService } from '../../../../services/DbService';
import { requestWithTimeout } from '../../../../utils/timeout';

export const getAllUserProjects = (
  _source: any,
  { userId }: { userId: string }
) => {
  return requestWithTimeout<DbProject[]>(
    5000,
    dbService.getAllUserProjects(userId)
  );
};
