import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';

export const getUserById = (_source: any, { userId }: { userId: string }) => {
  return DbServiceSingleton.getInstance().getUserById(userId);
};
