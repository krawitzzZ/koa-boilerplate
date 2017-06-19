module.exports = {
  env: process.env.NODE_ENV || 'development',

  apiVersion: process.env.API_VERSION || 'v1',

  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,

  saltRounds: process.env.SALT_ROUNDS || 10,

  forceDbUponStart: process.env.FORCE_DB_UPON_START || false,

  dbDialect: process.env.DB_DIALECT || 'postgres',
  dbUrl: process.env.DATABASE_URL,
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || '5432',
  dbName: process.env.DB_NAME || 'koa_boilerplate',
  dbUsername: process.env.DB_USERNAME || 'postgres',
  dbUserPassword: process.env.DB_USER_PASSWORD || null,

  jwtSecret: process.env.JWT_SECRET || 'hf1__2h8*@H*89h1f8h*H@*(H*H2828)Zhf1fh@HF@*1hfh128f*(',
  jwtLifeTime: process.env.JWT_LIFE_TIME || '15m',
  jwtRefreshLifeTime: process.env.JWT_REFRESH_LIFE_TIME || '7d',

  modelScopes: {
    user: {
      admin: 'admin',
      common: 'common',
    },
  },
};
