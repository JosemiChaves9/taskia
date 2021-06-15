import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { SidenavAndHeader } from '../../components/SidenavAndHeader';
import { GET_USER } from '../../gql/userQuery';
import { useForm } from 'react-hook-form';

import './index.scss';

export const LoginScreen = () => {
  const [login, { data, loading }] = useLazyQuery(GET_USER);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (input: { email: string }) => {
    login({
      variables: {
        email: input.email,
      },
    });
    localStorage.setItem('userLogged', data.getUser.email);
  };

  return (
    <>
      <SidenavAndHeader />
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
