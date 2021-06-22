import { logger } from '../../../../logger/logger';
import { DbService } from '../../../../services/DbService';

export const newTask = (
  _source: any,
  { taskName, projectId }: { taskName: string; projectId: string }
) => {
  logger.debug(`taskName: ${taskName}, projectId: ${projectId}`);
  return DbService.newTask(taskName, projectId).then(
    () => {
      return { ok: true, err: '' };
    },
    (rej) => {
      logger.error(rej);
      return {
        ok: false,
        err: 'Something went wrong while creating the task',
      };
    }
  );
};
