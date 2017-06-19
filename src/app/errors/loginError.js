import CustomError from './customError';

export default class LoginError extends CustomError {
  constructor(message, data) {
    super(message || 'Error to login', 401, data);
  }
}
