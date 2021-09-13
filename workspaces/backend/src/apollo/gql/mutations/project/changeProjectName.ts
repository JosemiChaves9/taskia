import { GenericDbResponse } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';
import { publishChangesInProject } from '../../subscriptions/changesInProject';

export const changeProjectName = (
  _source: any,
  { projectId, newProjectName }: { projectId: string; newProjectName: string }
) => {
  return requestWithTimeout<GenericDbResponse>(
    5000,
    DbServiceSingleton.getInstance()
      .changeProjectName(projectId, newProjectName)
      .then(() => {
        publishChangesInProject();
        return {
          ok: true,
          err: '',
        };
      })
  );
};
