import { useMutation } from '@apollo/client';
import { IonAlert, IonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import { DELETE_PROJECT } from '../../gql/mutation/deleteProject';
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
