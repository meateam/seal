import { UserService } from './user.service';
import { IUser } from './user.interface';

export class UserValidator {
  static async idExists(id: string): Promise<boolean> {
    const user: IUser = await UserService.getById(id);
    if (user) {
      if (user._id === id) {
        // console.log(`id exists! ${user._id}`);
        return true;
      }
    }
    return false;
  }

  static isValidUpdate(id: string, partialUser: Partial<IUser>): boolean {
    if (partialUser._id) {
      if (partialUser._id === id) {
        return true;
      }
    }
    return false;
  }

}
