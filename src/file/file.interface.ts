import { Document } from 'mongoose';

export interface IFile extends Document {
  _id: string;
  fileName: string;
  fileSize: number;
  path: string;
  fileType: string;
  creationDate: number;
  modifyDate: number;
  Owner: string;
  Parent: string;
}
