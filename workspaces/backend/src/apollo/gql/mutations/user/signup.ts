import { SignupDbResponse } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { requestWithTimeout } from '../../../../utils/timeout';

export const signup = async (
  _source: any,
  { email, name }: { email: string; name: string }
) => {
  const user = await DbServiceSingleton.getInstance().getUserByEmail(email);

  if (user) {
    return {
      ok: false,
      err: 'User already exists',
    };
  }

  //! Check if share code already exists
  const shareCode = Math.floor(Math.random() * 99999);

  return requestWithTimeout<SignupDbResponse>(
    5000,
    DbServiceSingleton.getInstance()
      .newUser(email, name, shareCode)
      .then((userId) => {
        return {
          ok: true,
          err: '',
          newUserId: userId,
        };
      })
  );
};
