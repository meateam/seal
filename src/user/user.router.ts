import * as express from 'express';
import { UserService } from './user.service';

export const userRouter: express.Router = express.Router();

userRouter.get('/:id', async (req, res) => {
  const ret = await UserService.getUserById(req.params.id);
  res.json({ success: true, returned: ret });
});

userRouter.get('/', async (req, res) => {
  const ret = await UserService.getAllUsers();
  res.json({ success: true, returned: ret }, null, 2);
});
