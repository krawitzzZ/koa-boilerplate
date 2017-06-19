import db from '../../../../db/models';
import { createDebugger } from '../../../../utils';
import errors from '../../../errors';

const debug = createDebugger('app:services:users:retrieve');
const { NotFoundError } = errors;

export default async ctx => {
  try {
    const userId = ctx.params.id;
    const user = await db.User.findById(userId, {
      attributes: ['id', 'login', 'email', 'role', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new NotFoundError('User not found', { status: 'error' });
    }

    return user;
  } catch (e) {
    debug(e);
    throw e;
  }
};
