import { Document } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  owner: string;
  parent: string;
  files: string[];
  folders: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
