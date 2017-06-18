import jwt from 'jsonwebtoken';
import config from '../../../../config';

const { jwtSecret, jwtLifeTime, jwtRefreshLifeTime } = config;

export default payload => {
  const token = jwt.sign(payload, jwtSecret, { expiresIn: jwtLifeTime });
  const refreshToken = jwt.sign(payload, jwtSecret, { expiresIn: jwtRefreshLifeTime });

  return { token, refreshToken };
};
