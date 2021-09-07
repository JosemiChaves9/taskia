import {
  IonPopover,
  IonList,
  IonListHeader,
  IonItem,
  IonText,
} from '@ionic/react';
import React, { useState } from 'react';
import {
  ChangeProjectNameAlert,
  DeleteProjectConfirmationAlert,
  ShareProjectAlert,
} from '../Alerts';
import styles from './index.module.scss';

export const MenuPopover = ({
  popoverState,
  setShowPopover,
}: {
  popoverState: { showPopover: boolean; event: any };
  setShowPopover: React.Dispatch<
    React.SetStateAction<{
      showPopover: boolean;
      event: undefined;
    }>
  >;
}) => {
  const [deleteProjectConfirmVisibility, setDeleteProjectConfirmVisibility] =
    useState<boolean>(false);

  const [changeProjectNameAlertVisiblity, setChangeProjectNameAlertVisiblity] =
    useState<boolean>(false);
  const [shareProjectAlertVisibility, setShareProjectAlertVisibility] =
    useState<boolean>(false);

  return (
    <>
      <IonPopover
        cssClass={`${styles.popover}`}
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() =>
          setShowPopover({ showPopover: false, event: undefined })
        }>
        <IonList>
          <IonListHeader className={`${styles.popoverTitle}`}>
            *Project name* Options
          </IonListHeader>
          <IonItem
            onClick={() => {
              setChangeProjectNameAlertVisiblity(true);
            }}>
            Change name
          </IonItem>
          <IonItem
            onClick={() => {
              setShareProjectAlertVisibility(true);
            }}>
            Share this project
          </IonItem>
          <IonItem
            onClick={() => {
              setDeleteProjectConfirmVisibility(true);
            }}>
            <IonText color='danger'>Delete project</IonText>
          </IonItem>
          <IonItem
            onClick={() =>
              setShowPopover({
                showPopover: !popoverState.showPopover,
                event: undefined,
              })
            }>
            Close
          </IonItem>
        </IonList>
      </IonPopover>
      <DeleteProjectConfirmationAlert
        deleteProjectConfirmVisibility={deleteProjectConfirmVisibility}
        setDeleteProjectConfirmVisibility={setDeleteProjectConfirmVisibility}
      />
      <ChangeProjectNameAlert
        changeProjectNameAlertVisibility={changeProjectNameAlertVisiblity}
      />
      <ShareProjectAlert
        shareProjectAlertVisibility={shareProjectAlertVisibility}
      />
    </>
  );
};
