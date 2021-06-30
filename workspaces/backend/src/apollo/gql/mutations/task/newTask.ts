import { GenericDbResponse } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';

export const newTask = (
  _source: any,
  { taskName, projectId }: { taskName: string; projectId: string }
) => {
  return requestWithTimeout<GenericDbResponse>(
    5000,
    DbServiceSingleton.getInstance()
      .newTask(taskName, projectId)
      .then(() => {
        return { ok: true, err: '' };
      })
  );
};
