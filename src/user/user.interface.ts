import { Document } from 'mongoose';

export interface IUser extends Document {
  uniqueID: string;
  name: string;
  hierarchy: string;
  rootFolder: string;
  createdAt?: Date;
  updatedAt?: Date;
}
