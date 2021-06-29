import { useContext, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { DbUser } from '../types';
import { GET_USER_BY_EMAIL } from '../gql/getUserByEmailQuery';
import { userContext } from '../context';
import { useHistory } from 'react-router-dom';
import { SIGNUP } from '../gql/signupMutation';

export const useUser = () => {
  const history = useHistory();
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useContext(userContext);

  const [login] = useLazyQuery<{ getUserByEmail: DbUser }>(GET_USER_BY_EMAIL, {
    onCompleted: (res) => {
      if (!res.getUserByEmail) {
        setError("User doesn't exists");
        return;
      }
      localStorage.setItem('userLogged', res.getUserByEmail.email);
      setUser(res.getUserByEmail);
      history.push('/');
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
      (_rej) => {
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
