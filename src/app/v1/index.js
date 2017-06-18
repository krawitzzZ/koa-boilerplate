import Koa from 'koa';
import mount from 'koa-mount';
import mainHandler from './controllers/mainHandler';
import notFound from './controllers/notFound';
import users from './controllers/users';
import auth from './controllers/auth';

const app = new Koa();

app.use(mainHandler);
app.use(mount('/auth', auth));
app.use(mount('/users', users));
app.use(notFound);

export default app;
