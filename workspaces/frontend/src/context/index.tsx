import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { GET_USER_BY_EMAIL } from '../gql/query/getUserByEmail';
import { LocalStorageService } from '../services/LocalStorageService';
import { DbUser } from '../types';

interface Context {
  user: DbUser | undefined;
  loginUser: (email: string) => void;
  logoutUser: () => void;
}

export const UserContext = createContext<Context>({
  user: undefined,
  loginUser: () => {},
  logoutUser: () => {},
});

export const ContextProvider: React.FC<{}> = ({ children }) => {
  const [user, setUser] = useState<DbUser>();

  const { data, loading, refetch, error } = useQuery<{
    getUserByEmail: DbUser;
  }>(GET_USER_BY_EMAIL, {
    variables: { email: LocalStorageService.getUserFromLocalStorage() },
  });

  useEffect(() => {
    if (data && !loading && !error) {
      setUser(data.getUserByEmail);
    }
  }, [data]);

  const loginUser = (email: string) => {
    LocalStorageService.setUserInLocalStorage(email);
    refetch();
  };

  const logoutUser = () => {
    LocalStorageService.removeUserFromLocalStorage();
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserProvider = () => React.useContext(UserContext);
