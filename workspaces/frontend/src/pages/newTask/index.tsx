import { useEffect, useRef } from 'react';
import { SidenavAndHeader } from '../../components/SidenavAndHeader';
import './index.scss';
import M from 'materialize-css';

export const NewTask = () => {
  const project = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    M.FormSelect.init(project.current as Element);
  });
  return (
    <>
      <SidenavAndHeader />
      <div className='row'>
        <div className='input-field col s12'>
          <select ref={project}>
            <option value='' disabled selected>
              Choose your project
            </option>
            <option value='1'>Option 1</option>
            <option value='2'>Option 2</option>
            <option value='3'>Option 3</option>
          </select>
        </div>
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
            <div className='col s12'></div>
          </div>
          <div className='new-task-container'>
            <button className='add-task'>Add task!</button>
          </div>
        </form>
      </div>
    </>
  );
};
