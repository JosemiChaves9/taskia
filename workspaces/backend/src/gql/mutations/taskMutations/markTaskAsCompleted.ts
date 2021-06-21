import { logger } from '../../../logger/logger';
import { DbService } from '../../../services/DbService';

export const markTaskAsCompleted = (
  _source: any,
  { projectId, taskId }: { projectId: string; taskId: string }
) => {
  logger.debug(`projectId: ${projectId}, taskId: ${taskId}`);
  return DbService.markTaskAsCompleted(projectId, taskId).then(
    () => {
      return {
        ok: true,
        err: '',
      };
    },
    (rej) => {
      logger.warn(rej);
      return {
        ok: false,
        err: 'Something went wrong',
      };
    }
  );
};
