/**
 *
 */
import { NextFunction, Request, Response } from 'express';

/**
 * Handles controller execution and responds to user (API Express version).
 * Web socket has a similar handler implementation.
 * @param promise Controller Promise. I.e. getUser.
 * @param params A function (req, res, next), all of which are optional
 * that maps our desired controller parameters. I.e. (req) => [req.params.username, ...].
 */
export const controllerHandler : any =
(promise: Function, params: Function, errorCode: number = 500) : any =>
async (req: Request, res: Response, next: NextFunction) : Promise<Request> => {
  const boundParams : any = params ? params(req, res, next) : [];
  try {
    const result : any = await promise(...boundParams);
    return res.json(result);
  } catch (error) {
    return res.status(error.status).send(error.message + '');
  }
};
