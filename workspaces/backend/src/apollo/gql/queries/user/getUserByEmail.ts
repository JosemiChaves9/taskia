import { dbService } from '../../../../services/DbService';

export const getUserByEmail = (_source: any, { email }: { email: string }) => {
  return dbService.getUserByEmail(email);
};
