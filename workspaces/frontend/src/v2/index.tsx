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

export const V2: React.FC = () => {
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  return (
    <div>
      <div className={`${styles.topBar}`}>
        <IonMenuToggle>
          <IonIcon
            name='menu-outline'
            className={`${styles.iconMenu}`}></IonIcon>
        </IonMenuToggle>

        <p>Project name</p>
      </div>
      <div className={`${styles.taskListContainer}`}>
        <IonList lines='none'>
          <IonItem>
            <IonCheckbox />
            <p>Task 1</p>
          </IonItem>
          <IonItem>
            <IonCheckbox />
            <p>Task 2</p>
          </IonItem>
          <IonItem>
            <IonCheckbox />
            <p>Task 4</p>
          </IonItem>
          <IonItem className={`${styles.completed}`}>
            <IonCheckbox color='medium' checked={true} />
            <p>Task 3</p>
          </IonItem>
          <IonItem className={`${styles.completed}`}>
            <IonCheckbox color='medium' checked={true} />
            <p>Task 5</p>
          </IonItem>
          <IonFab vertical='bottom' horizontal='end'>
            <IonFabButton color='base'>
              <IonIcon icon={add} color='light' />
            </IonFabButton>
          </IonFab>
        </IonList>
      </div>
      <IonMenu
        side='start'
        contentId='projects'
        className={`${styles.sideMenu}`}>
        <IonHeader>
          <IonToolbar color='base'>
            <IonButtons slot='start' className={`${styles.toolbarMenuButtons}`}>
              <IonIcon icon={arrowBack} color='light' />
              <IonTitle color='light' className={`${styles.toolbarUserName}`}>
                User Name
              </IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent id='projects' className={`${styles.pointerFix}`}>
          <IonList
            lines='none'
            id='projects'
            className={`${styles.projectsMenu}`}>
            <IonTitle>
              <IonIcon
                icon={chevronDown}
                className={`${styles.projectsChevronDown}`}
              />{' '}
              Projects
            </IonTitle>
            <IonList className={`${styles.projectsList}`}>
              <IonItem>
                Project #1{' '}
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
              <IonItem>Project #2</IonItem>
              <IonItem className={`${styles.selected}`}>Project #3</IonItem>
            </IonList>
          </IonList>
          <IonList lines='none' className={`${styles.secondMenu}`}>
            <IonItem>
              <IonIcon
                icon={add}
                color='dark'
                className={`${styles.secondMenuIcon}`}
              />
              <p>New project</p>
            </IonItem>
            <IonItem>
              <IonIcon
                icon={exitOutline}
                color='dark'
                className={`${styles.secondMenuIcon}`}
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
            Project #4 Options
          </IonListHeader>
          <IonItem>Change name</IonItem>
          <IonItem>Share this project</IonItem>
          <IonItem>Show participants</IonItem>
          <IonItem>
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
    </div>
  );
};
