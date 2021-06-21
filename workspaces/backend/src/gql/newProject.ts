import { DbService } from '../services/DbService';

export const newProject = (
  _source: any,
  { projectName, userId }: { projectName: string; userId: string }
) => {
  const shareCode = Math.floor(Math.random() * 99999);

  try {
    return DbService.newProject(projectName, userId, shareCode).then(() => {
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
