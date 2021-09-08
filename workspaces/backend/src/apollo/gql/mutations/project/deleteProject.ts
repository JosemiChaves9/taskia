import { GenericDbResponse } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';

export const deleteProject = (
  _source: any,
  { projectId }: { projectId: string }
) => {
  return requestWithTimeout<GenericDbResponse>(
    5000,
    DbServiceSingleton.getInstance()
      .deleteProject(projectId)
      .then(() => {
        return {
          ok: true,
          err: '',
        };
      })
  );
};
