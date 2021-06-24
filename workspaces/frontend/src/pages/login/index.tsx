import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../../gql/getUserByEmailQuery';
import { useForm } from 'react-hook-form';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { userContext } from '../../services/context';
import { Link } from 'react-router-dom';
import { User } from '../../types';

export const LoginScreen = () => {
  const { setUser } = useContext(userContext);
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [login, loginResult] =
    useLazyQuery<{ getUserByEmail: User }>(GET_USER_BY_EMAIL);

  const onSubmit = async (input: { email: string }) => {
    login({
      variables: {
        email: input.email,
      },
    });
  };

  useEffect(() => {
    if (!loginResult.data) return;
    localStorage.setItem('userLogged', loginResult.data.getUserByEmail.email);
    setUser(loginResult.data.getUserByEmail);
    history.push('/');
  }, [loginResult.data]);

  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <p className='brand-logo'>Taskia</p>
        </div>
      </nav>
      <div className='center-align login-container'>
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
