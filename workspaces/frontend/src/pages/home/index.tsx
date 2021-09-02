import {
  IonAlert,
  IonBadge,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonPopover,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  add,
  arrowBack,
  exitOutline,
  ellipsisVertical,
  chevronDown,
} from 'ionicons/icons';
import React from 'react';
import { useState } from 'react';
import styles from './index.module.scss';

export const Home: React.FC = () => {
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [deleteProjectConfirm, setDeleteProjectConfirm] =
    useState<boolean>(false);
  const [newProjectAlert, setNewProjectAlert] = useState<boolean>(false);
  const [shareProjectAlert, setShareProjectlert] = useState<boolean>(false);
  const [changeProjectNameAlert, setChangeProjectNameAlert] =
    useState<boolean>(false);
  const [newTaskAlert, setNewTaskAlert] = useState<boolean>(false);

  return (
    <div>
      <div className={`${styles.topBar} ion-padding-horizontal`}>
        <IonMenuToggle className={`${styles.iconMenuContainer}`}>
          <IonIcon
            name='menu-outline'
            className={`${styles.iconMenu}`}></IonIcon>
        </IonMenuToggle>

        <p>*Project name*</p>
      </div>
      <div className={`${styles.taskListContainer} ion-padding`}>
        <IonList lines='none'>
          <IonItem>
            <IonCheckbox />
            <p>*Task name*</p>
          </IonItem>
          <IonItem>
            <IonCheckbox />
            <p>*Task name*</p>
          </IonItem>
          <IonItem>
            <IonCheckbox />
            <p>*Task name*</p>
          </IonItem>
          <IonItem className={`${styles.completed}`}>
            <IonCheckbox color='medium' checked={true} />
            <p>*Task name*</p>
          </IonItem>
          <IonItem className={`${styles.completed}`}>
            <IonCheckbox color='medium' checked={true} />
            <p>*Task name*</p>
          </IonItem>
          <IonFab
            vertical='bottom'
            horizontal='end'
            onClick={() => setNewTaskAlert(true)}>
            <IonFabButton color='base'>
              <IonIcon icon={add} color='light' />
            </IonFabButton>
          </IonFab>
        </IonList>
      </div>
      <IonMenu
        side='start'
        contentId='projects'
        className={`${styles.sideMenu}`}
        id='projects'>
        <IonHeader>
          <IonToolbar color='base'>
            <IonButtons
              slot='start'
              className={`${styles.toolbarMenuButtons} ion-padding-start`}>
              <IonMenuToggle menu='projects' autoHide={false}>
                <IonIcon icon={arrowBack} color='light' />
              </IonMenuToggle>
              <IonTitle
                color='light'
                className={`${styles.toolbarUserName} ion-padding-start`}>
                *User Name*
              </IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent id='projects' className={`${styles.pointerFix}`}>
          <IonList
            lines='none'
            id='projects'
            className={`${styles.projectsMenu} ion-padding-start`}>
            <IonTitle>
              <IonIcon
                icon={chevronDown}
                className={`${styles.projectsChevronDown} ion-padding-end`}
              />{' '}
              Projects
            </IonTitle>
            <IonList className={`${styles.projectsList}`}>
              <IonItem>
                *Project name*
                <IonIcon
                  icon={ellipsisVertical}
                  color='dark'
                  slot='end'
                  onClick={(e: any) => {
                    e.persist();
                    setShowPopover({ showPopover: true, event: e });
                  }}
                />
              </IonItem>
              <IonItem>*Project name*</IonItem>
              <IonItem className={`${styles.selected}`}>*Project name*</IonItem>
            </IonList>
          </IonList>
          <IonList lines='none' className={`${styles.secondMenu}`}>
            <IonItem
              onClick={() => {
                setNewProjectAlert(true);
              }}>
              <IonIcon
                icon={add}
                color='dark'
                className={`${styles.secondMenuIcon} ion-padding-end`}
              />
              <p>New project</p>
            </IonItem>
            <IonItem>
              <IonIcon
                icon={exitOutline}
                color='dark'
                className={`${styles.secondMenuIcon} ion-padding-end`}
              />
              <p>Logout</p>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
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
              setChangeProjectNameAlert(true);
            }}>
            Change name
          </IonItem>
          <IonItem
            onClick={() => {
              setShareProjectlert(true);
            }}>
            Share this project
          </IonItem>
          <IonItem
            onClick={() => {
              setDeleteProjectConfirm(true);
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
      <IonAlert
        isOpen={deleteProjectConfirm}
        onDidDismiss={() => setDeleteProjectConfirm(false)}
        cssClass='my-custom-class'
        header={'Delete *Project name*'}
        message={'Are you sure yo want to delete *Project name*?'}
        buttons={['CLOSE', 'OK']}
      />
      <IonAlert
        isOpen={changeProjectNameAlert}
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
      <IonAlert
        isOpen={newProjectAlert}
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
      <IonAlert
        isOpen={shareProjectAlert}
        header={'Share *Project Name*'}
        subHeader='Share this code with your friends'
        message='*ShareCode*'
        buttons={['CLOSE']}
      />
      <IonAlert
        isOpen={newTaskAlert}
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
    </div>
  );
};
