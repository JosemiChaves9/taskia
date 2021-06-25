import styles from './index.module.scss';

export const Error = () => {
  return (
    <>
      <img
        src='LogoTaskia.png'
        alt='Logo of Taskia'
        className={styles.taskiaImage}
      />
      <h4 className='center-align'>
        There was an unrecoverable error, try again later.
      </h4>
    </>
  );
};
