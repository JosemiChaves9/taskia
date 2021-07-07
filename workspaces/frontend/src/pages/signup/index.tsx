import { ErrorCard } from '../../components/Error';
import { useForm } from 'react-hook-form';
import './index.scss';
import { useContext } from 'react';
import { UserContext } from '../../context';

interface FormInput {
  name: string;
  email: string;
}

export const SignupScreen = () => {
  const { register, handleSubmit } = useForm<FormInput>();
  const { signupUser } = useContext(UserContext);
  const onSubmit = (data: FormInput) => {
    signupUser(data.email, data.name).then((res: any) => {
      console.log(res);
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
        <h3>Signup now!</h3>
        <h4>It's that easy, no password needed</h4>

        {/* {customError && <ErrorCard props={customError} />} */}
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
