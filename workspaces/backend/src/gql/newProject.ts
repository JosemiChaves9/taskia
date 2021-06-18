import { DbService } from '../services/DbService';

export const newProject = (
  source: any,
  { projectName, userId }: { projectName: string; userId: string }
) => {
  try {
    return DbService.newProject(projectName, userId).then(() => {
      return {
        ok: true,
        err: '',
      };
    });
  } catch (error) {
    return {
      ok: false,
      err: error,
    };
  }
};
