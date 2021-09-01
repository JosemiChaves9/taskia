import {
  IonButton,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonText,
  IonToast,
} from '@ionic/react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context';
import { LocalStorageService } from '../../services/LocalStorageService';
import { SignupDbResponse } from '../../types';
import styles from './index.module.scss';

interface FormInput {
  name: string;
  email: string;
}

export const SignupScreen: React.FC = () => {
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [error, setError] = useState<string>();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const history = useHistory();
  const [success, setSuccess] = useState<string>();
  const { register, handleSubmit } = useForm<FormInput>();
  const { signupUser } = useContext(UserContext);

  const onSubmit = async (data: FormInput) => {
    setShowErrorToast(false);
    setShowSuccessToast(false);

    const signupResult: { data: { signup: SignupDbResponse } } =
      await signupUser(data.email, data.name);
    if (!signupResult.data.signup.ok) {
      setError(signupResult.data.signup.err);
      setShowErrorToast(true);
    } else {
      setSuccess('User created!');
      setShowSuccessToast(true);
      LocalStorageService.setUserIdInLocalStorage(
        signupResult.data.signup.newUserId
      );
      setTimeout(() => {
        history.push('/');
      }, 1500);
    }
  };
  return (
    <div className={`${styles.bgFix}`}>
      <IonItemGroup className={`${styles.container}`}>
        <img
          src='LogoTaskiaNoFondo.png'
          alt='The logo of Taskia'
          className={`${styles.taskiaLogo}`}
        />
        <IonText color='light'>
          <h3 className='ion-text-center'>Ready to be part of Taskia?</h3>
        </IonText>
        <form
          className={`${styles.loginInputs}`}
          onSubmit={handleSubmit(onSubmit)}>
          <IonItem className={`${styles.inputField}`}>
            <IonLabel position='stacked'>Name</IonLabel>
            <IonInput
              clearInput={true}
              placeholder='Your name'
              {...register('name', { required: true })}
            />
          </IonItem>
          <IonItem className={`${styles.inputField}`}>
            <IonLabel position='stacked'>Email</IonLabel>
            <IonInput
              clearInput={true}
              placeholder='example@email.com'
              {...register('email', { required: true })}
            />
          </IonItem>

          <IonButton className='ion-float-right' type='submit'>
            SIGNUP
          </IonButton>
        </form>
        <IonText color='light'>
          <h4>
            {/* //! Fix that this text is appearing inline and not below */}
            If you're already part of Taskia you can <a href='/login'>Login</a>
          </h4>
          <IonToast
            isOpen={showErrorToast}
            message={error}
            duration={1500}
            color='danger'
          />
          <IonToast
            isOpen={showSuccessToast}
            message={success}
            duration={1500}
            color='success'
          />
        </IonText>
      </IonItemGroup>
    </div>
  );
};
