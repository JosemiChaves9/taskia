import { useMutation } from '@apollo/client';
import { IonAlert } from '@ionic/react';
import { CHANGE_PROJECT_NAME } from '../../gql/mutation/changeProjectName';

export const ChangeProjectNameAlert = ({
  changeProjectNameAlertVisibility,
  setChangeProjectNameAlertVisiblity,
  projectId,
  projectName,
}: {
  changeProjectNameAlertVisibility: boolean;
  setChangeProjectNameAlertVisiblity: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  projectId: string;
  projectName: string;
}) => {
  const [changeProjectName] = useMutation(CHANGE_PROJECT_NAME);
  return (
    <IonAlert
      isOpen={changeProjectNameAlertVisibility}
      header={'New name'}
      subHeader={`New name for ${projectName}`}
      onDidDismiss={() =>
        setChangeProjectNameAlertVisiblity(!changeProjectNameAlertVisibility)
      }
      buttons={[
        'CLOSE',
        {
          text: 'OK',
          handler: (e) => {
            changeProjectName({
              variables: {
                projectId: projectId,
                newProjectName: e.newProjectName,
              },
            });
            setChangeProjectNameAlertVisiblity(
              !changeProjectNameAlertVisibility
            );
          },
        },
      ]}
      inputs={[
        {
          name: 'newProjectName',
          type: 'text',
          label: 'New project name',
          placeholder: 'New project name',
        },
      ]}
    />
  );
};
