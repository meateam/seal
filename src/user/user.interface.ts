/**
 *
 */
import { Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  uniqueID: string;
  name: string;
  creationDate: Date;
  hierarchy: string;
  rootFolder: string;
  createdAt?: Date;
  updatedAt?: Date;
}
