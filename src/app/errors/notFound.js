import CustomError from './customError';

export default class NotFoundError extends CustomError {
  constructor(message, data) {
    super(message || 'Not Found', 404, data);
  }
}
