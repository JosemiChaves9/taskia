import { GenericDbResponse } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';

export const newProject = (
  _source: any,
  { projectName, userId }: { projectName: string; userId: string }
) => {
  const shareCode = Math.floor(Math.random() * 99999);

  return requestWithTimeout<GenericDbResponse>(
    5000,
    DbServiceSingleton.getInstance()
      .newProject(projectName, userId, shareCode)
      .then(() => {
        return {
          ok: true,
          err: '',
        };
      })
  );
};
