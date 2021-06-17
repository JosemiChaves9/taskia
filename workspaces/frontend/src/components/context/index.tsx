import { useLazyQuery } from '@apollo/client';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { GET_USER_BY_EMAIL } from '../../gql/getUserByEmailQuery';
import { User } from '../../types';

export const userContext = React.createContext<any | null>({
  user: null,
  projects: null,
});

export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [getUser, { data, loading }] =
    useLazyQuery<{ getUserByEmail: User } | undefined>(GET_USER_BY_EMAIL);

  useEffect(() => {
    getUser({
      variables: {
        email: localStorage.getItem('userLogged'),
      },
    });

    setUser(data?.getUserByEmail);
  }, [data]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </userContext.Provider>
  );
};

export const UserProvider = () => React.useContext(userContext);
