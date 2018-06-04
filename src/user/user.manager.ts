import * as mongoose from 'mongoose';
import { userSchema, userModel } from './user.model';
import { IUser } from './user.interface';

export class UserManager {

  public static getUserById(myId: String) {
    try {
      return userModel.findOne({ ID: myId });
    } catch (error) {
      handleErrors(error);
    }
  }

  public static getAllUsers() {
    try {
      return userModel.find({});
    } catch (error) {
      handleErrors(error);
    }
  }

}

function handleErrors(error: Error) {
  console.log('Exception caught! ' + error);
  return Promise.reject(error);
}
