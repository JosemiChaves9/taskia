import { useMutation } from '@apollo/client';
import { IonAlert, IonToast } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import { NEW_PROJECT } from '../../gql/mutation/newProject';
import { NEW_TASK } from '../../gql/mutation/newTask';
import { GenericDbResponse } from '../../types';

export const DeleteProjectConfirmationAlert = ({
  deleteProjectConfirmVisibility,
  setDeleteProjectConfirmVisibility,
  projectName,
}: {
  deleteProjectConfirmVisibility: boolean;
  setDeleteProjectConfirmVisibility: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  projectName: string;
}) => {
  return (
    <IonAlert
      isOpen={deleteProjectConfirmVisibility}
      onDidDismiss={() => setDeleteProjectConfirmVisibility(false)}
      header={`Delete ${projectName}`}
      message={'Are you sure yo want to delete *Project name*?'}
      buttons={[
        'CLOSE',
        {
          text: 'OK',
          handler: () => {},
        },
      ]}
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
  const { user } = useContext(UserContext);
  const [successToastVisibility, setSuccessToastVisibility] =
    useState<boolean>(false);
  const [successToastMessage, setSuccessToastMesage] = useState<string>();
  const [errorToastVisibility, setErrorToastVisibility] =
    useState<boolean>(false);
  const [errorToastMessage, setErrorToastMesage] = useState<string>();
  const [newProjectMutation, { data, called }] = useMutation<{
    newProject: GenericDbResponse;
  }>(NEW_PROJECT);

  useEffect(() => {
    if (called) {
      if (data?.newProject.ok) {
        setSuccessToastVisibility(true);
        setSuccessToastMesage('Project created successfully');
      } else {
        setErrorToastVisibility(true);
        setErrorToastMesage(data?.newProject.err);
      }
    }
  }, [data]);

  return (
    <>
      <IonAlert
        animated={true}
        isOpen={newProjectAlertVisibility}
        header={'New project'}
        buttons={[
          'CLOSE',
          {
            text: 'OK',
            handler: (e) =>
              newProjectMutation({
                variables: {
                  userId: user?._id,
                  projectName: e.newProjectName,
                },
              }),
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
      <IonToast
        isOpen={successToastVisibility}
        color='success'
        message={successToastMessage}
        duration={1500}
      />
      <IonToast
        isOpen={errorToastVisibility}
        color='danger'
        message={errorToastMessage}
        duration={1500}
      />
    </>
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
  projectId,
  projectName,
}: {
  newTaskAlertVisibility: boolean;
  projectId: string;
  projectName: string;
}) => {
  const [successToastVisibility, setSuccessToastVisibility] =
    useState<boolean>(false);
  const [successToastMessage, setSuccessToastMesage] = useState<string>();
  const [errorToastVisibility, setErrorToastVisibility] =
    useState<boolean>(false);
  const [errorToastMessage, setErrorToastMesage] = useState<string>();
  const [newTaskMutation, { data, called }] =
    useMutation<{ newTask: GenericDbResponse }>(NEW_TASK);

  useEffect(() => {
    if (called) {
      if (data?.newTask.ok) {
        setSuccessToastVisibility(true);
        setSuccessToastMesage('Task created successfully');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        setErrorToastVisibility(true);
        setErrorToastMesage(data?.newTask.err);
      }
    }
  }, [data]);

  return (
    <>
      <IonAlert
        isOpen={newTaskAlertVisibility}
        header={'New task'}
        message={`New task for ${projectName}`}
        buttons={[
          'CLOSE',
          {
            text: 'ADD',
            handler: (e) =>
              newTaskMutation({
                variables: { taskName: e.newTask, projectId: projectId },
              }),
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
      <IonToast
        isOpen={successToastVisibility}
        color='success'
        message={successToastMessage}
        duration={1500}
      />
      <IonToast
        isOpen={errorToastVisibility}
        color='danger'
        message={errorToastMessage}
        duration={1500}
      />
    </>
  );
};
