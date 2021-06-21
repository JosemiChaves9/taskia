import { DbService } from '../services/DbService';

export const markTaskAsCompleted = (
  _source: any,
  { projectId, taskId }: { projectId: string; taskId: string }
) => {
  return DbService.markTaskAsCompleted(projectId, taskId).then(
    (_res) => {
      return {
        ok: true,
        err: '',
      };
    },
    (_rej) => {
      return {
        ok: false,
        err: 'Something went wrong',
      };
    }
  );
};
