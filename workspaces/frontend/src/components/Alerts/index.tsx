import { IonAlert } from '@ionic/react';

export const DeleteProjectConfirmationAlert = ({
  deleteProjectConfirmVisibility,
  setDeleteProjectConfirmVisibility,
}: {
  deleteProjectConfirmVisibility: boolean;
  setDeleteProjectConfirmVisibility: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}) => {
  return (
    <IonAlert
      isOpen={deleteProjectConfirmVisibility}
      onDidDismiss={() => setDeleteProjectConfirmVisibility(false)}
      header={'Delete *Project name*'}
      message={'Are you sure yo want to delete *Project name*?'}
      buttons={['CLOSE', 'OK']}
    />
  );
};

export const ChangeProjectNameAlert = ({
  changeProjectNameAlertVisibility,
}: {
  changeProjectNameAlertVisibility: boolean;
}) => {
  return (
    <IonAlert
      isOpen={changeProjectNameAlertVisibility}
      header={'New name'}
      subHeader='New name for *Project Name*'
      buttons={[
        'CLOSE',
        {
          text: 'OK',
          handler: (e) => console.log(e.name1),
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

export const NewProjectAlert = ({
  newProjectAlertVisibility,
}: {
  newProjectAlertVisibility: boolean;
}) => {
  return (
    <IonAlert
      isOpen={newProjectAlertVisibility}
      header={'New project'}
      buttons={[
        'CLOSE',
        {
          text: 'OK',
          handler: (e) => console.log(e.name1),
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

export const ShareProjectAlert = ({
  shareProjectAlertVisibility,
}: {
  shareProjectAlertVisibility: boolean;
}) => {
  return (
    <IonAlert
      isOpen={shareProjectAlertVisibility}
      header={'Share *Project Name*'}
      subHeader='Share this code with your friends'
      message='*ShareCode*'
      buttons={['CLOSE']}
    />
  );
};

export const NewTaskAlert = ({
  newTaskAlertVisibility,
}: {
  newTaskAlertVisibility: boolean;
}) => {
  return (
    <IonAlert
      isOpen={newTaskAlertVisibility}
      header={'New task'}
      message='New task for *Project name*'
      buttons={[
        'CLOSE',
        {
          text: 'ADD',
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
  );
};
