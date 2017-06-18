import CustomError from './customError';

export default class PermissionDeniedError extends CustomError {
  constructor(message, data) {
    super(message || 'Permission denied', 403, data);
  }
}
