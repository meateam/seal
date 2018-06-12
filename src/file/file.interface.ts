import { Document } from 'mongoose';

export interface IFile extends Document {
  fileName: string;
  fileSize: number;
  path: string;
  fileType: string;
  creationDate: number;
  modifyDate: number;
  Owner: string;
  Parent: string;
}
