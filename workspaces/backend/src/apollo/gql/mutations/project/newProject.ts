import { GenericDbResponse } from '../../../../DbTypes';
import { dbService } from '../../../../services/DbService';
import { requestWithTimeout } from '../../../../utils/timeout';

export const newProject = (
  _source: any,
  { projectName, userId }: { projectName: string; userId: string }
) => {
  const shareCode = Math.floor(Math.random() * 99999);

  return requestWithTimeout<GenericDbResponse>(
    5000,
    dbService.newProject(projectName, userId, shareCode).then(() => {
      return {
        ok: true,
        err: '',
      };
    })
  );
};
