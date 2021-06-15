import { DbService } from '../services/DbService';

export const signup = async (
  source: any,
  { email, name }: { email: string; name: string }
) => {
  const userExists = await DbService.getUserByEmail(email).then((res) => res);
  if (userExists) {
    return {
      ok: false,
      err: 'User already exists',
    };
  }

  return DbService.newUser(email, name).then(
    (_res) => ({
      ok: true,
      err: '',
    }),
    (rej) => {
      return {
        ok: false,
        err: rej,
      };
    }
  );
};
