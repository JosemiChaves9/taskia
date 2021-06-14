import { useMutation } from '@apollo/client';
import { SidenavAndHeader } from '../../components/SidenavAndHeader';
import { SIGNUP } from '../../gql/userMutations';
import { useForm } from 'react-hook-form';
import './index.scss';

interface Inputs {
  name: string;
  email: string;
}

export const SignupScreen = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [signup] = useMutation(SIGNUP);
  const onSubmit = (data: Inputs) => {
    signup({
      variables: {
        email: data.email,
        name: data.name,
      },
    });
    console.log(data);
  };

  return (
    <>
      <SidenavAndHeader />
      <div className='center-align login-container'>
        <h3>Signup now!</h3>
        <h4>It's that easy, no password needed</h4>
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
          <button>Signup</button>
        </form>
      </div>
    </>
  );
};
