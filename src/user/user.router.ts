/**
 *
 */
import {  Request, Response, Router } from 'express';
import { controllerHandler } from '../helpers/controller.helper';
import { UserController } from './user.controller';
import { IUser } from './user.interface';

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
  controllerHandler(UserController.update, () => [req.params.id, req.body])(req, res, null);
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
  controllerHandler(UserController.deleteById, () => [req.params.id])(req, res, null);
});
