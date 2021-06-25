import { logger } from '../../../../logger/logger';
import { dbService } from '../../../../services/DbService';

export const getProjectById = (
  _source: any,
  { projectId }: { projectId: string }
) => {
  return dbService.getProjectById(projectId);
};
