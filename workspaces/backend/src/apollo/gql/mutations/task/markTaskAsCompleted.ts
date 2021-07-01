import { GenericDbResponse } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';
import { publishChangesInTask } from '../../subscriptions/changesInTask';

export const markTaskAsCompleted = (
  _source: any,
  { projectId, taskId }: { projectId: string; taskId: string }
) => {
  return requestWithTimeout<GenericDbResponse>(
    5000,
    DbServiceSingleton.getInstance()
      .markTaskAsCompleted(projectId, taskId)
      .then(() => {
        publishChangesInTask();
        return {
          ok: true,
          err: '',
        };
      })
  );
};
