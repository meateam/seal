import { Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  uniqueID: string;
  name: string;
  creationDate: Date;
  heirarchy: string;
  rootFolder: string;
}
