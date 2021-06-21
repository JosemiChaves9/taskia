import { DbService } from '../../../services/DbService';

export const getUserByEmail = (_source: any, { email }: { email: string }) => {
  return DbService.getUserByEmail(email);
};
