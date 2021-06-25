import { dbService } from '../../../../services/DbService';

export const newProject = (
  _source: any,
  { projectName, userId }: { projectName: string; userId: string }
) => {
  const shareCode = Math.floor(Math.random() * 99999);

  return dbService.newProject(projectName, userId, shareCode).then(() => {
    return {
      ok: true,
      err: '',
    };
  });
};
