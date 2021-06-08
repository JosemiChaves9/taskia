import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.scss';

export const Header = (props: { projectName: string }) => {
  return (
    <div className='header-main-wrapper'>
      <div className='header-container'>
        <FontAwesomeIcon icon={faBars} />
        <p>{props.projectName}</p>
      </div>
    </div>
  );
};
