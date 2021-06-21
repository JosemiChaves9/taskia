import { DbService } from '../../../services/DbService';

export const joinToExistingProject = async (
  _source: any,
  { shareCode, userId }: { shareCode: number; userId: string }
) => {
  return DbService.joinToAnExistingProject(shareCode, userId).then(
    () => {
      return {
        ok: true,
        err: '',
      };
    },
    () => {
      return {
        ok: false,
        err: 'There was an error joining to the project',
      };
    }
  );
};
