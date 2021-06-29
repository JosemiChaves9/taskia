import { GenericDbResponse } from '../../../../DbTypes';
import { dbService } from '../../../../services/DbService';
import { requestWithTimeout } from '../../../../utils/timeout';

export const newTask = (
  _source: any,
  { taskName, projectId }: { taskName: string; projectId: string }
) => {
  return requestWithTimeout<GenericDbResponse>(
    5000,
    dbService.newTask(taskName, projectId).then(() => {
      return { ok: true, err: '' };
    })
  );
};
