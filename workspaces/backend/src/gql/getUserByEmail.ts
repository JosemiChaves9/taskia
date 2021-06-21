import { DbService } from '../services/DbService';

export const getUserByEmail = (_source: any, { email }: { email: string }) => {
  try {
    return DbService.getUserByEmail(email);
  } catch (error) {
    return { ok: false, err: '' };
  }
};
