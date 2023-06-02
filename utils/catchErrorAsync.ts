import { NextFunction } from 'express';

/**
 *
 * @param {*} fn : asynchronous function
 * @return {function}: assigned to variable.
 */
export default (fn: Function): Function =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
