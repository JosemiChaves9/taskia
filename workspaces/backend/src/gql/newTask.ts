import { DbService } from '../services/DbService';

export const newTask = (
  source: any,
  { name, project }: { name: string; project: string }
) => {
  try {
    return DbService.newTask(name, project).then(() => ({
      ok: true,
      err: '',
    }));
  } catch (error) {
    return { ok: false, err: error };
  }
};
