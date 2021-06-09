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
    <div>
      <div>
        <div className='sidebar-container'>
          <div className='sidebar-top-bar'>
            <img
              src='avatarIcon.png'
              alt='iconAvatar'
              className='sidebar-avatar'
            />
            <p>{props.username}</p>
          </div>
          <div>
            <ul className='collection '>
              <h5 className='sidebar-options-header  '>
                <i className='material-icons'>folder_open</i>Projects
              </h5>
              {projects.map((project: string, idx: number) => {
                if (idx === 1) {
                  return <li className='collection-item active'>{project}</li>;
                } else {
                  return <li className='collection-item'>{project}</li>;
                }
              })}
            </ul>
            <p className='sidebar-share'>
              <i className='material-icons'>share</i>
              Share this project
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
