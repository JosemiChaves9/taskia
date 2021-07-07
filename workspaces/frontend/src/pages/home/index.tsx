import './index.scss';
import { useHistory } from 'react-router-dom';
import { SidenavAndHeader } from '../../components/SidenavAndHeader';
import { DbProject, DbTask } from '../../types';
import { useEffect } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { MARK_TASK_AS_COMPLETED } from '../../gql/mutation/markTaskAsCompleted';
import { GET_ALL_USER_PROJECTS } from '../../gql/query/getAllUserProjects';
import { LocalStorageService } from '../../services/LocalStorageService';
import { useState } from 'react';
import { CHANGES_IN_TASK } from '../../gql/susbcription/changesInTask';

export const Home = () => {
  let history = useHistory();
  const [markTaskAsCompleted] = useMutation(MARK_TASK_AS_COMPLETED);
  const [activeProject, setActiveProject] = useState<DbProject>();
  const [userProjects, setUserProjects] = useState<DbProject[]>();
  const { data } = useSubscription(CHANGES_IN_TASK);
  const allUserProjects = useQuery<{
    getAllUserProjects: DbProject[];
  }>(GET_ALL_USER_PROJECTS, {
    variables: {
      userId: LocalStorageService.getUserIdFromLocalStorage(),
    },
    onError: () => {
      history.push('/error');
    },
  });

  useEffect(() => {
    if (
      allUserProjects.data &&
      !allUserProjects.error &&
      !allUserProjects.loading
    ) {
      setActiveProject(allUserProjects.data.getAllUserProjects[0]);
      setUserProjects(allUserProjects.data.getAllUserProjects);
    }
  }, [allUserProjects.data]);

  const markAsCompleted = (taskId: string) => {
    markTaskAsCompleted({
      variables: {
        projectId: activeProject?._id,
        taskId: taskId,
      },
    });
  };

  useEffect(() => {
    allUserProjects.refetch();
  }, [data]);

  return (
    <>
      <SidenavAndHeader
        userProjects={userProjects}
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />
      <ul className='collection tasklist'>
        {activeProject ? (
          activeProject.tasks?.map((task: DbTask) => {
            if (!task.completed) {
              return (
                <li
                  className='collection-item'
                  key={task.name}
                  onClick={() => markAsCompleted(task._id)}>
                  <i className='material-icons'>check_box_outline_blank</i>
                  {task.name}
                </li>
              );
            }
          })
        ) : (
          <h4>No tasks yet!</h4>
        )}
        {activeProject ? (
          activeProject.tasks?.map((task: DbTask) => {
            if (task.completed) {
              return (
                <li
                  className='collection-item finished'
                  key={task.name}
                  onClick={() => markAsCompleted(task._id)}>
                  <i className='material-icons'>check_box</i>
                  {task.name}
                </li>
              );
            }
          })
        ) : (
          <h4>No tasks yet!</h4>
        )}
      </ul>
      <div className='container-button'>
        <button
          className='material-icons add-task'
          onClick={() =>
            history.push(
              `/newTask/${activeProject?.name}/${activeProject?._id}`
            )
          }>
          add_circle
        </button>
      </div>
    </>
  );
};
