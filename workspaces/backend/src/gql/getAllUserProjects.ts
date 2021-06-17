import { DbService } from '../services/DbService';

export const getAllUserProjects = async (
  source: any,
  { userId }: { userId: string }
) => {
  return DbService.getAllUserProjects(userId as string).then((res) => {
    return res;
  });
};
