import Sequelize from 'sequelize';
import db from '../../../../db/models';
import generateToken from '../tokenGenerator';
import { createDebugger } from '../../../../utils';
import usersService from '../users';
import errors from '../../../errors';

const debug = createDebugger('app:services:auth:login');
const { LoginError } = errors;

export default async ctx => {
  try {
    const { login, password } = ctx.request.body;
    const existingUser = await db.User.findOne({ where: { login: Sequelize.fn('lower', login) } });

    if (!existingUser) {
      throw new LoginError('There is no user with provided login', { status: 'error' });
    }

    const isPasswordValid = await existingUser.isPasswordValid(password);

    if (!isPasswordValid) {
      throw new LoginError('Provided password is wrong', { status: 'error' });
    }

    const user = usersService.prepareUserForResponse(existingUser);
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
