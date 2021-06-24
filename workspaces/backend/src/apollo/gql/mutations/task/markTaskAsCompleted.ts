import { logger } from '../../../../logger/logger';
import { dbService } from '../../../../services/DbService';

export const markTaskAsCompleted = (
  _source: any,
  { projectId, taskId }: { projectId: string; taskId: string }
) => {
  logger.debug(`projectId: ${projectId}, taskId: ${taskId}`);
  return dbService.markTaskAsCompleted(projectId, taskId).then(
    () => {
      return {
        ok: true,
        err: '',
      };
    },
    (rej: PromiseRejectedResult) => {
      logger.error(rej);
      return {
        ok: false,
        err: 'Something went wrong',
      };
    }
  );
};
