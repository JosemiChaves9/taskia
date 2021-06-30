import React, { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { LocalStorageService } from '../services/LocalStorageService';
import { DbProject, DbUser } from '../types';

interface Context {
  user: DbUser | undefined;
  setUser: Dispatch<SetStateAction<DbUser | undefined>>;
  activeProject: DbProject | undefined;
  setActiveProject: Dispatch<SetStateAction<DbProject | undefined>>;
}

export const userContext = React.createContext<Context>({
  user: undefined,
  setUser: () => {},
  activeProject: undefined,
  setActiveProject: () => {},
});

export const ContextProvider: React.FC<{}> = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState<DbUser>();
  const [activeProject, setActiveProject] = useState<DbProject>();
  const { userLogin } = useUser();

  // TODO: this we can leave it here. But this should be the only place where we redirect to login
  if (!LocalStorageService.checkIfUserIsInLocalStorage()) {
    history.push('/login');
  } else {
    history.push('/');
  }

  useEffect(() => {
    if (!user && LocalStorageService.checkIfUserIsInLocalStorage()) {
      userLogin(LocalStorageService.getUserFromLocalStorage() as string);
    }
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        activeProject,
        setActiveProject,
      }}>
      {children}
    </userContext.Provider>
  );
};

export const UserProvider = () => React.useContext(userContext);
