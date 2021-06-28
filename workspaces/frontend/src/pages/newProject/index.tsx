import { useContext, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import './index.scss';
import M from 'materialize-css';
import { userContext } from '../../context';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { NEW_PROJECT } from '../../gql/newProjectMutation';
import { JOIN_TO_AN_EXISTING_PROJECT } from '../../gql/joinToAnExistingProjectMutation';

export const NewProject = () => {
  const project = useRef<HTMLSelectElement | null>(null);
  const { user } = useContext(userContext);
  const history = useHistory();
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState<string | null>(null);
  const [newProject] = useMutation(NEW_PROJECT);
  const [joinProject] = useMutation(JOIN_TO_AN_EXISTING_PROJECT);
  useEffect(() => {
    M.FormSelect.init(project.current as Element);
  });

  const handleNewProject = (input: { projectName: string }) => {
    setError(null);
    newProject({
      variables: {
        projectName: input.projectName,
        userId: user?._id,
      },
    }).then(
      (res) => {
        if (res.data.newProject.ok) {
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

  const handleJoinProject = (input: { shareCode: string }) => {
    const shareCode = parseInt(input.shareCode);
    joinProject({
      variables: {
        shareCode: shareCode,
        userId: user?._id,
      },
    }).then((res) => {
      if (res.data.joinToExistingProject.ok) {
        history.push('/');
      } else {
        setError(res.data.joinToExistingProject.err || 'Something went wrong');
      }
    });
  };

  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <p className='brand-logo'>Taskia</p>
        </div>
      </nav>
      <div className='row'>
        <form className='col s12' onSubmit={handleSubmit(handleNewProject)}>
          <div className='input-field col s12'>
            {error && <h5 className='card-panel red lighten-2'>{error}</h5>}
          </div>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                type='text'
                className='validate'
                placeholder='New project...'
                {...register('projectName')}
              />
            </div>
            <div className='col s12'></div>
          </div>
          <div className='new-task-container'>
            <button className='add-task'>Add project!</button>
          </div>
        </form>
      </div>
      <div className='row'>
        <form className='col s12' onSubmit={handleSubmit(handleJoinProject)}>
          <h5>Or join to an existing project</h5>
          <div className='row'>
            <div className='input-field col s12'>
              <input
                type='number'
                className='validate'
                placeholder='New project...'
                {...register('shareCode')}
              />
            </div>
            <div className='col s12'></div>
          </div>
          <div className='new-task-container'>
            <button className='add-task' type='submit'>
              Join project!
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
