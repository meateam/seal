import { Document } from 'mongoose';

export interface IUser extends Document {
  id: string;           // TODO: is it?
  uniqueID: string;
  name: string;
  creationDate: Date;
  heirarchy: string;
  rootFolder: string;  // TODO: is it?
}
