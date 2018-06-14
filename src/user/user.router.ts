import * as express from 'express';
import { userModel } from './user.model';
import { UserController } from './user.controller';
import { IUser } from './user.interface';

export const userRouter: express.Router = express.Router();

userRouter.get('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const ret = await UserController.getUserById(req.params.id);
    res.status(200).json({ success: true, returned: ret, message: `Successfully obtained user` });
  } catch (exception) {
    res.status(500).json({
      success: false, returned: exception,
      message: `Could not get user by id`,
    });
  }
});

userRouter.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const result: IUser[] = await UserController.getAllUsers();
    res.status(200).json({
      success: true, returned: result,
      message: `Successfully obtained all users: ${result.length}`,
    });
  } catch (exception) {
    res.status(500).json({
      success: false, returned: exception,
      message: `Could not get all users`,
    });
  }
});

userRouter.post('/', async (req: express.Request, res: express.Response) => {
  try {
    // const newUser :IUser = new userModel(req.body);
    const newUser: IUser = new userModel({
      _id: req.body.id,
      uniqueID: req.body.uniqueID,
      name: req.body.name,
      creationDate: req.body.creationDate,
      heirarchy: req.body.heirarchy,
      rootFolder: req.body.rootFolder,
    });

    const result: IUser = await UserController.addUser(newUser);
    res.status(200).json({
      success: true, returned: result,
      message: `User ${newUser.name} created successfully!`,
    });
  } catch (exception) {
    res.status(500).json({
      success: false, returned: exception,
      message: `Could not create a new user`,
    });
  }
});

userRouter.put('/', async (req: express.Request, res: express.Response) => {
  try {
    const partialUser: Partial<IUser> = req.body;
    const updatedUser: IUser = await UserController.
      updateUser(partialUser._id, partialUser as IUser);
    if (updatedUser) res.json(updatedUser);
  } catch (exception) {
    res.status(500).json({ success: false, returned: exception });
  }
});

userRouter.delete('/:id', async (req: express.Request, res: express.Response) => {
  try {
    const id = req.params.id;
    const result = await UserController.deleteUserById(id);
    const retMessage: string = (result.n) ? `User ${req.params.id} removed` : 'User not found';
    res.status(200).json({ success: true, returned: result, message: retMessage });
  } catch (exception) {
    console.log(`Error deleting user ${req.params.id}`);
    res.status(500).json({ success: false, returned: exception, message: `Could not delete user` });
  }
});

userRouter.delete('/', async (req: express.Request, res: express.Response) => {
  try {
    const result = await UserController.deleteAllUsers();
    res.status(200).json({
      success: true, returned: result,
      message: `${result.n} users deleted successfully`,
    });
  } catch (exception) {
    res.status(500).json({
      success: false, returned: exception,
      message: `Could not delete all users`,
    });
  }
});
