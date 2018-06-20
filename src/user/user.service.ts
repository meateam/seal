import { userModel } from './user.model';
import { IUser } from './user.interface';

/*
* UserService handles the calls to the database
*/
export class UserService {

  public static getById(id: String) {
    return userModel.findById(id);
  }

  public static getByName(name: String) {
    return userModel.find({ name });
  }

  public static update(id: String, newUser: Partial<IUser>) {
    return userModel.findByIdAndUpdate(id, newUser);
  }

  public static getAll() {
    return userModel.find({});
  }

  public static add(newUser: IUser): Promise<IUser> {
    return newUser.save();
  }

  public static deleteById(userID: string) {
    return userModel.deleteOne({ _id: userID });
  }
}
