import { Document } from 'mongoose';

export interface IFile extends Document {
  fileName: string;
  fileSize: number;
  path: string;
  fileType: string;
  creationDate: Date;
  modifyDate: Date;
  Owner: string;
  Parent: string;
}
