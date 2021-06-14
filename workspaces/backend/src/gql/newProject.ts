import { DbService } from '../services/DbService';

export const newProject = (source: any, { name }: { name: string }) => {
  try {
    DbService.newProject(name).then(() => {
      return {
        ok: true,
        err: '',
      };
    });
  } catch (error) {
    return {
      ok: false,
      err: error,
    };
  }
};
