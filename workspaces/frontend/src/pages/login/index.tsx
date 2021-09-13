import {
  IonButton,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonText,
  IonToast,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useForm } from 'react-hook-form';
import { DbUser } from '../../types';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../../gql/query/getUserByEmail';
import { LocalStorageService } from '../../services/LocalStorageService';
import { useHistory } from 'react-router-dom';

export const LoginScreen: React.FC = () => {
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState<string>();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successToastMessage, setSuccessToastMessage] = useState<string>();

  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [userLogin, { data, loading, error, called }] =
    useLazyQuery<{ getUserByEmail: DbUser }>(GET_USER_BY_EMAIL);

  const onSubmit = (input: { email: string }) => {
    userLogin({
      variables: {
        email: input.email,
      },
    });
  };

  useEffect(() => {
    if (called) {
      if (data?.getUserByEmail && !loading && !error) {
        setShowSuccessToast(true);
        setSuccessToastMessage('Login successful!');
        LocalStorageService.setUserIdInLocalStorage(data.getUserByEmail._id);
        setTimeout(() => {
          history.push('/');
          window.location.reload();
        }, 1500);
      }
      if (!data?.getUserByEmail) {
        setShowErrorToast(true);
        setErrorToastMessage("The user doesn't exists");
      }
    }
  }, [data, called, error, history, loading]);

  return (
    <div className={`${styles.bgFix}`}>
      <IonItemGroup className={`${styles.container}`}>
        <img
          src='LogoTaskiaNoFondo.png'
          alt='The logo of Taskia'
          className={`${styles.taskiaLogo}`}
        />
        <IonText color='light'>
          <h3 className='ion-text-center'>You're not logged in!</h3>
        </IonText>
        <form
          className={`${styles.loginInputs}`}
          onSubmit={handleSubmit(onSubmit)}>
          <IonItem className={`${styles.inputField}`}>
            <IonLabel position='stacked'>Email</IonLabel>
            <IonInput
              placeholder='example@email.com'
              {...register('email', { required: true })}
              clearInput={true}
            />
          </IonItem>

          <IonButton className='ion-float-right' type='submit'>
            LOGIN
          </IonButton>
        </form>
        <div className={`${styles.loginScreenBottomTextContainer}`}>
          <IonText color='light'>
            <h5 className={`${styles.loginScreenBottomText}`}>
              <a href='/signup'>Signup</a> if you don't have an account
            </h5>
          </IonText>
        </div>
        <IonToast
          isOpen={showErrorToast}
          message={errorToastMessage}
          duration={1500}
          color='danger'
        />
        <IonToast
          isOpen={showSuccessToast}
          message={successToastMessage}
          duration={1500}
          color='success'
        />
      </IonItemGroup>
    </div>
  );
};
