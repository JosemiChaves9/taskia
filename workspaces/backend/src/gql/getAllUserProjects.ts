import { DbService } from '../services/DbService';

export const getAllUserProjects = async (
  source: any,
  { userId }: { userId: string }
) => {
  console.log(userId);
  return DbService.getAllUserProjects(userId as string).then((res) => res);
};
