import errors from '../../../errors';
import config from '../../../../../config';

const { PermissionDeniedError } = errors;
const { modelScopes: { user: { admin } } } = config;

export default async (ctx, next) => {
  const user = ctx.state.user;

  if (user && user.role === admin) {
    await next();
  } else {
    throw new PermissionDeniedError('Permission denied. Only admins are allowed', {
      status: 'error',
    });
  }
};
