const env = process.env;
const dbUrl = env.DB_URL;
const dbDialect = env.DB_DIALECT || 'postgres';
const dbUsername = env.DB_USERNAME || 'postgres';
const dbUserPassword = env.DB_USER_PASSWORD || null;
const dbName = env.DB_NAME || 'koa_boilerplate';
const dbHost = env.DB_HOST || 'localhost';

module.exports = {
  development: dbUrl
    ? {
        url: dbUrl,
        dialect: dbDialect,
      }
    : {
        username: dbUsername,
        password: dbUserPassword,
        database: dbName,
        host: dbHost,
        dialect: dbDialect,
      },
  test: {
    username: dbUsername,
    password: dbUserPassword,
    database: dbName,
    host: dbHost,
    dialect: dbDialect,
  },
  production: dbUrl
    ? {
        url: dbUrl,
        dialect: dbDialect,
      }
    : {
        username: dbUsername,
        password: dbUserPassword,
        database: dbName,
        host: dbHost,
        dialect: dbDialect,
      },
};
