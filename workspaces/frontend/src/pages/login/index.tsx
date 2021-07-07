import { useForm } from 'react-hook-form';
import './index.scss';
import { Link, useHistory } from 'react-router-dom';
import { LocalStorageService } from '../../services/LocalStorageService';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../../gql/query/getUserByEmail';
import { DbUser } from '../../types';
import { useEffect } from 'react';
import { useState } from 'react';
import { ErrorCard } from '../../components/Error';

export const LoginScreen = () => {
  const { register, handleSubmit } = useForm();
  const [customError, setCustomError] = useState<string | null>(null);
  const history = useHistory();
  const [userLogin, { data, loading, error }] =
    useLazyQuery<{ getUserByEmail: DbUser }>(GET_USER_BY_EMAIL);

  const onSubmit = (input: { email: string }) => {
    setCustomError(null);
    userLogin({
      variables: {
        email: input.email,
      },
    });
  };

  useEffect(() => {
    if (data && !error && !loading) {
      LocalStorageService.setUserIdInLocalStorage(data.getUserByEmail._id);
      history.push('/');
      window.location.reload();
    }

    if (!data && error && !loading) {
      setCustomError('There was an error');
    }
  }, [data]);

  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <p className='brand-logo'>Taskia</p>
        </div>
      </nav>
      <div className='center-align login-container'>
        {customError && <ErrorCard error={customError} />}
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
