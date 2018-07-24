import { Document } from 'mongoose';
import { IUser } from '../helpers/tmp.types';

export interface IFolder extends Document {
  name: string;
  owner: string | IUser;
  parent: string | IFolder;
  files: string[];
  folders: string[] | IFolder;
  createdAt?: Date;
  updatedAt?: Date;
}
