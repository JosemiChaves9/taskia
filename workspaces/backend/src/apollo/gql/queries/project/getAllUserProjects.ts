import { DbProject } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';

export const getAllUserProjects = (
  _source: any,
  { userId }: { userId: string }
) => {
  return requestWithTimeout<DbProject[]>(
    5000,
    DbServiceSingleton.getInstance().getAllUserProjects(userId)
  ).then((res) => {
    res.forEach((project) => {
      if (project.tasks) {
        project.tasks.sort((a) => {
          if (a.completed) {
            return 1;
          } else {
            return -1;
          }
        });
      }
    });
    return res;
  });
};
