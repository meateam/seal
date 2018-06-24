import { Document } from 'mongoose';

export interface IFile extends Document {
  fileName: string;
  fileSize: number;
  path: string;
  fileType: string;
  createdAt: Date;
  updatedAt: Date;
  Owner: string;
  Parent: string;
}
