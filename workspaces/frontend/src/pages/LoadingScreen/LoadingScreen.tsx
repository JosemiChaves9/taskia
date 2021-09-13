import { IonItemGroup, IonSpinner } from '@ionic/react';
import React from 'react';
import styles from './index.module.scss';

export const LoadingScreen: React.FC = () => {
  return (
    <div className={`${styles.bgFix}`}>
      <IonItemGroup className={`${styles.container}`}>
        <img
          src='LogoTaskiaNoFondo.png'
          alt='The logo of Taskia'
          className={`${styles.taskiaLogo}`}
        />
        <IonSpinner
          name='crescent'
          color='light'
          className={`${styles.spinnerFix}`}
        />
      </IonItemGroup>
    </div>
  );
};
