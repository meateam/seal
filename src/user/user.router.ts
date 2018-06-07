import * as express from 'express';
import { UserManager } from './user.manager';

export const userRouter: express.Router = express.Router();

userRouter.get('/:id', async (req, res) => {
  const ret = await UserManager.getUserById(req.params.id);
  res.json({ success: true, returned: ret });
});

userRouter.get('/', async (req, res) => {
  const ret = await UserManager.getAllUsers();
  res.json({ success: true, returned: ret }, null, 2);
});
