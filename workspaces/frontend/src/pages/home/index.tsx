import {
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenu,
  IonMenuToggle,
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
import { NewProjectAlert, NewTaskAlert } from '../../components/Alerts';
import { MenuPopover } from '../../components/MenuPopover';
import styles from './index.module.scss';

export const Home: React.FC = () => {
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [newProjectAlertVisibility, setNewProjectAlertVisibility] =
    useState<boolean>(false);
  const [newTaskAlertVisibility, setNewTaskAlertVisibility] =
    useState<boolean>(false);

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
            onClick={() => setNewTaskAlertVisibility(true)}>
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
                setNewProjectAlertVisibility(true);
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
      <MenuPopover
        popoverState={popoverState}
        setShowPopover={setShowPopover}
      />
      <NewTaskAlert newTaskAlertVisibility={newTaskAlertVisibility} />
      <NewProjectAlert newProjectAlertVisibility={newProjectAlertVisibility} />
    </div>
  );
};
