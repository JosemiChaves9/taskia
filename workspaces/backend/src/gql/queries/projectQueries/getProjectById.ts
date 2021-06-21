import { logger } from '../../../logger/logger';
import { DbService } from '../../../services/DbService';

export const getProjectById = async (
  _source: any,
  { projectId }: { projectId: string }
) => {
  logger.debug(`projectId: ${projectId}`);
  return DbService.getProjectById(projectId);
};
