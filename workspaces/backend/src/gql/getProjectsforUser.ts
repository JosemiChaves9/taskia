import { DbService } from '../services/DbService';

export const getAllProjectForUser = async (
  source: any,
  { userId }: { userId: string }
) => {
  return DbService.getAllProjectsForUser(userId as string).then((res) => res);
};
