import './index.scss';

export const LoadingScreen = () => {
  return (
    <>
      <div className='container-loading-screen'>
        <img src='logoTaskia.png' alt='Logo of Taskia' className='logo' />
        <h1>
          Loading...
          <img src='loadingIcon.png' alt='' className='loading' />
        </h1>
      </div>
    </>
  );
};
