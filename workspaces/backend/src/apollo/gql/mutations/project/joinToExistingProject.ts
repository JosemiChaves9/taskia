import { logger } from '../../../../logger/logger';
import { dbService } from '../../../../services/DbService';

export const joinToExistingProject = (
  _source: any,
  { shareCode, userId }: { shareCode: number; userId: string }
) => {
  logger.debug(`shareCode: ${shareCode}, userId: ${userId}`);
  return dbService.joinToAnExistingProject(shareCode, userId).then(
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
        err: 'There was an error joining to the project',
      };
    }
  );
};
