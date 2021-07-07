import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { NEW_TASK } from '../../gql/mutation/newTask';
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';

export const NewTask = () => {
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState<string | null>(null);
  const [newTask] = useMutation(NEW_TASK);
  const { projectId } = useParams<{ projectId: string }>();

  const onSubmit = (input: { taskName: string }) => {
    setError(null);
    newTask({
      variables: {
        projectId: projectId,
        taskName: input.taskName,
      },
    }).then(
      (res) => {
        if (res.data.newTask.ok) {
          history.push('/');
          window.location.reload();
        } else {
          setError('There was an error');
        }
      },
      () => {
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
          <div className='row center'>
            {/* <h5>Add task to {activeProject?.name} project</h5> */}
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                type='text'
                className='validate'
                placeholder='New task...'
                {...register('taskName', { required: true })}
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
