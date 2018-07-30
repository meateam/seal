/**
 * Routes the REST API to the controller which takes care of the logic part.
 */
import {  Request, Response, Router } from 'express';
import { controllerHandler } from '../helpers/controller.helper';
import { UserController } from './user.controller';
import warpAsync from '../helpers/warpAsync';
import { UserResponder } from './user.responder';

export const userRouter: Router = Router();
const controller = new UserController();

userRouter.get('/:id', warpAsync(UserResponder.getById));

// userRouter.get('/:id', async (req: Request, res: Response) => {
//   controllerHandler(controller.getById, () => [req.params.id])(req, res, null);
// });

userRouter.get('/', async (req: Request, res: Response) => {
  controllerHandler(controller.getAll, null)(req, res, null);
});

userRouter.post('/', async (req: Request, res: Response) => {
  controllerHandler(controller.add, () => [req.body])(req, res, null);
});

userRouter.put('/:id', async (req: Request, res: Response) => {
  controllerHandler(controller.update, () => [req.params.id, req.body])(req, res, null);
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
  controllerHandler(controller.deleteById, () => [req.params.id])(req, res, null);
});
