import { DbService } from '../../../services/DbService';

export const newTask = (
  _source: any,
  { taskName, projectId }: { taskName: string; projectId: string }
) => {
  return DbService.newTask(taskName, projectId).then(
    () => {
      return { ok: true, err: '' };
    },
    () => {
      return {
        ok: false,
        err: 'Something went wrong while creating the task',
      };
    }
  );
};
