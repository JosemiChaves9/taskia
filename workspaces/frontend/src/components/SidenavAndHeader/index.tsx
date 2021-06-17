import './index.scss';
import M from 'materialize-css';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useQuery } from '@apollo/client';
import { Project, User } from '../../types';
import { GET_PROJECTS_BY_EMAIL } from '../../gql/getProjectsByEmail';

export const SidenavAndHeader = (props: { data: string }) => {
  const sidenav = useRef<HTMLDivElement | null>(null);
  const popup = useRef<HTMLDivElement | null>(null);
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);
  const { loading, data } = useQuery<{ getProjectsByEmail: Project[] }>(
    GET_PROJECTS_BY_EMAIL,
    {
      variables: {
        email: localStorage.getItem('userLogged'),
      },
    }
  );

  useEffect(() => {
    if (!loading) {
      setProjects(data?.getProjectsByEmail);
    }
  }, [data]);
  useEffect(() => {
    M.Sidenav.init(sidenav.current as Element);
    M.Modal.init(popup.current as Element);
  }, []);

  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <a href='#' className='brand-logo'>
            {props.data}
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
          <p>Josemi Chaves</p>
        </div>
        <div>
          <ul className='collection'>
            <h5 className='sidebar-options-header '>
              <i className='material-icons'>folder_open</i>Projects
            </h5>
            {projects ? (
              projects.map((project: Project, idx: number) => {
                return (
                  <li
                    className='collection-item'
                    key={projects[0]._id}
                    onClick={() => console.log(projects[idx]._id)}>
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
