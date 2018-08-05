/**
 * UserService handles the calls to the database
 */
import { IUser } from './user.interface';
import { UserModel, IUserModel } from './user.model';
import { RepositoryBase } from '../helpers/repository';

export default class UserRepository extends RepositoryBase<IUserModel> {
  constructor() {
    super(UserModel);
  }
  public updatePartial(id: String, newFolder: Partial<IUser>): Promise<IUser> {
    return UserModel.findByIdAndUpdate(id, newFolder, { new: true }).exec();
  }
  public getByName(name: String): Promise<IUser[]> {
    return UserModel.find({ name }).exec();
  }
}
