import { dbService } from '../../../../services/DbService';

export const markTaskAsCompleted = (
  _source: any,
  { projectId, taskId }: { projectId: string; taskId: string }
) => {
  return dbService.markTaskAsCompleted(projectId, taskId).then(() => {
    return {
      ok: true,
      err: '',
    };
  });
};
