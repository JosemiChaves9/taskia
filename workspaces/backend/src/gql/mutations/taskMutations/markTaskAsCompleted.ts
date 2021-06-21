import { DbService } from '../../../services/DbService';

export const markTaskAsCompleted = (
  _source: any,
  { projectId, taskId }: { projectId: string; taskId: string }
) => {
  return DbService.markTaskAsCompleted(projectId, taskId).then(
    () => {
      return {
        ok: true,
        err: '',
      };
    },
    () => {
      return {
        ok: false,
        err: 'Something went wrong',
      };
    }
  );
};
