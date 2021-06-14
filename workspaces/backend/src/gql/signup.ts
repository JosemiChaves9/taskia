import { DbService } from '../services/DbService';

export const signup = (
  source: any,
  { email, name }: { email: string; name: string }
) => {
  try {
    return DbService.newUser(email, name).then(() => ({
      ok: true,
      err: '',
    }));
  } catch (error) {
    return {
      ok: false,
      err: error,
    };
  }
};
