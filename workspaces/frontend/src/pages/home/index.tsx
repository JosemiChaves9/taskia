import './index.scss';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { SidenavAndHeader } from '../../components/SidenavAndHeader';

export const Home = () => {
  // eslint-disable-next-line
  const [tasks, _setTasks] = useState<string[]>([
    'Task #1',
    'Task #2',
    'Task #3',
  ]);
  const [checked, setChecked] = useState<boolean>(false);
  // eslint-disable-next-line
  // eslint-disable-next-line
  const [logged, _setLogged] = useState<boolean>(true);

  return (
    <>
      {!localStorage.getItem('userLogged') && <Redirect to='/login' />}
      <ul className='collection tasklist'>
        <SidenavAndHeader />
        {tasks.map((task) => {
          return (
            <li
              className={
                checked ? 'collection-item finished' : 'collection-item'
              }
              onClick={() => setChecked(!checked)}>
              <i className='material-icons'>
                {checked ? 'check_box' : 'check_box_outline_blank'}
              </i>
              {task}
            </li>
          );
        })}
      </ul>
      <div className='container-button'>
        <button className='material-icons add-task'>add_circle</button>
      </div>
    </>
  );
};
