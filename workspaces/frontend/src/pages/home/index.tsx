import './index.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SidenavAndHeader } from '../../components/SidenavAndHeader';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROJECT_BY_ID } from '../../gql/getProjectById';
import { Project } from '../../types';

export const Home = () => {
  let history = useHistory();
  const [project, setProject] = useState<Project | undefined>(undefined);
  // eslint-disable-next-line
  const { loading, data } = useQuery<{ getProjectById: Project }>(
    GET_PROJECT_BY_ID,
    {
      variables: {
        projectId: '60cb17dff6258141872ac6ae',
      },
    }
  );
  // eslint-disable-next-line
  // eslint-disable-next-line
  const [logged, _setLogged] = useState<boolean>(true);
  useEffect(() => {
    if (!localStorage.getItem('userLogged')) {
      history.push('login');
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      setProject(data?.getProjectById);
    }
  }, [loading]);

  return (
    <>
      <ul className='collection tasklist'>
        <SidenavAndHeader data={project?.name as string} />
        {project?.tasks.map((task) => {
          return (
            <li className={'collection-item'}>
              <i className='material-icons'>check_box_outline_blank</i>
              {task.name}
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
