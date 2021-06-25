import { useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import M from 'materialize-css';
import { userContext } from '../../context';
import { useMutation } from '@apollo/client';
import { NEW_TASK } from '../../gql/newTaskMutation';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

interface FormInput {
  projectId: String;
  taskName: String;
}

export const NewTask = () => {
  const project = useRef<HTMLSelectElement | null>(null);
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState<string | null>(null);
  const { userProjects } = useContext(userContext);
  const [newTask] = useMutation(NEW_TASK);

  useEffect(() => {
    M.FormSelect.init(project.current as Element);
  });

  const onSubmit = (input: FormInput) => {
    setError(null);
    newTask({
      variables: {
        projectId: input.projectId,
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
      (_rej) => {
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
            <select
              {...register('projectId', { required: true })}
              ref={project}>
              <option value='' disabled selected>
                Choose your project
              </option>
              {userProjects ? (
                userProjects.map((project) => {
                  return <option value={project._id}>{project.name}</option>;
                })
              ) : (
                <p>Loading...</p>
              )}
            </select>
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
