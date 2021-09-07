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
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>();
  const history = useHistory();
  const { register, handleSubmit } = useForm<FormInput>();
  const { signupUser } = useContext(UserContext);

  const onSubmit = async (data: FormInput) => {
    setShowErrorToast(false);
    setShowSuccessToast(false);

    const signupResult: { data: { signup: SignupDbResponse } } =
      await signupUser(data.email, data.name);
    if (!signupResult.data.signup.ok) {
      setErrorMessage(signupResult.data.signup.err);
      setShowErrorToast(true);
    } else {
      setSuccessMessage('User created!');
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
          className={`${styles.signupInputs}`}
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
        <div className={`${styles.signupScreenBottomTextContainer}`}>
          <IonText color='light'>
            <h5 className={`${styles.signupScreenBottomText}`}>
              If you're already part of Taskia you can{' '}
              <a href='/login'>Login</a>
            </h5>
          </IonText>
        </div>
      </IonItemGroup>
      <IonToast
        isOpen={showErrorToast}
        message={errorMessage}
        duration={1500}
        color='danger'
      />
      <IonToast
        isOpen={showSuccessToast}
        message={successMessage}
        duration={1500}
        color='success'
      />
    </div>
  );
};
