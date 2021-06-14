import { DbService } from '../services/DbService';

export const getUser = (source: any, { email }: { email: string }) => {
  try {
    return DbService.getUserByEmail(email);
  } catch (error) {
    return { ok: false, err: '' };
  }
};
