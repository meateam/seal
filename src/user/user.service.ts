/**
 * UserService handles the calls to the database
 */
import { IUser } from './user.interface';
import { userModel } from './user.model';

export class UserService {

  public static getById(id: String) : Promise<IUser> {
    return userModel.findById(id).exec();
  }

  public static getByName(name: String) : Promise<IUser[]> {
    return userModel.find({ name }).exec();
  }

  public static update(id: String, newUser: Partial<IUser>) : Promise<IUser> {
    return userModel.findByIdAndUpdate(id, newUser, { new : true }).exec();
  }

  public static getAll() : Promise<IUser[]> {
    return userModel.find({}).exec();
  }

  public static add(newUser: IUser): Promise<IUser> {
    return newUser.save();
  }

  public static deleteById(userID: string) {
    return userModel.deleteOne({ _id: userID }).exec();
  }
}
