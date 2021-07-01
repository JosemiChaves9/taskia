import './index.scss';
import M from 'materialize-css';
import { useEffect } from 'react';
import { useRef } from 'react';
import { DbProject } from '../../types';
import { useContext } from 'react';
import { userContext } from '../../context';
import { Link, useHistory } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_ALL_USER_PROJECTS } from '../../gql/query/getAllUserProjects';
import { useState } from 'react';
import { CHANGES_IN_TASK } from '../../gql/susbcription/changesInTask';

export const SidenavAndHeader = () => {
  const { user, activeProject, setActiveProject } = useContext(userContext);
  const [userProjects, setUserProjects] = useState<DbProject[]>();
  //const { userLogout } = useUser();
  const history = useHistory();
  const sidenav = useRef<HTMLDivElement | null>(null);
  const popup = useRef<HTMLDivElement | null>(null);
  const subscription = useSubscription(CHANGES_IN_TASK);

  const allUserProjects = useQuery(GET_ALL_USER_PROJECTS, {
    variables: {
      userId: '60dcab73576df23a27f21efb', //!!Remove this, change it for the userid of the context
    },
    onError: () => {
      history.push('/error');
    },
  });

  useEffect(() => {
    M.Sidenav.init(sidenav.current as Element);
    M.Modal.init(popup.current as Element);
  }, []);

  useEffect(() => {
    if (allUserProjects.data && !allUserProjects.loading) {
      setUserProjects(allUserProjects.data.getAllUserProjects);
      setActiveProject(allUserProjects.data.getAllUserProjects[1]);
    }
  }, [allUserProjects.data]);

  useEffect(() => {
    allUserProjects.refetch();
  }, [subscription.data]);

  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <a href='#' className='brand-logo'>
            {activeProject?.name}
          </a>
          <a href='#'>
            <i
              className='material-icons sidenav-trigger'
              data-target='slide-out'>
              menu
            </i>
          </a>
        </div>
      </nav>
      <div id='slide-out' className='sidebar-container sidenav' ref={sidenav}>
        <div className='sidebar-top-bar'>
          <img
            src='avatarIcon.png'
            alt='iconAvatar'
            className='sidebar-avatar'
          />
          {user && <p>{user.name}</p>}
        </div>
        <div>
          <ul className='collection'>
            <h5 className='sidebar-options-header '>
              <i className='material-icons'>folder_open</i>Projects
            </h5>
            {userProjects ? (
              userProjects.map((project: DbProject, idx: number) => {
                return (
                  <li
                    className='collection-item'
                    key={userProjects[idx]._id}
                    onClick={() => setActiveProject(project)}>
                    {project.name}
                  </li>
                );
              })
            ) : (
              <li>Loading</li>
            )}

            <button
              className='btn modal-trigger btn-flat sidebar-share'
              data-target='modal1'>
              {' '}
              <i className='material-icons'>share</i> Share this project!
            </button>
          </ul>
          <Link to='/newProject'>
            <button className='btn modal-trigger btn-flat sidebar-share'>
              {' '}
              <i className='material-icons'>add</i> New Project
            </button>
          </Link>
          <div className='row logout'>
            {/* <button className='btn btn-flat' onClick={() => userLogout()}>
              <i className='material-icons '>logout</i> Logout
            </button> */}
          </div>
          <div id='modal1' className='modal' ref={popup}>
            <div className='modal-content '>
              <h5>Share this code</h5>
              {activeProject && <p>{activeProject.shareCode}</p>}
            </div>
            <div className='modal-footer'>
              <a
                href='#!'
                className='modal-close waves-effect waves-green btn-flat'>
                Agree
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
