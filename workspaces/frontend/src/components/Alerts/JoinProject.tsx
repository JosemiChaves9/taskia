import { useMutation } from '@apollo/client';
import { IonAlert, IonToast } from '@ionic/react';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context';
import { JOIN_TO_AN_EXISTING_PROJECT } from '../../gql/mutation/joinToAnExistingProject';
import { GenericDbResponse } from '../../types';

export const JoinToProjectAlert = ({
  joinProjectAlertVisibility,
  setJoinProjectAlertVisibility,
}: {
  joinProjectAlertVisibility: boolean;
  setJoinProjectAlertVisibility: React.Dispatch<React.SetStateAction<boolean>>;
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
        onDidDismiss={() =>
          setJoinProjectAlertVisibility(!joinProjectAlertVisibility)
        }
        buttons={[
          'CLOSE',
          {
            text: 'ADD',
            handler: (e) => {
              joinToExistingProject({
                variables: {
                  shareCode: parseInt(e.shareCode),
                  userId: user?._id,
                },
              });
              setJoinProjectAlertVisibility(!joinProjectAlertVisibility);
            },
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
