import { useContext, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DbUser } from '../types';
import { GET_USER_BY_EMAIL } from '../gql/query/getUserByEmail';
import { userContext } from '../context';
import { useHistory } from 'react-router-dom';
import { SIGNUP } from '../gql/mutation/signup';
import { LocalStorageService } from '../services/LocalStorageService';

export const useUser = () => {
  const history = useHistory();
  const { setUser } = useContext(userContext);
  const [error, setError] = useState<string | null>(null);

  const [login] = useLazyQuery<{ getUserByEmail: DbUser }>(GET_USER_BY_EMAIL, {
    onCompleted: (res) => {
      console.log(res);
      if (!res?.getUserByEmail) {
        LocalStorageService.removeUserFromLocalStorage();
        history.push('/login');
        return;
      } else {
        if (!res.getUserByEmail) {
          setError("User doesn't exists");
          return;
        } else {
          setUser(res.getUserByEmail);
          LocalStorageService.setUserInLocalStorage(res.getUserByEmail.email);
          history.push('/');
        }
      }
    },
    onError: () => {
      history.push('/error');
    },
  });

  const [signup] = useMutation(SIGNUP);

  const userLogin = (email: string) => {
    setError(null);
    login({
      variables: {
        email: email,
      },
    });
  };

  const userSignup = (email: string, name: string) => {
    setError(null);
    signup({
      variables: {
        email: email,
        name: name,
      },
    }).then(
      (res) => {
        console.log(res);
        if (res.data.signup.ok) {
          localStorage.setItem('userLogged', email);
        } else {
          setError(res.data.signup.err);
        }
      },
      () => {
        setError('There was an error');
      }
    );
  };

  const userLogout = () => {
    localStorage.removeItem('userLogged');
    history.push('/login');
  };

  return { userLogin, error, userSignup, userLogout };
};
