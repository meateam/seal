import { UserService } from './user.service';
import { IUser } from './user.interface';
import { UserValidator } from './user.validator';
/*
* UserService handles the logic of the requests
* before calling the database
*/
export class UserController {
  static getById(id: String) {
    return UserService.getById(id);
  }

  static getByName(name: String) {
    return UserService.getByName(name);
  }

  static update(id: String, partialUser: Partial<IUser>) {
    return UserService.update(id, partialUser);
  }

  static getAll() {
    return UserService.getAll();
  }

  static add(newUser: IUser) {
    return UserService.add(newUser);
  }

  static deleteById(id: string) {
    return UserService.deleteById(id);
  }

  static deleteAll() {
    return UserService.deleteAll();
  }
}
