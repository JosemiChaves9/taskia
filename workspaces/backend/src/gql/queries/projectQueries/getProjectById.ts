import { DbService } from '../../../services/DbService';

export const getProjectById = async (
  _source: any,
  { projectId }: { projectId: string }
) => {
  return DbService.getProjectById(projectId);
};
