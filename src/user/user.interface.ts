import { Document } from 'mongoose';

export interface IUser extends Document{
  ID: String;           // TODO: is it?
  uniqueID: String;
  name: String;
  creationDate: Date;
  heirarchy: String;
  rootFolder: String;  // TODO: is it?
}
