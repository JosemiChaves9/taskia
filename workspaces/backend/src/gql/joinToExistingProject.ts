import { DbService } from '../services/DbService';

export const joinToExistingProject = (
  _source: any,
  { shareCode, userId }: { shareCode: number; userId: string }
) => {
  return DbService.joinToAnExistingProject(shareCode, userId).then(
    (_res) => {
      return {
        ok: true,
        err: '',
      };
    },
    (_rej) => {
      return {
        ok: false,
        err: 'There was an error',
      };
    }
  );
};
