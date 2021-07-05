import { useForm } from 'react-hook-form';
import './index.scss';
import { Link } from 'react-router-dom';
import { LocalStorageService } from '../../services/LocalStorageService';
import { ErrorCard } from '../../components/Error';
import { useContext } from 'react';
import { UserContext } from '../../context';

export const LoginScreen = () => {
  const { register, handleSubmit } = useForm();
  const { loginUser } = useContext(UserContext);

  const onSubmit = (input: { email: string }) => {
    loginUser(input.email);
  };

  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <p className='brand-logo'>Taskia</p>
        </div>
      </nav>
      <div className='center-align login-container'>
        {/* {customError && <ErrorCard props={customError} />} */}
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
