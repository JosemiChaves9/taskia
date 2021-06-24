import { logger } from '../../../../logger/logger';
import { dbService } from '../../../../services/DbService';

export const getUserByEmail = (_source: any, { email }: { email: string }) => {
  logger.debug(`email: ${email}`);
  return dbService.getUserByEmail(email);
};
