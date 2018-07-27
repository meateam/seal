import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../errors/application';

export default (validator: Function, paramsExtractor?: (req: Request, res: Response) => any[]) => {
  return async function (req: Request, res: Response, next:NextFunction) {
    const params = await paramsExtractor(req, res);
    const isValid = await validator(...params);
    if (isValid) {
      next();
    }
    throw new ApplicationError(undefined, undefined); // need to fix ApplicationError constructor for that to look normal.
  };
};

export class ExPrms {
  static body(req: Request, res: Response): any[] {
    return [req.body];
  }
  static params(req: Request, res: Response): any[] {
    return [req.params];
  }
  static query(req: Request, res: Response): any[] {
    return [req.query];
  }
}
