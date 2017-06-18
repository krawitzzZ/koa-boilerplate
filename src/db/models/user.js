import bcrypt from 'bcrypt';
import config from '../../../config';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      login: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false,
        set(val = '') {
          this.setDataValue('login', val.toLowerCase());
        },
        validate: {
          minLength(val) {
            if (val.length < 2) {
              throw new Error('Login is too short. Minimum length is 2 chars');
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        set(val = '') {
          this.setDataValue('email', val.toLowerCase());
        },
        validate: {
          isEmail: {
            msg: 'Provided value is not a valid email address',
          },
        },
      },
      password: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
          minLength(val) {
            if (val.length < 6) {
              throw new Error('Password is too short. Minimum length is 6 chars');
            }
          },
        },
      },
      role: {
        type: DataTypes.STRING(6),
        allowNull: false,
        defaultValue: config.modelScopes.user.common,
      },
      recoveryToken: {
        type: DataTypes.UUID,
      },
    },
    {
      tableName: 'users',
      getterMethods: {
        isAdmin() {
          return this.role === config.modelScopes.user.admin;
        },
      },
      instanceMethods: {
        isPasswordValid(password) {
          const hashedPassword = this.getDataValue('password');
          return bcrypt.compare(password, hashedPassword);
        },
        isHashedPasswordValid(hashedPassword) {
          const existingHashedPassword = this.getDataValue('password');
          return hashedPassword === existingHashedPassword;
        },
      },
      scopes: {
        [config.modelScopes.user.admin]: {
          where: {
            role: config.modelScopes.user.admin,
          },
        },
        [config.modelScopes.user.common]: {
          where: {
            role: config.modelScopes.user.common,
          },
        },
      },
    }
  );

  User.beforeCreate(user =>
    bcrypt.hash(user.password, config.saltRounds).then(hashedPw => {
      user.password = hashedPw;
    })
  );

  User.beforeUpdate(async user => {
    if (!user.isHashedPasswordValid(user.password)) {
      return bcrypt.hash(user.password, config.saltRounds).then(hashedPw => {
        user.password = hashedPw;
      });
    }

    return Promise.resolve();
  });

  return User;
};
