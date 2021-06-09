import { Header } from '../../components/Header';
import './index.scss';
import { useState } from 'react';
import { Sidebar } from '../../components/SideBar';

export const Home = () => {
  // eslint-disable-next-line
  const [tasks, _setTasks] = useState<string[]>([
    'Task #1',
    'Task #2',
    'Task #3',
  ]);
  const [checked, setChecked] = useState<boolean>(false);
  const [lateralMenu, setLateralMenu] = useState<boolean>(false);

  return (
    <>
      {lateralMenu && <Sidebar username='John Miles' />}
      <Header projectName='Project #1' />
      <ul className='collection tasklist'>
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
