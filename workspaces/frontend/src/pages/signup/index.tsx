import { useMutation } from '@apollo/client';
import { SidenavAndHeader } from '../../components/SidenavAndHeader';
import { SIGNUP } from '../../gql/userMutations';
import { useForm } from 'react-hook-form';
import './index.scss';
import { useState } from 'react';

interface Inputs {
  name: string;
  email: string;
}

export const SignupScreen = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [signup] = useMutation(SIGNUP);
  const onSubmit = (data: Inputs) => {
    setError(null);
    setSuccess(null);
    signup({
      variables: {
        email: data.email,
        name: data.name,
      },
    }).then(
      (res) => {
        if (res.data.signup.ok) {
          setSuccess('User created');
          localStorage.setItem('userLogged', data.email);
        } else {
          setError(res.data.signup.err);
        }
      },
      (rej) => {
        setError('There was an error');
      }
    );
  };

  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <p className='brand-logo'>Taskia</p>
        </div>
      </nav>
      <div className='center-align login-container'>
        <h3>Signup now!</h3>
        <h4>It's that easy, no password needed</h4>
        {success && (
          <h5 className='card-panel green lighten-2'>Signup successful!</h5>
        )}
        {error && (
          <h5 className='card-panel red lighten-2'>User already exists!</h5>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            className='email'
            id=''
            placeholder='John Doe'
            {...register('name', { required: true })}
          />
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
