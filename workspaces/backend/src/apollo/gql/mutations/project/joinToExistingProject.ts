import { dbService } from '../../../../services/DbService';

export const joinToExistingProject = (
  _source: any,
  { shareCode, userId }: { shareCode: number; userId: string }
) => {
  return dbService.joinToAnExistingProject(shareCode, userId).then(() => {
    return {
      ok: true,
      err: '',
    };
  });
};
