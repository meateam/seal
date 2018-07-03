import { Document } from 'mongoose';

export interface IFolder extends Document {
  name : string;
  parent : string;
  files : string[];
  folders : string[];
  createdAt?: Date;
  updatedAt?: Date;
}
