import { DbService } from '../services/DbService';

export const newTask = (source: any, { name }: { name: string }) => {
  try {
    return DbService.newTask(name).then(() => ({
      ok: true,
      err: '',
    }));
  } catch (error) {
    return { ok: false, err: error };
  }
};
