import { DbService } from '../services/DbService';

export const getProject = async (
  source: any,
  { email, projectId }: { email: string; projectId: string }
) => {
  const user = await DbService.getUserByEmail(email);
  return DbService.getProject(user?._id as string, projectId).then(
    (res) => res
  );
};
