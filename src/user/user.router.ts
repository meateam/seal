import { Router, Request, Response } from 'express';
import { userModel } from './user.model';
import { UserController } from './user.controller';
import { IUser } from './user.interface';

export const userRouter: Router = Router();

userRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const ret = await UserController.getById(req.params.id);
    if (ret._id === req.params.id) {
      res.status(200).json({
        success: true, returned: ret,
        message: `Successfully obtained user`,
      });
    } else {
      res.status(200).json({
        success: false, returned: ret,
        message: `User ${req.params.id} not found!`,
      });
    }
  } catch (exception) {
    console.log(exception);
    res.status(500).json({
      success: false, returned: exception,
      message: `Could not get user by id`,
    });
  }
});

userRouter.get('/', async (req: Request, res: Response) => {
  try {
    const result: IUser[] = await UserController.getAll();
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

userRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newUser: IUser = new userModel(req.body);
    const result: IUser = await UserController.add(newUser);
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

userRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const partialUser: Partial<IUser> = req.body;
    const updatedUser: IUser = await UserController.
      update(req.body._id, partialUser as IUser);
    res.status(200).json({
      success: true, returned: updatedUser,
      message: `User ${updatedUser.name} updated successfully!`,
    });
  } catch (exception) {
    res.status(500).json({
      success: false, returned: exception,
      message: `Could not update the user`,
    });
  }
});

userRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await UserController.deleteById(id);
    const retMessage: string = (result.n) ? `User ${req.params.id} removed` : 'User not found';
    res.status(200).json({ success: true, returned: result, message: retMessage });
  } catch (exception) {
    console.log(`Error deleting user ${req.params.id}`);
    res.status(500).json({ success: false, returned: exception, message: `Could not delete user` });
  }
});

userRouter.delete('/', async (req: Request, res: Response) => {
  try {
    const result = await UserController.deleteAll();
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

function handleRouter(req: Request, res: Response) {
  try {

  } catch (exception) {

  }
}
