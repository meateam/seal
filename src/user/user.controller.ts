/**
 * The middleware between the router and the DB querying.
 * Handles the logic of the requests.
 */
import * as UserErrors from '../errors/user';
import { ServerError } from '../errors/application';
import { IUser } from './user.interface';
import { UserModel, IUserModel } from './user.model';
import { Model } from 'mongoose';
import { UserValidator } from './user.validator';
import { EntityTypes } from '../helpers/enums';
import { createUsers } from '../helpers/functions';
import { Controller } from '../helpers/generic.controller';
import UserRepository from './user.repository';

export class UserController extends Controller<IUser> {
  public controllerType: EntityTypes;
  public model: Model<IUser>;
  static _repository: UserRepository = new UserRepository();

  constructor() {
    super();
    this.controllerType = EntityTypes.USER;
    this.model = UserModel;
  }

  public async getById(id: string): Promise<IUser> {
    const user = await UserController._repository.findById(id);
    if (user) {
      return <IUserModel>user;
    }
    throw new UserErrors.UserNotFoundError();
  }

  public async getAll(): Promise<IUser[]> {
    const users = await UserController._repository.find({});
    return <IUserModel[]> users;
  }

  public async getByName(name: String): Promise<IUser[]> {
    const users = await UserController._repository.getByName(name);
    return <IUserModel[]>users;
  }

  public async update(id: string, partialUser: Partial<IUser>): Promise<IUser> {
    if (!UserValidator.isValidUpdate(id, partialUser)) {
      throw new UserErrors.BadIdError();
    }
    const updatedUser: IUser = await  UserController._repository.updatePartial(id, partialUser);
    if (updatedUser) {
      return updatedUser;
    }
    throw new UserErrors.UserNotFoundError();
  }

  public async add(reqUser: IUser): Promise<IUser> {
    const newUser: IUser = new UserModel(reqUser);
    return <IUserModel>await UserController._repository.create(newUser);
  }

  public async deleteById(id: string): Promise<any> {
    const res = await UserController._repository.delete(id);
    if (!res.ok) {
      throw new ServerError();
    } else if (res.n < 1) {
      throw new UserErrors.UserNotFoundError();
    }
    return res;
  }

  public createItems(num: number): IUser[] {
    return createUsers(num);
  }

}
