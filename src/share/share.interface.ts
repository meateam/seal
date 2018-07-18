import { IFile, IUser, Permission } from '../helpers/tmp.types';

export default interface IShare{
  id?: any;
  file: IFile | String;
  permissions: Permission;
  from: IUser | String;
  to: IUser | String;
  createdAt?: Date;
  updatedAt?: Date;
}
