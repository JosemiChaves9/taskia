import './index.scss';

export const Header = (props: { projectName: string }) => {
  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <a href='#' className='brand-logo'>
            {props.projectName}
          </a>
          <i className='material-icons'>menu</i>
        </div>
      </nav>
    </>
  );
};
