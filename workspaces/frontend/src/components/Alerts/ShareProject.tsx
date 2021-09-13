import { IonAlert } from '@ionic/react';

export const ShareProjectAlert = ({
  shareProjectAlertVisibility,
  projectName,
  shareProjectCode,
}: {
  shareProjectAlertVisibility: boolean;
  projectName: string;
  shareProjectCode: number;
}) => {
  return (
    <IonAlert
      isOpen={shareProjectAlertVisibility}
      header={`Share ${projectName}`}
      subHeader='Share this code with your friends'
      message={shareProjectCode.toString()}
      buttons={['CLOSE']}
    />
  );
};
