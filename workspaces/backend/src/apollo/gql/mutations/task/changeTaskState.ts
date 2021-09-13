import { GenericDbResponse } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';
import { publishChangesInTask } from '../../subscriptions/changesInTask';

export const changeTaskState = (
  _source: any,
  {
    projectId,
    taskId,
    taskCompleted,
  }: { projectId: string; taskId: string; taskCompleted: boolean }
) => {
  if (taskCompleted) {
    return requestWithTimeout<GenericDbResponse>(
      5000,
      DbServiceSingleton.getInstance()
        .markTaskAsUncompleted(projectId, taskId)
        .then(() => {
          publishChangesInTask();
          return {
            ok: true,
            err: '',
          };
        })
    );
  } else {
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
  }
};
