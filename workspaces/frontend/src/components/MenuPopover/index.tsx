import {
  IonPopover,
  IonList,
  IonListHeader,
  IonItem,
  IonText,
} from '@ionic/react';
import React, { useState } from 'react';
import { DbProject } from '../../types';
import {
  ChangeProjectNameAlert,
  DeleteProjectConfirmationAlert,
  ShareProjectAlert,
} from '../Alerts';
import styles from './index.module.scss';

export const MenuPopover = ({
  popoverState,
  setShowPopover,
  activeProject,
}: {
  popoverState: { showPopover: boolean; event: any };
  setShowPopover: React.Dispatch<
    React.SetStateAction<{
      showPopover: boolean;
      event: undefined;
    }>
  >;
  activeProject: DbProject;
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
            {activeProject ? activeProject.name : 'Project'} Options
            {/* //!Fix this, it's crashing because at the beggining no project is set */}
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
        projectName={activeProject ? activeProject.name : ''} //! Fix, crashing because no project set
        projectId={activeProject ? activeProject._id : ''}
      />
      <ChangeProjectNameAlert
        changeProjectNameAlertVisibility={changeProjectNameAlertVisiblity}
        projectId={activeProject ? activeProject._id : ''}
      />
      <ShareProjectAlert
        shareProjectAlertVisibility={shareProjectAlertVisibility}
        projectName={activeProject ? activeProject.name : ''}
        shareProjectCode={activeProject ? activeProject.shareCode : 0}
      />
    </>
  );
};
