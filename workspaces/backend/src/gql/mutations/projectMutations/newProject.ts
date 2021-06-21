import { DbService } from '../../../services/DbService';

export const newProject = (
  _source: any,
  { projectName, userId }: { projectName: string; userId: string }
) => {
  const shareCode = Math.floor(Math.random() * 99999);

  return DbService.newProject(projectName, userId, shareCode).then(
    () => {
      return {
        ok: true,
        err: '',
      };
    },
    () => {
      return {
        ok: false,
        err: 'There was an error creating the project',
      };
    }
  );
};
