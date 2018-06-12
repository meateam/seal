import * as express from 'express';
import { userModel } from './user.model';
import { UserController } from './user.controller';
import { IUser } from './user.interface';

export const userRouter: express.Router = express.Router();

userRouter.get('/:id', async (req, res) => {
  const ret = await UserController.getUserById(req.params.id);
  res.json({ success: true, returned: ret });
});

userRouter.get('/', async (req, res) => {
  const ret = await UserController.getAllUsers();
  res.json({ success: true, returned: ret }, null, 2);
});

userRouter.post('/', async (req, res, next) => {
  const newUser :IUser = new userModel(req.body);
  //   {
  //   _id:            req.body.id,
  //   uniqueID:       req.body.uniqueID,
  //   name:           req.body.name,
  //   creationDate:   req.body.creationDate,
  //   heirarchy:      req.body.heirarchy,
  //   rootFolder:     req.body.rootFolder,
  // }

  UserController.addUser(newUser);
});

userRouter.put('/', async (req, res, next) => {
  const partialUser : Partial<IUser> = req.body;
  const updatedUser = await UserController.updateUser(partialUser._id, partialUser as IUser);
  if (updatedUser) res.json(updatedUser);
});

userRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  UserController.deleteUserById(id);
});
