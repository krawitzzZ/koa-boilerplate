import db from '../../../../db/models';
import { newDebug } from '../../../../utils';

const debug = newDebug('app:services:users:list');

export default async () => {
  try {
    const users = await db.User.findAll({
      attributes: ['id', 'login', 'email', 'role', 'createdAt', 'updatedAt'],
    });

    return users;
  } catch (e) {
    debug(e);
    throw e;
  }
};
