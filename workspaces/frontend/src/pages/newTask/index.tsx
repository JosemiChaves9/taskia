import { SidenavAndHeader } from '../../components/SidenavAndHeader';
import './index.scss';

export const NewTask = () => {
  return (
    <>
      <SidenavAndHeader />
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
