import { logger } from '../../../../logger/logger';
import { dbService } from '../../../../services/DbService';

export const signup = async (
  _source: any,
  { email, name }: { email: string; name: string }
) => {
  logger.debug(`email: ${email}, name:${name}`);

  const user = await dbService.getUserByEmail(email);

  if (user) {
    return {
      ok: false,
      err: 'User already exists',
    };
  }
  const shareCode = Math.floor(Math.random() * 99999);

  return dbService.newUser(email, name, shareCode).then(
    () => {
      return {
        ok: true,
        err: '',
      };
    },
    (rej: PromiseRejectedResult) => {
      logger.error(rej);
      return {
        ok: false,
        err: "Couldn't create the new user",
      };
    }
  );
};
