import { GenericDbResponse } from '../../../../DbTypes';
import { dbService } from '../../../../services/DbService';
import { requestWithTimeout } from '../../../../utils/timeout';

export const markTaskAsCompleted = (
  _source: any,
  { projectId, taskId }: { projectId: string; taskId: string }
) => {
  return requestWithTimeout<GenericDbResponse>(
    5000,
    dbService.markTaskAsCompleted(projectId, taskId).then(() => {
      return {
        ok: true,
        err: '',
      };
    })
  );
};
