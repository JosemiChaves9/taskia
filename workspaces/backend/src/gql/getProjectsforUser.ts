import { DbService } from '../services/DbService';

export const getProjectForUser = async (
  source: any,
  { email }: { email: string }
) => {
  const userId = await DbService.getUserByEmail(email).then((res) => res?._id);
  return DbService.getProjectsForUser(userId as string).then((res) => res);
};
