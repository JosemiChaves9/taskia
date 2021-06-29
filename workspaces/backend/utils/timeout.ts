export const requestWithTimeout = (msecs: number, promise: Promise<any>) => {
  const timeout = new Promise((res, rej) => {
    setTimeout(() => {
      rej('There was an error');
    }, msecs);
  });
  return Promise.race([promise, timeout]);
};
