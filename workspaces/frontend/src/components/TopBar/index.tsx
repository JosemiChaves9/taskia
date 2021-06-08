import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './index.scss';

export const TopBar = (props: { projectName: string }) => {
  const [lateralMenu, setLateralMenu] = useState(false);
  return (
    <div className='main'>
      <div className='container'>
        {lateralMenu ? (
          <FontAwesomeIcon
            icon={faTimes}
            className={'menuIcon'}
            onClick={() => setLateralMenu(false)}
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            className={'menuIcon'}
            onClick={() => setLateralMenu(true)}
          />
        )}
        <p>{props.projectName}</p>
      </div>
    </div>
  );
};
