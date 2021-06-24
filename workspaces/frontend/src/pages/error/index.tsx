import { useHistory } from 'react-router';
import styles from './index.module.scss';

export const Error = () => {
  const history = useHistory();
  return (
    <>
      <img
        src='LogoTaskia.png'
        alt='Logo of Taskia'
        className={styles.taskiaImage}
      />
      <h4 className='center-align'>
        There was an error, click the button below to refresh the page
      </h4>
      <div className={styles.buttonContainer}>
        <button
          className='waves-effect waves-light btn-large'
          onClick={() => {
            //! That's a trick and should be reviewed
            window.location.reload();
            history.replace('/');
          }}>
          Refresh
        </button>
      </div>
    </>
  );
};
