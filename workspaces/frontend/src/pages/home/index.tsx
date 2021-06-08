import { TopBar } from '../../components/TopBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import { useState } from 'react';
import { LoadingScreen } from '../../components/LoadingScreen';

export const Home = () => {
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
      <TopBar projectName='Project #1' />
      <div>
        <ul>
          {tasks.map((task) => {
            return (
              <li>
                <FontAwesomeIcon icon={faSquare} className='checkbox' />
                {task}
                <hr />
              </li>
            );
          })}
          <li className='finished'>
            <FontAwesomeIcon icon={faCheckSquare} className='checkbox' />
            Task #4
            <hr />
          </li>
        </ul>
      </div>
    </>
  );
};
