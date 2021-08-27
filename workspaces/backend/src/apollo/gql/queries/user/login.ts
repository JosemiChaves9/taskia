import { requestWithTimeout } from '../../../../utils/timeout';
import { DbUser, GenericDbResponse } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';

export const userLogin = (
  _source: any,
  { email, password }: { email: string; password: string }
) => {
  return requestWithTimeout<DbUser | GenericDbResponse>(
    5000,
    DbServiceSingleton.getInstance()
      .loginUser(email, password)
      .then((res) => {
        console.log(res);
        return res;
      })
  );
};
