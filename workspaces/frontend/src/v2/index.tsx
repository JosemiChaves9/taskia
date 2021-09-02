import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToast,
} from '@ionic/react';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './index.module.scss';

export const V2: React.FC = () => {
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('There was an eror');
  const [showSuccessToast, setShowSuccessToast] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string>(
    'Task added successfuly'
  );
  const { register, handleSubmit } = useForm();

  const onSubmit = (e: any) => {
    console.log(e);
  };
  return (
    <div>
      <div className={`${styles.topBar}`}>
        <p>New task</p>
      </div>
      <div className='ion-margin'>
        <IonTitle>Add a new task</IonTitle>
        <form
          className={`${styles.newTaskInput}`}
          onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <IonLabel position='stacked'>New task name</IonLabel>
            <IonInput
              placeholder='Go to the mall'
              {...register('newTask', { required: true })}
              clearInput={true}
            />
          </IonItem>
          <IonButton className='ion-float-right ion-margin-top' type='submit'>
            ADD
          </IonButton>
        </form>
      </div>
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
