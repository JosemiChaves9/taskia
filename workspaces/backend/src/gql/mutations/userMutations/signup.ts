import { DbService } from '../../../services/DbService';

export const signup = async (
  _source: any,
  { email, name }: { email: string; name: string }
) => {
  const user = await DbService.getUserByEmail(email);
  if (user) {
    return {
      ok: false,
      err: 'User already exists',
    };
  }
  return DbService.newUser(email, name).then(
    () => {
      return {
        ok: true,
        err: '',
      };
    },
    () => {
      return {
        ok: false,
        err: "Could'nt create the new user",
      };
    }
  );
};
