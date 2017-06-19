import db from './models/index';
import config from '../../config';
import { createDebugger } from '../utils';

const debug = createDebugger('app:syncDb');
const { modelScopes: { user: { admin } }, forceDbUponStart } = config;

const syncDb = () =>
  db.sequelize
    .sync({
      force: forceDbUponStart,
    })
    .then(() => {
      debug('Database synchronized');

      return db.User.scope(admin).count().then(usersCount => {
        if (!usersCount) {
          return db.User
            .create({
              login: 'admin',
              email: 'admin@admin.com',
              role: 'admin',
              password: 'admin123',
            })
            .then(() => {
              debug('Super admin created');
            })
            .catch(err => {
              debug('An error occurred while creating super admin');
              debug(err.message);
              process.exit(1);
            });
        }

        return Promise.resolve();
      });
    });

export default syncDb;
