import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useHistory } from 'react-router';
import { SIGNUP } from '../gql/mutation/signup';
import { GET_USER_BY_ID } from '../gql/query/getUserById';
import { LocalStorageService } from '../services/LocalStorageService';
import { DbUser } from '../types';

interface Context {
  user: DbUser | undefined;
  loginUser: (email: string) => void;
  logoutUser: () => void;
  signupUser: any; //? How to type this
}

export const UserContext = createContext<Context>({
  user: undefined,
  loginUser: () => {},
  logoutUser: () => {},
  signupUser: () => {},
});

export const ContextProvider: React.FC<{}> = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState<DbUser>();
  const [userSignup] = useMutation(SIGNUP);
  const { data, loading, refetch, error } = useQuery<{
    getUserById: DbUser;
  }>(GET_USER_BY_ID, {
    variables: { userId: LocalStorageService.getUserIdFromLocalStorage() },
  });

  useEffect(() => {
    if (data && !loading && !error) {
      setUser(data.getUserById);
    }
  }, [data, loading, error]);

  const loginUser = (userId: string) => {
    LocalStorageService.setUserIdInLocalStorage(userId);
    refetch();
  };

  const logoutUser = () => {
    LocalStorageService.removeProjectIdFromLocalStorage();
    LocalStorageService.removeUserIdFromLocalStorage();
    history.push('/login');
  };

  const signupUser = (email: string, name: string) => {
    return userSignup({
      variables: {
        email: email,
        name: name,
      },
    }).then((res) => res);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, signupUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserProvider = () => React.useContext(UserContext);
