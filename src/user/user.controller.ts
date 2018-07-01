/**
 *
 */
import { ERRORS } from '../helpers/enums';
import { IUser } from './user.interface';
import { userModel } from './user.model';
import { UserService } from './user.service';
import { UserValidator } from './user.validator';
/*
* UserService handles the logic of the requests
* before calling the database
*/
const isValidUpdate : (id: string, partialUser: Partial<IUser>) => boolean = UserValidator.isValidUpdate;
export class UserController {
  public static async getById(id: string) : Promise<IUser> {
    const user : IUser = await UserService.getById(id);
    if (user) {
      return user;
    }
    throw new Error(ERRORS.NOT_EXIST);
  }

  public static getByName(name: String) : Promise<IUser[]> {
    return UserService.getByName(name);
  }

  public static async update(id: string, partialUser: Partial<IUser>) : Promise<IUser> {
    if (!isValidUpdate(id, partialUser)) {
      throw new Error(ERRORS.BAD_ID);
    }
    const updatedUser : IUser = await UserService.update(partialUser._id, partialUser);
    if (updatedUser) {
      return updatedUser;
    }
    throw new Error(ERRORS.NOT_EXIST);
  }

  public static getAll() : Promise<IUser[]> {
    return UserService.getAll();
  }

  public static async add(reqUser : IUser) : Promise<IUser> {
    const newUser: IUser = new userModel(reqUser);
    try {
      return await UserService.add(newUser);
    } catch (error) {
      // console.log(error);
      throw new Error(ERRORS.USER_EXISTS);
    }
  }

  public static async deleteById(id: string) : Promise<IUser> {
    return UserService.deleteById(id);
  }
}
