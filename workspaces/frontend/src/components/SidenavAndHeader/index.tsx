import './index.scss';
import M from 'materialize-css';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Project } from '../../types';
import { GET_ALL_USER_PROJECTS } from '../../gql/getAllUserProjects';
import { useContext } from 'react';
import { userContext } from '../context';

export const SidenavAndHeader = () => {
  const {
    user,
    activeProject,
    setActiveProject,
    setUserProjects,
    userProjects,
  } = useContext(userContext);
  const sidenav = useRef<HTMLDivElement | null>(null);
  const popup = useRef<HTMLDivElement | null>(null);

  const [getAllUserProjects, { loading, data }] = useLazyQuery<{
    getAllUserProjects: Project[];
  }>(GET_ALL_USER_PROJECTS);

  useEffect(() => {
    M.Sidenav.init(sidenav.current as Element);
    M.Modal.init(popup.current as Element);
  }, []);

  useEffect(() => {
    if (user) {
      getAllUserProjects({
        variables: {
          userId: user._id,
        },
      });
    }
    setUserProjects(data?.getAllUserProjects);
    setActiveProject(data?.getAllUserProjects[0]);
  }, [user, loading]);

  console.log(data);

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
              userProjects.map((project: Project, idx: number) => {
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
              <p>251514</p>
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
