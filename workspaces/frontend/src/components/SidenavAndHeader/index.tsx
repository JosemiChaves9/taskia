import './index.scss';
import M from 'materialize-css';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Project } from '../../types';
import { useContext } from 'react';
import { userContext } from '../context';
import { useHistory } from 'react-router-dom';

export const SidenavAndHeader = () => {
  const { user, activeProject, setActiveProject, userProjects } =
    useContext(userContext);
  const history = useHistory();
  const sidenav = useRef<HTMLDivElement | null>(null);
  const popup = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!localStorage.getItem('userLogged')) {
      history.push('/login');
    }
    M.Sidenav.init(sidenav.current as Element);
    M.Modal.init(popup.current as Element);
  }, []);

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
              userProjects.map((project: Project) => {
                return (
                  <li
                    className='collection-item'
                    key={userProjects[0]._id}
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

          <button className='btn modal-trigger btn-flat sidebar-share'>
            {' '}
            <i className='material-icons'>add</i> New Project
          </button>

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
