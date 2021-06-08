import './index.scss';

export const TestComponent = (props: { username: string }) => {
  return (
    <div className=''>
      <div className='lateral-menu-top-bar'>
        <img
          src='avatarIcon.png'
          alt='iconAvatar'
          className='lateral-menu-avatar'
        />
        <p>John Snow</p>
      </div>
    </div>
  );
};
