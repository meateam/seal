import { Router, Request, Response } from 'express';
import { UserController } from './user.controller';
import { IUser } from './user.interface';

export const userRouter: Router = Router();

userRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    res.json(await UserController.getById(req.params.id));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.get('/', async (req: Request, res: Response) => {
  try {
    res.json(await UserController.getAll());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.post('/', async (req: Request, res: Response) => {
  try {
    res.json(await UserController.add(req.body));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    res.status(200).json(await UserController.update(req.params.id, req.body as Partial<IUser>));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    res.json(await UserController.deleteById(req.params.id));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
