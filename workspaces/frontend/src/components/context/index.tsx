import { useLazyQuery } from '@apollo/client';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { GET_ALL_USER_PROJECTS } from '../../gql/getAllUserProjects';
import { GET_USER_BY_EMAIL } from '../../gql/getUserByEmailQuery';
import { Project, User } from '../../types';

export const userContext = React.createContext<any | null>({
  user: null,
  setUser: () => {},
  userProjects: null,
  activeProject: '',
  setActiveProject: () => {},
});

// TODO: ensure all request have an error handler and shows an error to the user.
// TODO: move context component out

export const ContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userProjects, setUserProjects] = useState<Project[] | undefined>();
  const [activeProject, setActiveProject] = useState<Project | undefined>();

  const [getUser, getUserResult] = useLazyQuery<
    { getUserByEmail: User } | undefined
  >(GET_USER_BY_EMAIL, {
    onCompleted: () => setUser(getUserResult.data?.getUserByEmail),
  });

  const [getUserProjects, getUserProjectsResult] = useLazyQuery<{
    getAllUserProjects: Project[] | undefined;
  }>(GET_ALL_USER_PROJECTS, {
    onCompleted: () => {
      setUserProjects(getUserProjectsResult.data?.getAllUserProjects);
    },
  });
  const userLogged = localStorage.getItem('userLogged');

  useEffect(() => {
    if (!user && userLogged) {
      getUser({
        variables: {
          email: userLogged,
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
