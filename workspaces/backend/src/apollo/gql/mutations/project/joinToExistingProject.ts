import { dbService } from '../../../../services/DbService';

export const joinToExistingProject = (
  _source: any,
  { shareCode, userId }: { shareCode: number; userId: string }
) => {
  return dbService.joinToAnExistingProject(shareCode, userId).then((res) => {
    if (res.value === null) {
      return {
        ok: false,
        err: "This project doesn't exist!",
      };
    } else {
      return res;
    }
  });
};
