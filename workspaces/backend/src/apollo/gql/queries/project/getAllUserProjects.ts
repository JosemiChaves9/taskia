import { dbService } from '../../../../services/DbService';

export const getAllUserProjects = (
  _source: any,
  { userId }: { userId: string }
) => {
  return dbService.getAllUserProjects(userId);
};
