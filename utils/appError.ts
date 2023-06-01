/**
  + Operational errors refer to situations where you understand what
  happened in the future and the impact of it
  – for example, a query to some HTTP
  service failed due to connection problem.

  + Programmer errors refer to cases where you have no idea why and
  sometimes where an error came from – it might be some code that
  tried to read an undefined value or DB connection pool that leaks
  memory. Programmer errors are bugs in the program.

  Operational errors are relatively easy to handle – usually
  logging the error is enough. Things become hairy when a programmer
  error pops up, the application might be in an inconsistent state and
  there’s nothing better you can do than to restart gracefully

  All the errors that will be created by this class will be
  operational errors.
  Operational error is errors that we can predict will happen
  at some point in the future.

  We use appError class in order to create all the errors in
  our app -> These errors will be operational errors
*/

export default class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
