import { useLazyQuery } from '@apollo/client';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { GET_USER } from '../../gql/userQuery';
import { User } from '../../types';

export const userContext = React.createContext<any | null>({
  user: null,
  projects: null,
});

export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [getUser, { data, loading }] =
    useLazyQuery<{ getUser: User } | undefined>(GET_USER);

  useEffect(() => {
    getUser({
      variables: {
        email: localStorage.getItem('userLogged'),
      },
    });

    if (!loading) {
      setUser(data?.getUser);
    }
  }, [loading]);

  return (
    <userContext.Provider
      value={{
        user,
      }}>
      {children}
    </userContext.Provider>
  );
};

export const UserProvider = () => React.useContext(userContext);
