import { Header } from '../../components/TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import { useState } from 'react';
import { LoadingScreen } from '../../components/LoadingScreen';

export const Home = () => {
  // eslint-disable-next-line
  const [tasks, _setTasks] = useState<string[]>([
    'Task #1',
    'Task #2',
    'Task #3',
  ]);

  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

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
            />
            Task #4
            <hr />
          </li>
        </ul>
      </div>
    </>
  );
};
