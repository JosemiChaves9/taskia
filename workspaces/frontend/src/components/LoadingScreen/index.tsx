import './index.scss';

export const LoadingScreen = () => {
  return (
    <>
      <div className='loading-screen-container'>
        <img
          src='LogoTaskia.png'
          alt='Logo of Taskia'
          className='loading-screen-logo'
        />
        <img
          src='loadingIcon.png'
          alt=''
          className='loading-screen-loading-animation'
        />
      </div>
    </>
  );
};
