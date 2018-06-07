import { userModel } from './user.model';
import { IUser } from './user.interface';

export class UserManager {

  public static getUserById(myId: String) {
    try {
      return userModel.findOne({ ID: myId });
    } catch (exception) {
      return handleExceptions(exception);
    }
  }

  public static getUsersByName (myName : String) {
    try {
      return userModel.find({ name : myName });
    } catch (exception) {
      return handleExceptions(exception);
    }
  }

  public static updateUser = (myId: String, newUser: Partial<IUser>) => {
    try {
      return userModel.findOneAndUpdate({ ID: myId }, newUser, { new : true });
    } catch (exception) {
      return handleExceptions(exception);
    }
  }

  public static getAllUsers() {
    try {
      return userModel.find({});
    } catch (exception) {
      return handleExceptions(exception);
    }
  }

  public static addUser(newUser: IUser) {
    try {
      return newUser.save();
    } catch (exception) {
      return handleExceptions(exception);
    }
  }

  public static deleteUserById(userID: string) {
    try {
      return userModel.deleteOne({ ID: userID });
    } catch (exception) {
      return handleExceptions(exception);
    }
  }

  public static deleteAllUsers() {
    try {
      return userModel.remove({});
    } catch (exception) {
      return handleExceptions(exception);
    }
  }

}

function handleExceptions(exception) {
  console.log('Exception caught! ' + exception);
  return Promise.reject(exception);
}
