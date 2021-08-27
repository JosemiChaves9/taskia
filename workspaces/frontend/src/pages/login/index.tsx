import {
  IonButton,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonText,
} from '@ionic/react';
import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useForm } from 'react-hook-form';
import { DbUser } from '../../types';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../../gql/query/getUserByEmail';

export const LoginScreen: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [userLogin, { data, loading, error }] =
    useLazyQuery<{ getUserByEmail: DbUser }>(GET_USER_BY_EMAIL);

  const onSubmit = (input: { email: string }) => {
    userLogin({
      variables: {
        email: input.email,
      },
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

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
            />
          </IonItem>

          <IonButton className='ion-float-right' type='submit'>
            LOGIN
          </IonButton>
        </form>
        <IonText color='light'>
          <h4>
            {/* //! Fix that this text is appearing inline and not below */}
            <a href='/signup'>Signup</a> if you don't have an account
          </h4>
        </IonText>
      </IonItemGroup>
    </div>
  );
};
