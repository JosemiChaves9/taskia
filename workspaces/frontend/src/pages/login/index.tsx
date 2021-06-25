import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../../gql/getUserByEmailQuery';
import { useForm } from 'react-hook-form';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { userContext } from '../../context';
import { Link } from 'react-router-dom';
import { DbUser } from '../../types';
import { AuthUser } from '../../services/AuthUser';

export const LoginScreen = () => {
  const { setUser } = useContext(userContext);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [login] = useLazyQuery<{ getUserByEmail: DbUser }>(GET_USER_BY_EMAIL, {
    onCompleted: (res) => {
      if (!res.getUserByEmail) {
        setError("User doesn't exist");
      } else {
        localStorage.setItem('userLogged', res.getUserByEmail.email);
        setUser(res.getUserByEmail);
        history.push('/');
      }
    },
    onError: () => {
      history.push('/error');
    },
  });

  useEffect(() => {
    if (AuthUser.checkIfUserIsInLocalStorage()) {
      history.push('/');
    }
  }, []);

  const onSubmit = async (input: { email: string }) => {
    setError(null);
    login({
      variables: {
        email: input.email,
      },
    });
  };

  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <p className='brand-logo'>Taskia</p>
        </div>
      </nav>
      <div className='center-align login-container'>
        {error && (
          <h5 className='card-panel red lighten-2'>User already exists!</h5>
        )}
        <h3>You're not logged!</h3>
        <h4>Just type your email</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='email'
            className='email'
            id=''
            placeholder='example@mail.com'
            {...register('email', { required: true })}
          />
          <button className='waves-effect waves-green btn-large'>Login</button>
          <div>
            <div>
              Or if you dont have account you can{' '}
              <Link to='/signup'>signup </Link> to Taskia
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
