export default async ctx => {
  ctx.status = 404;
  ctx.body = { status: 'error', message: 'Not Found' };
};
