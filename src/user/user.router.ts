import * as express from 'express';
import { userModel } from './user.model';
import { UserManager } from './user.manager';

export const userRouter: express.Router = express.Router;

userRouter.get('/:id', async (req, res) => {
  const ret = await UserManager.getUserById(req.params.id);
});

userRouter.get('/', async (req, res) => {
  const ret = await UserManager.getAllUsers();
  res.write(JSON.stringify({ success: true, returned: ret }, null, 2));
});
