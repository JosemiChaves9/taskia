import './index.scss';
import M from 'materialize-css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../../gql/userQuery';
import { User } from '../../types';

export const SidenavAndHeader = () => {
  const sidenav = useRef<HTMLDivElement | null>(null);
  const popup = useRef<HTMLDivElement | null>(null);
  const { data } = useQuery<{ getUser: User }>(GET_USER, {
    variables: {
      email: localStorage.getItem('userLogged'),
    },
  });

  const [projects, _setProjects] = useState<string[]>([
    'Project #1',
    'Project #2',
    'Project #3',
  ]);

  useEffect(() => {
    M.Sidenav.init(sidenav.current as Element);
    M.Modal.init(popup.current as Element);
  }, []);

  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <a href='#' className='brand-logo'>
            Project #1
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
          <p>{data?.getUser.name}</p>
        </div>
        <div>
          <ul className='collection'>
            <h5 className='sidebar-options-header '>
              <i className='material-icons'>folder_open</i>Projects
            </h5>
            {projects.map((project: string, idx: number) => {
              return (
                <li
                  className='collection-item'
                  onClick={() => console.log(projects[idx])}>
                  {project}
                </li>
              );
            })}
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
