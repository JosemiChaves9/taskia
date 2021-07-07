import { DbFindAndModifyReponse, GenericDbResponse } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';
import { publishChangesInProject } from '../../subscriptions/changesInProject';
export const joinToExistingProject = (
  _source: any,
  { shareCode, userId }: { shareCode: number; userId: string }
) => {
  return requestWithTimeout<GenericDbResponse>(
    5000,
    DbServiceSingleton.getInstance()
      .joinToAnExistingProject(shareCode, userId)
      .then((res) => {
        if (res.value === null) {
          return {
            ok: false,
            err: "This project doesn't exist!",
          };
        } else {
          publishChangesInProject();
          return {
            ok: true,
            err: '',
          };
        }
      })
  );
};
