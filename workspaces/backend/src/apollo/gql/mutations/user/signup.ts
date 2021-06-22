import { logger } from '../../../../logger/logger';
import { DbService } from '../../../../services/DbService';

export const signup = async (
  _source: any,
  { email, name }: { email: string; name: string }
) => {
  logger.debug(`email: ${email}, name:${name}`);

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
    (rej) => {
      logger.warn(rej);
      return {
        ok: false,
        err: "Could'nt create the new user",
      };
    }
  );
};
