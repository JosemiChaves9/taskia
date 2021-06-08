import { Header } from '../../components/TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckSquare,
  faPlusCircle,
  faSquare,
} from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import { useState } from 'react';
import { LoadingScreen } from '../../components/LoadingScreen';
import { Sidebar } from '../../components/SideBar';

export const Home = () => {
  // eslint-disable-next-line
  const [tasks, _setTasks] = useState<string[]>([
    'Task #1',
    'Task #2',
    'Task #3',
  ]);

  const [lateralMenu, setLateralMenu] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  if (lateralMenu) {
    return <Sidebar username='John Miles' />;
  }
  return (
    <>
      {loading && <LoadingScreen />}
      <Header projectName='Project #1' />

      <div>
        <ul className='homepage-tasklist'>
          {tasks.map((task) => {
            return (
              <li>
                <FontAwesomeIcon
                  icon={faSquare}
                  className='homepage-checkbox'
                />
                {task}
                <hr className='homepage-separator' />
              </li>
            );
          })}
          <li className='homepage-finished'>
            <FontAwesomeIcon
              icon={faCheckSquare}
              className='homepage-checkbox'
              onClick={() => setLateralMenu(true)}
            />
            Task #4
            <hr className='homepage-separator' />
          </li>
        </ul>
        <FontAwesomeIcon icon={faPlusCircle} className='homepage-plus-icon' />
      </div>
    </>
  );
};
