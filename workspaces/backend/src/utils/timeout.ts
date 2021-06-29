export const requestWithTimeout = <T>(
  msecs: number,
  promise: Promise<T>
): Promise<T> => {
  const timeout = new Promise((res, rej) => {
    setTimeout(() => {
      rej('There was an error');
    }, msecs);
  });
  return Promise.race([promise, timeout]) as Promise<T>;
};
