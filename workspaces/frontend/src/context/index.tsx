import { useLazyQuery } from '@apollo/client';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GET_ALL_USER_PROJECTS } from '../gql/getAllUserProjects';
import { GET_USER_BY_EMAIL } from '../gql/getUserByEmailQuery';
import { Project, User } from '../types';
import { AuthUser } from '../services/AuthUser';

export const userContext = React.createContext<any | null>({
  user: null,
  setUser: () => {},
  userProjects: null,
  activeProject: '',
  setActiveProject: () => {},
});

export const ContextProvider = ({ children }: any) => {
  const history = useHistory();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userProjects, setUserProjects] = useState<Project[] | undefined>();
  const [activeProject, setActiveProject] = useState<Project | undefined>();

  const [getUser, getUserResult] = useLazyQuery<
    { getUserByEmail: User } | undefined
  >(GET_USER_BY_EMAIL, {
    onCompleted: () => {
      setUser(getUserResult.data?.getUserByEmail);
    },
    onError: () => {
      history.push('/error');
    },
  });

  const [getUserProjects, getUserProjectsResult] = useLazyQuery<{
    getAllUserProjects: Project[] | undefined;
  }>(GET_ALL_USER_PROJECTS, {
    onCompleted: () => {
      setUserProjects(getUserProjectsResult.data?.getAllUserProjects);
    },
    onError: () => {
      history.push('/error');
    },
  });

  if (!AuthUser.checkIfUserIsInLocalStorage()) {
    history.push('/login');
  }

  useEffect(() => {
    if (!user && AuthUser.checkIfUserIsInLocalStorage()) {
      getUser({
        variables: {
          email: localStorage.getItem('userLogged'),
        },
      });
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
