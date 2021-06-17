import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../../gql/getUserByEmailQuery';
import { useForm } from 'react-hook-form';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../../components/context';

export const LoginScreen = () => {
  const { setUser } = useContext(userContext);
  const [login, { data }] = useLazyQuery(GET_USER_BY_EMAIL);
  const history = useHistory();

  const { register, handleSubmit } = useForm();
  const onSubmit = async (input: { email: string }) => {
    login({
      variables: {
        email: input.email,
      },
    });
    setUser(data.getUserByEmail);
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
