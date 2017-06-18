import { isByteLength, isEmail, isEmpty, equals } from 'validator';
import db from '../../../../db/models';
import config from '../../../../../config';
import errors from '../../../errors';

const { modelScopes: { user: { admin, common } } } = config;
const { NotFoundError, BadRequestError, PermissionDeniedError } = errors;

export default async ctx => {
  try {
    const user = ctx.state.user;
    const userId = ctx.params.id;
    const { login, email, role } = ctx.request.body;

    if (user.role !== admin && user.id !== userId) {
      throw new PermissionDeniedError('Permission denied. Only admin can update this user', {
        status: 'error',
      });
    }

    if (!login || !email || !role) {
      throw new BadRequestError(
        'For successful update you should provide "login", "email" and "role" fields',
        { status: 'error' }
      );
    }

    const existingUser = await db.User.findById(userId);

    if (!existingUser) {
      throw new NotFoundError('User not found', { status: 'error' });
    }

    if (user.role !== admin && role === admin) {
      throw new PermissionDeniedError('Permission denied for updating role', { status: 'error' });
    }

    if (equals(role, admin)) {
      const adminsCount = await db.User.scope(admin).count();

      if (adminsCount === 1 && user.role === admin && role === common) {
        ctx.throw(400, 'Last admin can not be removed', { status: 'error' });
      }
    }

    const existingUserWithNewCredentials = await db.User.findOne({
      where: {
        $or: [{ login, email }, { login }, { email }],
        $and: { $not: { id: existingUser.id } },
      },
    });

    if (existingUserWithNewCredentials) {
      throw new BadRequestError('User with provided credentials already exists', {
        status: 'error',
      });
    }

    if (!isByteLength(login, 2) || isEmpty(login)) {
      throw new BadRequestError('Login should be at least 2 characters length', {
        status: 'error',
      });
    }

    if (!isEmail(email)) {
      throw new BadRequestError('Provided value is not valid email address', { status: 'error' });
    }

    if (!(equals(role, admin) || equals(role, common))) {
      throw new BadRequestError(
        `Provided role is not correct. Correct values are: ${admin} and ${common}`,
        { status: 'error' }
      );
    }
  } catch (e) {
    throw e;
  }
};
