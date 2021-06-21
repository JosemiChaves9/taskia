import { DbService } from '../services/DbService';

export const newTask = (
  _source: any,
  { taskName, projectId }: { taskName: string; projectId: string }
) => {
  try {
    return DbService.newTask(taskName, projectId).then(() => ({
      ok: true,
      err: '',
    }));
  } catch (error) {
    return { ok: false, err: error };
  }
};
