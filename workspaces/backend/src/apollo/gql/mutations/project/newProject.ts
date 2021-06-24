import { logger } from '../../../../logger/logger';
import { dbService } from '../../../../services/DbService';

export const newProject = (
  _source: any,
  { projectName, userId }: { projectName: string; userId: string }
) => {
  const shareCode = Math.floor(Math.random() * 99999);

  logger.debug(
    `projectName: ${projectName}, userId: ${userId}, shareCode: ${shareCode}`
  );
  return dbService.newProject(projectName, userId, shareCode).then(
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
        err: 'There was an error creating the project',
      };
    }
  );
};
