import { GenericDbResponse } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';

export const changeProjectName = (
  _source: any,
  { projectId, newProjectName }: { projectId: string; newProjectName: string }
) => {
  return requestWithTimeout<GenericDbResponse>(
    5000,
    DbServiceSingleton.getInstance()
      .changeProjectName(projectId, newProjectName)
      .then(() => {
        return {
          ok: true,
          err: '',
        };
      })
  );
};
