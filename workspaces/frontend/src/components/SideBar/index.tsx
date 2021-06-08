import {
  faChevronDown,
  faCircle,
  faFolder,
  faShare,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './index.scss';

export const Sidebar = (props: { username: string }) => {
  // eslint-disable-next-line
  const [projects, _setProjects] = useState<string[]>([
    'Project #1',
    'Project #2',
    'Project #3',
  ]);
  return (
    <div className='sidebar-container'>
      <div className='sidebar-top-bar'>
        <FontAwesomeIcon icon={faTimes} />
        <img src='avatarIcon.png' alt='iconAvatar' className='sidebar-avatar' />
        <p>{props.username}</p>
      </div>
      <div className='sidebar-options'>
        <p>
          <FontAwesomeIcon icon={faFolder} className='sidebar-folder-icon' />
          Projects
          <FontAwesomeIcon
            icon={faChevronDown}
            className='sidebar-chevron-down-icon'
          />
        </p>
        <ul className='sidebar-options-list'>
          {projects.map((project) => {
            return (
              <li>
                <FontAwesomeIcon
                  icon={faCircle}
                  className='sidebar-project-circle'
                />
                {project}
              </li>
            );
          })}
        </ul>
        <p className='sidebar-share'>
          <FontAwesomeIcon icon={faShare} className='sidebar-share-icon' />
          Share this project
        </p>
      </div>
    </div>
  );
};
