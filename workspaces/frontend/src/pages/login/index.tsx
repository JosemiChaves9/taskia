import { useLazyQuery } from '@apollo/client';
import { GET_USER } from '../../gql/userQuery';
import { useForm } from 'react-hook-form';
import './index.scss';
import { Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export const LoginScreen = () => {
  const [login, { data, loading }] = useLazyQuery(GET_USER);
  const [user, setUser] = useState(null);
  const history = useHistory();

  const { register, handleSubmit } = useForm();
  const onSubmit = async (input: { email: string }) => {
    login({
      variables: {
        email: input.email,
      },
    });
    const userName = await data;
    console.log(userName);
  };
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
          <button className='waves-effect waves-green btn-large'>Signup</button>
        </form>
      </div>
    </>
  );
};
