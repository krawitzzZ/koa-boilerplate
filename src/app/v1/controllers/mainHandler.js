import Sequelize from 'sequelize';
import customErrors from '../../errors';

const { ValidationError } = Sequelize;
const { LoginError, NotFoundError, BadRequestError, PermissionDeniedError } = customErrors;

export default async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof ValidationError) {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: e.errors.reduce(
          (errors, error) => ({
            ...errors,
            [error.path]: errors[error.path]
              ? `${errors[error.path]}, ${error.message}`
              : error.message,
          }),
          {}
        ),
      };
      return;
    }

    if (e instanceof LoginError) {
      ctx.status = e.status;
      ctx.body = {
        status: 'error',
        message: e.message,
      };
      return;
    }

    if (e instanceof NotFoundError) {
      ctx.status = e.status;
      ctx.body = {
        status: 'error',
        message: e.message,
      };
      return;
    }

    if (e instanceof BadRequestError) {
      ctx.status = e.status;
      ctx.body = {
        status: 'error',
        message: e.message,
      };
      return;
    }

    if (e instanceof PermissionDeniedError) {
      ctx.status = e.status;
      ctx.body = {
        status: 'error',
        message: e.message,
      };
      return;
    }

    ctx.status = e.status || 500;
    ctx.body = { status: 'error', message: e.message || 'Internal Server Error' };
  }
};
