import { DbService } from '../services/DbService';

export const signup = async (
  source: any,
  { email, name }: { email: string; name: string }
) => {
  //If error, connection with DB (throw new error), if there's no user return the result.

  //Change nodemon,and change method to debug
  debugger;
  const userExists = await DbService.getUserByEmail(email).then(
    (res) => {
      debugger;
      return res;
    },
    (rej) => {
      debugger;
      throw new Error(rej);
    }
  );

  if (userExists) {
    return {
      ok: false,
      err: 'User already exists',
    };
  }

  return DbService.newUser(email, name).then(
    (_res) => {
      return {
        ok: true,
        err: '',
      };
    },
    (rej) => {
      return {
        ok: false,
        err: rej,
      };
    }
  );
};
