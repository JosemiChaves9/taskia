import { useLazyQuery } from '@apollo/client';
import React, { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GET_ALL_USER_PROJECTS } from '../gql/query/getAllUserProjects';
import { useUser } from '../hooks/useUser';
import { AuthUser } from '../services/AuthUser';
import { DbProject, DbUser } from '../types';

interface Context {
  user: DbUser | undefined;
  setUser: Dispatch<SetStateAction<DbUser | undefined>>;
  userProjects: DbProject[] | undefined;
  setUserProjects: Dispatch<SetStateAction<DbProject[] | undefined>>;
  activeProject: DbProject | undefined;
  setActiveProject: Dispatch<SetStateAction<DbProject | undefined>>;
}

export const userContext = React.createContext<Context>({
  user: undefined,
  setUser: () => {},
  userProjects: undefined,
  setUserProjects: () => {},
  activeProject: undefined,
  setActiveProject: () => {},
});

export const ContextProvider: React.FC<{}> = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState<DbUser>();
  const [userProjects, setUserProjects] = useState<DbProject[]>();
  const [activeProject, setActiveProject] = useState<DbProject>();
  const { userLogin } = useUser();

  if (!AuthUser.checkIfUserIsInLocalStorage()) {
    history.push('/login');
  } else {
    history.push('/');
  }

  const [getUserProjects] = useLazyQuery<{
    getAllUserProjects: DbProject[] | undefined;
  }>(GET_ALL_USER_PROJECTS, {
    onCompleted: (res) => {
      if (!res.getAllUserProjects) {
        localStorage.removeItem('userLogged');
        history.push('/login');
        return;
      }
      setUserProjects(res.getAllUserProjects);
    },
    onError: () => {
      history.push('/error');
    },
  });

  useEffect(() => {
    if (!user && AuthUser.checkIfUserIsInLocalStorage()) {
      userLogin(localStorage.getItem('userLogged') as string);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getUserProjects({
        variables: {
          userId: user._id,
        },
      });
    }
  }, [user]);

  useEffect(() => {
    if (userProjects) {
      setActiveProject(userProjects[0]);
    }
  }, [userProjects]);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        userProjects,
        setUserProjects,
        activeProject,
        setActiveProject,
      }}>
      {children}
    </userContext.Provider>
  );
};

export const UserProvider = () => React.useContext(userContext);
