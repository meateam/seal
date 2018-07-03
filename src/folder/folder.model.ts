import { Schema, model, Mongoose } from 'mongoose';
import { IFolder } from './folder.interface';

export const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parent: {
      type: String,
      required: true,
    },
    files: {
      type: [String],
      required: true,
    },
    folders: {
      type: [String],
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
  });

export const folderModel = model<IFolder>('folder', folderSchema);
