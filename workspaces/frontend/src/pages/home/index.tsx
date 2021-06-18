import './index.scss';
import { useHistory } from 'react-router-dom';
import { SidenavAndHeader } from '../../components/SidenavAndHeader';
import { Task } from '../../types';
import { useContext } from 'react';
import { userContext } from '../../components/context';
import { useMutation } from '@apollo/client';
import { MARK_TASK_AS_COMPLETED } from '../../gql/markTaskAsCompletedMutation';
import { useEffect } from 'react';

export const Home = () => {
  let history = useHistory();
  const [markTaskAsCompleted] = useMutation(MARK_TASK_AS_COMPLETED);
  const { activeProject } = useContext(userContext);

  const markAsCompleted = (taskId: string) => {
    markTaskAsCompleted({
      variables: {
        projectId: activeProject._id,
        taskId: taskId,
      },
    });
  };

  useEffect(() => {}, [activeProject]);

  return (
    <>
      <ul className='collection tasklist'>
        <SidenavAndHeader />
        {activeProject ? (
          activeProject.tasks.map((task: Task) => {
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
          activeProject.tasks.map((task: Task) => {
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
          onClick={() => history.push('/newTask')}>
          add_circle
        </button>
      </div>
    </>
  );
};
