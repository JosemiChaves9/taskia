import { useMutation } from '@apollo/client';
import { IonAlert, IonToast } from '@ionic/react';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context';
import { NEW_PROJECT } from '../../gql/mutation/newProject';
import { GenericDbResponse } from '../../types';

export const NewProjectAlert = ({
  newProjectAlertVisibility,
  setNewProjectAlertVisibility,
}: {
  newProjectAlertVisibility: boolean;
  setNewProjectAlertVisibility: React.Dispatch<React.SetStateAction<boolean>>;
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
        onDidDismiss={() =>
          setNewProjectAlertVisibility(!newProjectAlertVisibility)
        }
        header={'New project'}
        buttons={[
          'CLOSE',
          {
            text: 'OK',
            handler: (e) => {
              newProjectMutation({
                variables: {
                  userId: user?._id,
                  projectName: e.newProjectName,
                },
              });
              setNewProjectAlertVisibility(!newProjectAlertVisibility);
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
