import { userModel } from './user.model';
import { IUser } from './user.interface';

/*
* UserService handles the calls to the database
*/
export class UserService {

  public static getById(myId: String) {
    return userModel.findOne({ _id: myId });
  }

  public static getByName(myName: String) {
    return userModel.find({ name: myName });
  }

  public static update(myId: String, newUser: Partial<IUser>) {
    return userModel.findOneAndUpdate({ _id: myId }, newUser, { new: true });
  }

  public static getAll() {
    return userModel.find({});
  }

  public static add(newUser: IUser) {
    return newUser.save();
  }

  public static deleteById(userID: string) {
    return userModel.deleteOne({ _id: userID });
  }

  public static deleteAll() {
    return userModel.remove({});
  }

}
