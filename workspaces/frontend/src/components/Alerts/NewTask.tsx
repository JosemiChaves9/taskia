import { useMutation } from '@apollo/client';
import { IonAlert, IonToast } from '@ionic/react';
import { useState, useEffect } from 'react';
import { NEW_TASK } from '../../gql/mutation/newTask';
import { GenericDbResponse } from '../../types';

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
