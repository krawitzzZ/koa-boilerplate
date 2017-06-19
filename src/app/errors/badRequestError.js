import CustomError from './customError';

export default class BadRequestError extends CustomError {
  constructor(message, data) {
    super(message || 'Bad Request', 400, data);
  }
}
