import * as mongoose from 'mongoose';
import { userSchema, userModel } from './user.model';
import { IUser } from './user.interface';

export class UserManager {

  public static getUserById(myId: String) {
    try {
      console.log('getUserById called');
      return userModel.findOne({ ID: myId });
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

  public static addUser = (newUser) => {
    try {
      return newUser.save();
    } catch (exception) {
      return handleExceptions(exception);
    }
  }

}

function handleExceptions(exception) {
  console.log('Exception caught! ' + exception);
  return Promise.reject(exception);
}
