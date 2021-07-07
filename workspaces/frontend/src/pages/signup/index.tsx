import { ErrorCard } from '../../components/Error';
import { useForm } from 'react-hook-form';
import './index.scss';
import { useContext, useState } from 'react';
import { UserContext } from '../../context';
import { GenericDbResponse } from '../../types';

interface FormInput {
  name: string;
  email: string;
}

export const SignupScreen = () => {
  const { register, handleSubmit } = useForm<FormInput>();
  const [customError, setCustomError] = useState<string | null>(null);
  const { signupUser } = useContext(UserContext);
  const onSubmit = async (data: FormInput) => {
    const result: { data: { signup: GenericDbResponse } } = await signupUser(
      data.email,
      data.name
    );
    if (!result.data.signup.ok) {
      setCustomError(result.data.signup.err);
    }
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

        {customError && <ErrorCard error={customError} />}
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
