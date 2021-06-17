import { DbService } from '../services/DbService';

export const getProject = async (
  source: any,
  { projectId }: { email: string; projectId: string }
) => {
  return DbService.getProject(projectId).then((res) => res);
};
