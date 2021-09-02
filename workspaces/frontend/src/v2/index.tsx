import { IonAlert } from '@ionic/react';
import styles from './index.module.scss';
import React from 'react';

export const V2: React.FC = () => {
  return (
    <div>
      <IonAlert
        isOpen={true}
        header={'New task'}
        message='New task for *Project name*'
        buttons={[
          'CLOSE',
          {
            text: 'OK',
            handler: (e) => console.log(e.name1),
          },
        ]}
        inputs={[
          {
            name: 'newTask',
            type: 'text',
            placeholder: 'New task name',
          },
        ]}
      />
    </div>
  );
};
