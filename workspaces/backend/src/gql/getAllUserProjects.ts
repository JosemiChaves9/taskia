import { DbService } from '../services/DbService';

export const getAllUserProjects = async (
  _source: any,
  { userId }: { userId: string }
) => {
  return DbService.getAllUserProjects(userId as string).then((res) => res);
};
