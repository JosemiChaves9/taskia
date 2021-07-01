import { useForm } from 'react-hook-form';
import './index.scss';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { ErrorCard } from '../../components/Error';

export const LoginScreen = () => {
  const { userLogin, customError } = useUser();
  const { register, handleSubmit } = useForm();

  const onSubmit = (input: { email: string }) => {
    debugger;
    userLogin(input.email);
  };

  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <p className='brand-logo'>Taskia</p>
        </div>
      </nav>
      <div className='center-align login-container'>
        {customError && <ErrorCard props={customError} />}
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
