import { DbService } from '../services/DbService';

export const markTaskAsCompleted = (
  source: any,
  { projectId, taskId }: { projectId: string; taskId: string }
) => {
  return DbService.markTaskAsCompleted(projectId, taskId).then(
    (res) => {
      return {
        ok: true,
        err: '',
      };
    },
    (rej) => {
      return {
        ok: false,
        err: 'Something went wrong',
      };
    }
  );
};
