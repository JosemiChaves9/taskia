import { dbService } from '../../../../services/DbService';

export const getUserByEmail = (_source: any, { email }: { email: string }) => {
  const withTimeout = (msecs: number, promise: Promise<any>) => {
    const timeout = new Promise((res, rej) => {
      setTimeout(() => {
        rej('There was an error');
      }, msecs);
    });
    return Promise.race([promise, timeout]);
  };

  return withTimeout(5000, dbService.getUserByEmail(email));
};
