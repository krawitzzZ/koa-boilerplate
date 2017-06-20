import Sequelize from 'sequelize';
import path from 'path';
import Promise from 'bluebird';
import config from '../../../config';
import dbConfig from '../../../config/db';

const sequelize = config.dbUrl
  ? new Sequelize(config.dbUrl, { logging: false })
  : new Sequelize({
      ...dbConfig[config.env],
      logging: false,
    });

sequelize.Promise = Promise;

const db = {
  User: sequelize.import(path.resolve(__dirname, 'user.js')),
  sequelize,
  Sequelize,
};

export default db;
