import db from '../../../../db/models';
import config from '../../../../../config';
import { createDebugger } from '../../../../utils';
import errors from '../../../errors';

const debug = createDebugger('app:services:users:destroy');
const { modelScopes: { user: { admin } } } = config;
const { NotFoundError } = errors;

export default async ctx => {
  try {
    const userId = ctx.params.id;
    const user = await db.User.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found', { status: 'error' });
    }

    if (user.isAdmin) {
      const adminsCount = await db.User.scope(admin).count();

      if (adminsCount === 1) {
        ctx.throw(400, 'Last admin can not be removed', { status: 'error' });
      }
    }

    await user.destroy();
  } catch (e) {
    debug(e);
    throw e;
  }
};
