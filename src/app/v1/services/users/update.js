import db from '../../../../db/models';
import { createDebugger } from '../../../../utils';
import prepareUserForResponse from './prepareForResponse';
import validateForUpdate from './validateForUpdate';

const debug = createDebugger('app:services:users:update');

export default async ctx => {
  try {
    const userId = ctx.params.id;
    const { login, email, role } = ctx.request.body;

    await validateForUpdate(ctx);

    const existingUser = await db.User.findById(userId);
    const updatedUser = await existingUser.update({ login, email, role });
    const userForResponse = prepareUserForResponse(updatedUser);

    return userForResponse;
  } catch (e) {
    debug(e);
    throw e;
  }
};
