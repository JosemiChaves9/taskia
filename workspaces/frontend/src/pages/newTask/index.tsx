import { Header } from '../../components/Header';
import './index.scss';

export const NewTask = () => {
  return (
    <>
      <Header projectName='Project #1' />
      <div className='row'>
        <form className='col s12'>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                id='first_name'
                type='text'
                className='validate'
                placeholder='New task...'
              />
            </div>
          </div>
          <div className='new-task-container'>
            <button className='add-task'>Add task!</button>
          </div>
        </form>
      </div>
    </>
  );
};
