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

  const createNewUser = async () => {
    const generateShareCode = () => Math.floor(Math.random() * 99999);

    const shareCode = generateShareCode();

    const checkIfShareCodeExists =
      await DbServiceSingleton.getInstance().getProjectByShareCode(shareCode);

    if (!checkIfShareCodeExists) {
      return DbServiceSingleton.getInstance()
        .newUser(email, name, shareCode)
        .then((userId) => {
          return {
            ok: true,
            err: '',
            newUserId: userId,
          };
        });
    } else {
      createNewUser();
    }
  };
  return createNewUser();
};
