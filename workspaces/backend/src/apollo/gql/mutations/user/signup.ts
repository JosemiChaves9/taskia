import { GenericDbResponse } from '../../../../DbTypes';
import { dbService } from '../../../../services/DbService';
import { requestWithTimeout } from '../../../../utils/timeout';

export const signup = async (
  _source: any,
  { email, name }: { email: string; name: string }
) => {
  const user = await dbService.getUserByEmail(email);

  if (user) {
    return {
      ok: false,
      err: 'User already exists',
    };
  }
  const shareCode = Math.floor(Math.random() * 99999);

  return requestWithTimeout<GenericDbResponse>(
    5000,
    dbService.newUser(email, name, shareCode).then(() => {
      return {
        ok: true,
        err: '',
      };
    })
  );
};
