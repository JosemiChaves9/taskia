import { useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import './index.scss';
import M from 'materialize-css';
import { userContext } from '../../components/context';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { NEW_PROJECT } from '../../gql/newProjectMutation';

export const NewProject = () => {
  const project = useRef<HTMLSelectElement | null>(null);
  const { user } = useContext(userContext);
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState<string | null>(null);
  const [newProject] = useMutation(NEW_PROJECT);

  useEffect(() => {
    M.FormSelect.init(project.current as Element);
  });

  const onSubmit = (input: { projectName: string }) => {
    setError(null);
    newProject({
      variables: {
        projectName: input.projectName,
        userId: user._id,
      },
    }).then(
      (res) => {
        if (res.data.newProject.ok) {
          history.push('/');
        } else {
          setError('There was an error');
        }
      },
      (rej) => {
        setError('There was an error');
      }
    );
  };
  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <p className='brand-logo'>Taskia</p>
        </div>
      </nav>
      <div className='row'>
        <form className='col s12' onSubmit={handleSubmit(onSubmit)}>
          <div className='input-field col s12'>
            {error && (
              <h5 className='card-panel red lighten-2'>There was an error!</h5>
            )}
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                type='text'
                className='validate'
                placeholder='New project...'
                {...register('projectName', { required: true })}
              />
            </div>
            <div className='col s12'></div>
          </div>
          <div className='new-task-container'>
            <button className='add-task'>Add project!</button>
          </div>
        </form>
      </div>
    </>
  );
};
