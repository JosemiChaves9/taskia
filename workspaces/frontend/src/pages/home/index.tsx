import './index.scss';
import { useHistory } from 'react-router-dom';
import { SidenavAndHeader } from '../../components/SidenavAndHeader';
import { useEffect } from 'react';
import { Task } from '../../types';
import { useContext } from 'react';
import { userContext } from '../../components/context';

export const Home = () => {
  let history = useHistory();
  const { activeProject } = useContext(userContext);
  useEffect(() => {
    if (!localStorage.getItem('userLogged')) {
      history.push('login');
    }
  }, []);

  return (
    <>
      <ul className='collection tasklist'>
        <SidenavAndHeader />
        {activeProject ? (
          activeProject.tasks.map((task: Task) => {
            return (
              <li className={'collection-item'} key={task.name}>
                <i className='material-icons'>check_box_outline_blank</i>
                {task.name}
              </li>
            );
          })
        ) : (
          <p>Loading tasks...</p>
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
