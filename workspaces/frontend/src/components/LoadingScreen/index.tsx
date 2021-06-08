import './index.scss';

export const LoadingScreen = () => {
  return (
    <>
      <div className='loading-screen-container'>
        <img
          src='logoTaskia.png'
          alt='Logo of Taskia'
          className='loading-screen-logo'
        />
        <h1>
          Loading...
          <img
            src='loadingIcon.png'
            alt=''
            className='loading-screen-loading-animation'
          />
        </h1>
      </div>
    </>
  );
};
