import { createDebugger } from '../../../../utils';
import authService from '../../services/auth';

const debug = createDebugger('app:controllers:auth:login');

export default async ctx => {
  debug('login user');

  try {
    const user = await authService.login(ctx);

    ctx.body = {
      status: 'success',
      user,
    };
  } catch (e) {
    debug('error login user');
    debug(e);
    throw e;
  }
};
