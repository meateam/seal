import { Router, Request, Response } from 'express';
import { UserController } from './user.controller';
import { IUser } from './user.interface';
import { controllerHandler } from '../helpers/controller.helper';

export const userRouter: Router = Router();

userRouter.get('/:id', async (req: Request, res: Response) => {
  controllerHandler(UserController.getById, () => [req.params.id])(req, res, null);
});

userRouter.get('/', async (req: Request, res: Response) => {
  controllerHandler(UserController.getAll, null)(req, res, null);
});

userRouter.post('/', async (req: Request, res: Response) => {
  controllerHandler(UserController.add, () => [req.body])(req, res, null);
});

userRouter.put('/:id', async (req: Request, res: Response) => {
  controllerHandler(UserController.update, () => [req.params.id, req.body as Partial<IUser>])(req, res, null);
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
  controllerHandler(UserController.deleteById, () => [req.params.id])(req, res, null);
});
