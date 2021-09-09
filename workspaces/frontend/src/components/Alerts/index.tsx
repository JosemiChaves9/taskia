import { useMutation } from '@apollo/client';
import { IonAlert, IonToast } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import { CHANGE_PROJECT_NAME } from '../../gql/mutation/changeProjectName';
import { DELETE_PROJECT } from '../../gql/mutation/deleteProject';
import { JOIN_TO_AN_EXISTING_PROJECT } from '../../gql/mutation/joinToAnExistingProject';
import { NEW_PROJECT } from '../../gql/mutation/newProject';
import { NEW_TASK } from '../../gql/mutation/newTask';
import { GenericDbResponse } from '../../types';

export const DeleteProjectConfirmationAlert = ({
  deleteProjectConfirmVisibility,
  setDeleteProjectConfirmVisibility,
  projectName,
  projectId,
}: {
  deleteProjectConfirmVisibility: boolean;
  setDeleteProjectConfirmVisibility: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  projectName: string;
  projectId: string;
}) => {
  const [successToastVisibility, setSuccessToastVisibility] =
    useState<boolean>(false);
  const [successToastMessage, setSuccessToastMesage] = useState<string>();
  const [errorToastVisibility, setErrorToastVisibility] =
    useState<boolean>(false);
  const [errorToastMessage, setErrorToastMesage] = useState<string>();
  const [deleteProject, { data, called }] = useMutation<{
    deleteProject: GenericDbResponse;
  }>(DELETE_PROJECT);

  useEffect(() => {
    if (called) {
      if (data?.deleteProject.ok) {
        setSuccessToastVisibility(true);
        setSuccessToastMesage('Project deleted successfully');
      } else {
        setErrorToastVisibility(true);
        setErrorToastMesage(data?.deleteProject.err);
      }
    }
  }, [data, called]);
  return (
    <>
      <IonAlert
        isOpen={deleteProjectConfirmVisibility}
        onDidDismiss={() => setDeleteProjectConfirmVisibility(false)}
        header={`Delete ${projectName}`}
        message={`Are you sure yo want to delete ${projectName}?`}
        buttons={[
          'CLOSE',
          {
            text: 'OK',
            handler: () => {
              deleteProject({
                variables: {
                  projectId: projectId,
                },
              });
              setDeleteProjectConfirmVisibility(false);
            },
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

export const ChangeProjectNameAlert = ({
  changeProjectNameAlertVisibility,
  projectId,
  projectName,
}: {
  changeProjectNameAlertVisibility: boolean;
  projectId: string;
  projectName: string;
}) => {
  const [changeProjectName] = useMutation(CHANGE_PROJECT_NAME);
  return (
    <IonAlert
      isOpen={changeProjectNameAlertVisibility}
      header={'New name'}
      subHeader={`New name for ${projectName}`}
      buttons={[
        'CLOSE',
        {
          text: 'OK',
          handler: (e) =>
            changeProjectName({
              variables: {
                projectId: projectId,
                newProjectName: e.newProjectName,
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
  }, [data, called]);

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
      } else {
        setErrorToastVisibility(true);
        setErrorToastMesage(data?.newTask.err);
      }
    }
  }, [data, called]);

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

export const JoinToProjectAlert = ({
  joinProjectAlertVisibility,
}: {
  joinProjectAlertVisibility: boolean;
}) => {
  const { user } = useContext(UserContext);
  const [successToastVisibility, setSuccessToastVisibility] =
    useState<boolean>(false);
  const [successToastMessage, setSuccessToastMesage] = useState<string>();
  const [errorToastVisibility, setErrorToastVisibility] =
    useState<boolean>(false);
  const [errorToastMessage, setErrorToastMesage] = useState<string>();
  const [joinToExistingProject, { data, called }] = useMutation<{
    joinToExistingProject: GenericDbResponse;
  }>(JOIN_TO_AN_EXISTING_PROJECT);

  useEffect(() => {
    if (called) {
      if (data?.joinToExistingProject.ok) {
        setSuccessToastVisibility(true);
        setSuccessToastMesage('Joined to project successfully');
      } else {
        setErrorToastVisibility(true);
        setErrorToastMesage(data?.joinToExistingProject.err);
      }
    }
  }, [data, called]);

  return (
    <>
      <IonAlert
        isOpen={joinProjectAlertVisibility}
        header={'Join project'}
        message={`Join to a friends project!`}
        buttons={[
          'CLOSE',
          {
            text: 'ADD',
            handler: (e) =>
              joinToExistingProject({
                variables: {
                  shareCode: parseInt(e.shareCode),
                  userId: user?._id,
                },
              }),
          },
        ]}
        inputs={[
          {
            name: 'shareCode',
            type: 'number',
            placeholder: 'Project code',
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
