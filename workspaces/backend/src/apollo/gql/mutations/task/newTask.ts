import { dbService } from '../../../../services/DbService';

export const newTask = (
  _source: any,
  { taskName, projectId }: { taskName: string; projectId: string }
) => {
  return dbService.newTask(taskName, projectId).then(() => {
    return { ok: true, err: '' };
  });
};
