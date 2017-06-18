import db from '../../../../db/models';
import generateToken from '../tokenGenerator';
import { newDebug } from '../../../../utils';
import prepareUserForResponse from './prepareForResponse';
import errors from '../../../errors';

const debug = newDebug('app:services:users:create');
const { BadRequestError } = errors;

export default async ctx => {
  try {
    const { login, email, password } = ctx.request.body;
    const existingUser = await db.User.findOne({ where: { login, email } });

    if (existingUser) {
      throw new BadRequestError('User with provided credentials already exists', {
        status: 'error',
      });
    }

    const newUser = await db.User.create({ login, email, password });
    const user = prepareUserForResponse(newUser);
    const { token, refreshToken } = generateToken(user);

    return {
      ...user,
      token,
      refreshToken,
    };
  } catch (e) {
    debug(e);
    throw e;
  }
};
