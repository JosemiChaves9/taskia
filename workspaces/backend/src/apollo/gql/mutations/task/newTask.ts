import { logger } from '../../../../logger/logger';
import { dbService } from '../../../../services/DbService';

export const newTask = (
  _source: any,
  { taskName, projectId }: { taskName: string; projectId: string }
) => {
  logger.debug(`taskName: ${taskName}, projectId: ${projectId}`);
  return dbService.newTask(taskName, projectId).then(
    () => {
      return { ok: true, err: '' };
    },
    (rej: PromiseRejectedResult) => {
      logger.error(rej);
      return {
        ok: false,
        err: 'Something went wrong while creating the task',
      };
    }
  );
};
