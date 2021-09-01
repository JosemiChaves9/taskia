import {
  IonButton,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonText,
} from '@ionic/react';
import React from 'react';
import styles from './index.module.scss';

export const V2: React.FC = () => {
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
        <IonItemGroup className={`${styles.loginInputs}`}>
          <IonItem className={`${styles.inputField}`}>
            <IonLabel position='stacked'>Email</IonLabel>
            <IonInput placeholder='example@email.com' />
          </IonItem>

          <IonButton className='ion-float-right'>SIGNUP</IonButton>
        </IonItemGroup>
        <div>
          <IonText color='light'>
            <h5>
              If you're already part of Taskia you can{' '}
              <a href='/login'>Login</a>
            </h5>
          </IonText>
        </div>
      </IonItemGroup>
    </div>
  );
};
