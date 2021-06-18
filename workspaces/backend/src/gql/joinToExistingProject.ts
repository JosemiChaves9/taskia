import { DbService } from '../services/DbService';

export const joinToExistingProject = (
  source: any,
  { shareCode, userId }: { shareCode: number; userId: string }
) => {
  return DbService.joinToAnExistingProject(shareCode, userId).then(
    (res) => {
      return {
        ok: true,
        err: '',
      };
    },
    (rej) => {
      return {
        ok: false,
        err: 'There was an error',
      };
    }
  );
};
