import { logger } from '../../../../logger/logger';
import { dbService } from '../../../../services/DbService';

export const getAllUserProjects = (
  _source: any,
  { userId }: { userId: string }
) => {
  logger.debug(`userId: ${userId}`);
  return dbService.getAllUserProjects(userId);
};
