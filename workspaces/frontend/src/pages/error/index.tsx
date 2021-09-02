import { IonImg, IonTitle } from '@ionic/react';
import styles from './index.module.scss';

export const Error = () => {
  return (
    <div className={`${styles.bgFix}`}>
      <IonImg
        src='./LogoTaskiaNoFondo.png'
        className={`${styles.taskiaLogo}`}
      />
      <IonTitle color='light'>The're was an error</IonTitle>
    </div>
  );
};
