import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { GET_USER_BY_EMAIL } from '../gql/query/getUserByEmail';
import { GET_USER_BY_ID } from '../gql/query/getUserById';
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
    getUserById: DbUser;
  }>(GET_USER_BY_ID, {
    variables: { userId: LocalStorageService.getUserIdFromLocalStorage() },
  });

  useEffect(() => {
    if (data && !loading && !error) {
      setUser(data.getUserById);
    }
  }, [data]);

  const loginUser = (userId: string) => {
    LocalStorageService.setUserIdInLocalStorage(userId);
    refetch();
  };

  const logoutUser = () => {
    LocalStorageService.removeUserIdFromLocalStorage();
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserProvider = () => React.useContext(UserContext);
