import { useContext, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DbUser } from '../types';
import { GET_USER_BY_EMAIL } from '../gql/query/getUserByEmail';
import { userContext } from '../context';
import { useHistory } from 'react-router-dom';
import { SIGNUP } from '../gql/mutation/signup';
import { useEffect } from 'react';
import { LocalStorageService } from '../services/LocalStorageService';
import { debug } from 'console';

export const useUser = () => {
  const history = useHistory();
  const { setUser } = useContext(userContext);
  const [customError, setCustomError] = useState<string | null>(null);

  const [login, { data, loading, error }] = useLazyQuery<{
    getUserByEmail: DbUser;
  }>(GET_USER_BY_EMAIL, {
    onError: () => {
      history.push('/error');
    },
  });

  const [signup] = useMutation(SIGNUP);

  const userLogin = (email: string) => {
    setCustomError(null);
    login({
      variables: {
        email: email,
      },
    });
  };

  useEffect(() => {
    if (data && !loading && !error) {
      debugger;
      LocalStorageService.setUserInLocalStorage(data.getUserByEmail.email);
      setUser(data.getUserByEmail);
    }
  }, [data]);

  const userSignup = (email: string, name: string) => {
    setCustomError(null);
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
          setCustomError(res.data.signup.err);
        }
      },
      () => {
        setCustomError('There was an error');
      }
    );
  };

  const userLogout = () => {
    localStorage.removeItem('userLogged');
    history.push('/login');
  };

  return { userLogin, customError, userSignup, userLogout };
};
