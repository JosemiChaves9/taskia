import {
  IonPopover,
  IonList,
  IonListHeader,
  IonItem,
  IonText,
} from '@ionic/react';
import React, { useState } from 'react';
import { DbProject } from '../../types';
import { ChangeProjectNameAlert } from '../Alerts/ChangeProjectName';
import { DeleteProjectConfirmationAlert } from '../Alerts/DeleteProjectConfirmation';
import { ShareProjectAlert } from '../Alerts/ShareProject';

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
      <ChangeProjectNameAlert
        changeProjectNameAlertVisibility={changeProjectNameAlertVisiblity}
        setChangeProjectNameAlertVisiblity={setChangeProjectNameAlertVisiblity}
        projectId={activeProject ? activeProject._id : ''}
        projectName={activeProject ? activeProject.name : ''}
      />
      <ShareProjectAlert
        shareProjectAlertVisibility={shareProjectAlertVisibility}
        setShareProjectAlertVisibility={setShareProjectAlertVisibility}
        projectName={activeProject ? activeProject.name : ''}
        shareProjectCode={activeProject ? activeProject.shareCode : 0}
      />
      <DeleteProjectConfirmationAlert
        deleteProjectConfirmVisibility={deleteProjectConfirmVisibility}
        setDeleteProjectConfirmVisibility={setDeleteProjectConfirmVisibility}
        projectName={activeProject ? activeProject.name : ''}
        projectId={activeProject ? activeProject._id : ''}
      />
    </>
  );
};
