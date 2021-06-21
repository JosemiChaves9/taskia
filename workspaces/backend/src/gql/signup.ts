import { DbService } from '../services/DbService';

export const signup = async (
  _source: any,
  { email, name }: { email: string; name: string }
) => {
  //If error, connection with DB (throw new error), if there's no user return the result.

  //Change nodemon,and change method to debug
  debugger;
  // TODO: check naming of userExists
  // TODO: remove debug code
  const userExists = await DbService.getUserByEmail(email).then(
    (res) => {
      debugger;
      return res; // TODO: not needed
    },
    (rej) => {
      debugger;
      throw new Error(rej); // TODO: not needed I think
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
