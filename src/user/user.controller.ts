import { UserService } from './user.service';
import { IUser } from './user.interface';

/*
* UserService handles the logic of the requests
* before calling the database
*/
export class UserController {
  static getUserById(id: String) {
    return UserService.getUserById(id);
  }

  static getUsersByName(name: String) {
    return UserService.getUsersByName(name);
  }

  static updateUser(id: String, partialUser: Partial<IUser>) {
    return UserService.updateUser(id, partialUser);
  }

  static getAllUsers() {
    return UserService.getAllUsers();
  }

  static addUser(newUser: IUser) {
    return UserService.addUser(newUser);
  }

  static deleteUserById(id: string) {
    return UserService.deleteUserById(id);
  }

  static deleteAllUsers() {
    return UserService.deleteAllUsers();
  }
}
