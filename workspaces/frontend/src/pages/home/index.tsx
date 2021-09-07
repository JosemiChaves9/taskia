import { useMutation, useQuery } from '@apollo/client';
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
  chevronForwardOutline,
  chevronDownOutline,
} from 'ionicons/icons';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { NewProjectAlert, NewTaskAlert } from '../../components/Alerts';
import { MenuPopover } from '../../components/MenuPopover';
import { UserContext } from '../../context';
import { MARK_TASK_AS_COMPLETED } from '../../gql/mutation/markTaskAsCompleted';
import { GET_ALL_USER_PROJECTS } from '../../gql/query/getAllUserProjects';
import { LocalStorageService } from '../../services/LocalStorageService';
import { DbProject, GenericDbResponse } from '../../types';
import styles from './index.module.scss';

export const Home: React.FC = () => {
  const { user } = useContext(UserContext);
  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });
  const [newProjectAlertVisibility, setNewProjectAlertVisibility] =
    useState<boolean>(false);
  const [newTaskAlertVisibility, setNewTaskAlertVisibility] =
    useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<DbProject>();
  const [showProjects, setShowProjects] = useState<boolean>(false);

  const { data } = useQuery<{ getAllUserProjects: DbProject[] }>(
    GET_ALL_USER_PROJECTS,
    {
      skip: !!!user,
      variables: {
        userId: user?._id,
      },
    }
  );

  const [markTaskAsCompleted] = useMutation<{
    markTaskAsCompleted: GenericDbResponse;
  }>(MARK_TASK_AS_COMPLETED);

  useEffect(() => {
    setActiveProject(data?.getAllUserProjects[1]);
  }, [data]);

  return (
    <div>
      <div className={`${styles.topBar} ion-padding-horizontal`}>
        <IonMenuToggle className={`${styles.iconMenuContainer}`}>
          <IonIcon
            name='menu-outline'
            className={`${styles.iconMenu}`}></IonIcon>
        </IonMenuToggle>

        <p>{activeProject?.name}</p>
      </div>
      <div className={`${styles.taskListContainer} ion-padding`}>
        <IonList lines='none'>
          {activeProject?.tasks?.map((task) => {
            return task.completed ? (
              <IonItem className={`${styles.completed}`}>
                <IonCheckbox color='medium' checked={true} />
                <p>{task.name}</p>
              </IonItem>
            ) : (
              <IonItem
                onClick={() =>
                  markTaskAsCompleted({
                    variables: {
                      projectId: activeProject._id,
                      taskId: task._id,
                    },
                  })
                }>
                <IonCheckbox />
                <p>{task.name}</p>
              </IonItem>
            );
          })}

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
                {user?.name}
              </IonTitle>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent id='projects' className={`${styles.pointerFix}`}>
          <IonList
            lines='none'
            id='projects'
            className={`${styles.projectsMenu} ion-padding-start`}>
            <IonTitle onClick={() => setShowProjects(!showProjects)}>
              <IonIcon
                icon={showProjects ? chevronDownOutline : chevronForwardOutline}
                className={`${styles.projectsChevronDown} ion-padding-end`}
              />
              Projects
            </IonTitle>
            {showProjects && (
              <IonList className={`${styles.projectsList}`}>
                {data?.getAllUserProjects.map((project) => {
                  return (
                    <IonItem
                      className={
                        activeProject?.name === project.name
                          ? styles.selected
                          : ''
                      }>
                      {/* //! Make this prettier */}
                      <p>{project.name}</p>
                      {activeProject?.name === project.name && (
                        <IonIcon
                          icon={ellipsisVertical}
                          color='dark'
                          slot='end'
                          onClick={(e: any) => {
                            e.persist();
                            setShowPopover({ showPopover: true, event: e });
                          }}
                        />
                      )}
                    </IonItem>
                  );
                })}
              </IonList>
            )}
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
            <IonItem
              onClick={() =>
                LocalStorageService.removeUserIdFromLocalStorage()
              }>
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
        activeProject={activeProject as DbProject}
      />
      <NewTaskAlert
        newTaskAlertVisibility={newTaskAlertVisibility}
        projectId={activeProject?._id as string}
        projectName={activeProject?.name as string}
      />
      <NewProjectAlert newProjectAlertVisibility={newProjectAlertVisibility} />
    </div>
  );
};
