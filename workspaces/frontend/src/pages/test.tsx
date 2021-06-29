import { useEffect } from 'react';
import { useUser } from '../hooks/useUser';

export const Test = () => {
  const { userLogin } = useUser();

  const login = (email: string) => {
    userLogin(email);
  };

  return <h5 className='card-panel red lighten-2'>User already exists!</h5>;
};
