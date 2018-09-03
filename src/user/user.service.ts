/**
 * UserService handles the calls to the database
 */
import { IUser } from './user.interface';
import { UserModel } from './user.model';

export class UserService {

  public static getById(id: String) : Promise<IUser> {
    return UserModel.findById(id).exec();
  }

  public static getByName(name: String) : Promise<IUser[]> {
    return UserModel.find({ name }).exec();
  }

  public static update(id: String, newUser: Partial<IUser>) : Promise<IUser> {
    return UserModel.findByIdAndUpdate(id, newUser, { new : true }).exec();
  }

  public static getAll() : Promise<IUser[]> {
    return UserModel.find({}).exec();
  }

  public static add(newUser: IUser): Promise<IUser> {
    return newUser.save();
  }

  public static deleteById(userID: string): Promise<any> {
    return UserModel.deleteOne({ _id: userID }).exec();
  }
}
