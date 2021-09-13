import { GenericDbResponse } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';
import { publishChangesInProject } from '../../subscriptions/changesInProject';

export const deleteProject = (
  _source: any,
  { projectId }: { projectId: string }
) => {
  return requestWithTimeout<GenericDbResponse>(
    5000,
    DbServiceSingleton.getInstance()
      .deleteProject(projectId)
      .then(() => {
        publishChangesInProject();
        return {
          ok: true,
          err: '',
        };
      })
  );
};
