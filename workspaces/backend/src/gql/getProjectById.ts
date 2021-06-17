import { DbService } from '../services/DbService';

export const getProjectById = async (
  source: any,
  { projectId }: { email: string; projectId: string }
) => {
  return DbService.getProjectById(projectId).then((res) => res);
};
