import { logger } from '../../../../logger/logger';
import { DbService } from '../../../../services/DbService';

export const getUserByEmail = (_source: any, { email }: { email: string }) => {
  logger.debug(`email: ${email}`);
  return DbService.getUserByEmail(email);
};
