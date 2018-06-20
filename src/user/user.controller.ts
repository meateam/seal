import { UserService } from './user.service';
import { IUser } from './user.interface';
import { UserValidator } from './user.validator';
import { userModel } from './user.model';
import { ERRORS } from '../helpers/enums';
/*
* UserService handles the logic of the requests
* before calling the database
*/
export class UserController {
  static async getById(id: string) {
    const user = await UserService.getById(id);
    if (user) {
      return user;
    }
    throw new Error(ERRORS.NOT_EXIST);
  }

  static getByName(name: String) {
    return UserService.getByName(name);
  }

  static async update(id: string, partialUser: Partial<IUser>) {
    if (partialUser._id) {
      if (id !== partialUser._id) {
        throw new Error(ERRORS.BAD_ID);
      }
    }
    const updatedUser = await UserService.update(partialUser._id, partialUser);
    if (updatedUser) {
      return updatedUser;
    }
    throw new Error(ERRORS.NOT_EXIST);
  }

  static getAll() {
    return UserService.getAll();
  }

  static async add(reqUser) {
    const newUser: IUser = new userModel(reqUser);
    try {
      return await UserService.add(newUser);
    } catch (error) {
      throw new Error(ERRORS.USER_EXISTS);
    }
  }

  static async deleteById(id: string) {
    return UserService.deleteById(id);
  }
}
