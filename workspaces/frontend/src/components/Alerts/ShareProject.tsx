import { IonAlert } from '@ionic/react';
import React from 'react';

export const ShareProjectAlert = ({
  shareProjectAlertVisibility,
  setShareProjectAlertVisibility,
  projectName,
  shareProjectCode,
}: {
  shareProjectAlertVisibility: boolean;
  setShareProjectAlertVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  projectName: string;
  shareProjectCode: number;
}) => {
  return (
    <IonAlert
      isOpen={shareProjectAlertVisibility}
      onDidDismiss={() =>
        setShareProjectAlertVisibility(!shareProjectAlertVisibility)
      }
      header={`Share ${projectName}`}
      subHeader='Share this code with your friends'
      message={shareProjectCode.toString()}
      buttons={['CLOSE']}
    />
  );
};
