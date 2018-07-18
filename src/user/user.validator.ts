/**
 * Validation functions used by the user controller.
 */
import { IUser } from './user.interface';
import { UserService } from './user.service';

export class UserValidator {

  public static isValidMongoId(id: string) {
    const regEx = new RegExp('^[0-9a-fA-F]{24}$');
    return regEx.test(id);
  }

  public static isValidUpdate(id: string, partialUser: Partial<IUser>): boolean {
    if (partialUser._id) {
      if (partialUser._id === id) {
        return true;
      }
      return false;
    }
    return this.isValidMongoId(id);
  }

  public static compareUsers(user1: IUser, user2: IUser): boolean {
    const f1: Partial<IUser> = this.getComparableFields(user1);
    const f2: Partial<IUser> = this.getComparableFields(user2);

    return (
      f1._id === f2._id &&
      f1.name === f2.name &&
      f1.uniqueID === f2.uniqueID &&
      f1.hierarchy === f2.hierarchy &&
      f1.rootFolder === f2.rootFolder
    );
  }
  private static getComparableFields(user: IUser): Partial<IUser> {
    return {
      _id: user._id,
      name: user.name,
      uniqueID: user.uniqueID,
      hierarchy: user.hierarchy,
      rootFolder: user.rootFolder
    };
  }
}
